import { describe, expect, it } from "vitest";
import { applyProjectAction } from "../actions/actionSystem";
import { createInitialProject, createTestSceneObject } from "../app/createInitialProject";
import { createStageGroup } from "../builders/stage/createStageGroup";
import { createTrussGroup } from "../builders/truss/createTrussGroup";
import { resolveConnectionPortWorld } from "../scene/connectionPorts";

const allLayerObjectIds = (layers: ReturnType<typeof createInitialProject>["scene"]["layers"]) =>
  layers.flatMap((layer) => layer.objectIds);

const centerXZ = (objects: Array<{ transform: { position: { x: number; z: number } } }>) =>
  objects.reduce(
    (accumulator, object) => ({
      x: accumulator.x + object.transform.position.x / objects.length,
      z: accumulator.z + object.transform.position.z / objects.length
    }),
    { x: 0, z: 0 }
  );

describe("ActionSystem", () => {
  it("selects an object by stable SceneObject id", () => {
    const project = createInitialProject();
    const objectId = project.scene.objects[0].id;

    const result = applyProjectAction(project, {
      type: "scene/selectObject",
      objectId
    });

    expect(result.project.scene.selection.mode).toBe("object");
    expect(result.project.scene.selection.selectedObjectIds).toEqual([objectId]);
    expect(result.project.scene.selection.activeInspectorTargetId).toBe(objectId);
  });

  it("toggles connection port visibility through the action boundary", () => {
    const project = createInitialProject();

    const result = applyProjectAction(project, {
      type: "scene/setConnectionPortsVisible",
      visible: false
    });

    expect(result.project.scene.environment.connectionPortsVisible).toBe(false);
    expect(result.diagnostics).toEqual(["Connection ports hidden"]);
    expect(result.project.history.canUndo).toBe(true);
  });

  it("toggles layer visibility and clears hidden object selection", () => {
    const project = createInitialProject();
    const objectId = project.scene.objects[0].id;

    const result = applyProjectAction(project, {
      type: "scene/setLayerVisible",
      layerId: "layer-generic",
      visible: false
    });

    expect(result.project.scene.layers.find((layer) => layer.id === "layer-generic")?.visible).toBe(false);
    expect(result.project.scene.selection.selectedObjectIds).not.toContain(objectId);
    expect(result.project.scene.selection.mode).toBe("none");
    expect(result.project.history.canUndo).toBe(true);
  });

  it("locks a layer and rejects moves for objects on that layer", () => {
    const project = createInitialProject();
    const objectId = project.scene.objects[0].id;
    const locked = applyProjectAction(project, {
      type: "scene/setLayerLocked",
      layerId: "layer-generic",
      locked: true
    }).project;
    const moved = applyProjectAction(locked, {
      type: "scene/moveObject",
      objectId,
      delta: { x: 1, y: 0, z: 1 }
    });

    expect(locked.scene.layers.find((layer) => layer.id === "layer-generic")?.locked).toBe(true);
    expect(moved.project.scene.objects[0].transform.position).toEqual(project.scene.objects[0].transform.position);
    expect(moved.diagnostics).toEqual([`Object ${objectId} cannot be moved`]);
  });

  it("applies camera presets through the action boundary", () => {
    const project = createInitialProject();

    const result = applyProjectAction(project, {
      type: "scene/applyCameraPreset",
      presetId: "top"
    });

    expect(result.project.scene.camera.mode).toBe("top");
    expect(result.project.scene.camera.position.y).toBeGreaterThan(result.project.scene.camera.target.y);
    expect(result.project.scene.camera.position.x).toBeCloseTo(result.project.scene.camera.target.x);
    expect(result.project.scene.camera.position.z).toBeCloseTo(result.project.scene.camera.target.z + 0.01);
    expect(result.project.history.canUndo).toBe(true);
    expect(result.diagnostics).toEqual(["Camera view set to top"]);
  });

  it("moves selected object through action boundary", () => {
    const project = createInitialProject();
    const objectId = project.scene.objects[0].id;

    const result = applyProjectAction(project, {
      type: "scene/moveObject",
      objectId,
      delta: { x: 0.25, y: 4, z: -0.5 }
    });

    const movedObject = result.project.scene.objects[0];

    expect(result.diagnostics).toEqual([]);
    expect(movedObject.transform.position.x).toBe(0.25);
    expect(movedObject.transform.position.y).toBe(0.5);
    expect(movedObject.transform.position.z).toBe(-0.5);
    expect(result.project.updatedAt.localeCompare(project.updatedAt)).toBeGreaterThanOrEqual(0);
  });

  it("snaps one object port to another through the action boundary", () => {
    const truss = createTrussGroup({
      mode: "portal",
      widthM: 6,
      heightM: 4,
      depthM: 3,
      system: "mdm-tq29-c2"
    });
    const topSegments = truss.objects.filter((object) => object.name.includes("Top span"));
    const movingSegment = {
      ...topSegments[0],
      transform: {
        ...topSegments[0].transform,
        position: {
          x: topSegments[0].transform.position.x - 0.8,
          y: topSegments[0].transform.position.y,
          z: topSegments[0].transform.position.z + 0.4
        }
      }
    };
    const targetSegment = topSegments[1];
    const project = {
      ...createInitialProject(),
      scene: {
        ...createInitialProject().scene,
        objects: [movingSegment, targetSegment],
        layers: [
          {
            id: "main-layer",
            name: "Main",
            visible: true,
            locked: false,
            objectIds: [movingSegment.id, targetSegment.id]
          }
        ]
      }
    };

    const result = applyProjectAction(project, {
      type: "scene/snapObjectPortToTargetPort",
      objectId: movingSegment.id,
      portId: "end-b",
      targetObjectId: targetSegment.id,
      targetPortId: "end-a"
    });
    const snappedObject = result.project.scene.objects.find((object) => object.id === movingSegment.id)!;
    const movingPort = resolveConnectionPortWorld(snappedObject, "end-b")!;
    const targetPort = resolveConnectionPortWorld(targetSegment, "end-a")!;

    expect(result.diagnostics[0]).toContain("Snapped");
    expect(movingPort.worldPosition.x).toBeCloseTo(targetPort.worldPosition.x);
    expect(movingPort.worldPosition.y).toBeCloseTo(targetPort.worldPosition.y);
    expect(movingPort.worldPosition.z).toBeCloseTo(targetPort.worldPosition.z);
    expect(result.project.scene.selection.selectedObjectIds).toEqual([movingSegment.id]);
    expect(result.project.history.canUndo).toBe(true);
  });

  it("snaps an object to the nearest compatible port through the action boundary", () => {
    const truss = createTrussGroup({
      mode: "portal",
      widthM: 6,
      heightM: 4,
      depthM: 3,
      system: "mdm-tq29-c2"
    });
    const topSegments = truss.objects.filter((object) => object.name.includes("Top span"));
    const movingSegment = {
      ...topSegments[0],
      transform: {
        ...topSegments[0].transform,
        position: {
          x: topSegments[0].transform.position.x - 0.25,
          y: topSegments[0].transform.position.y,
          z: topSegments[0].transform.position.z + 0.1
        }
      }
    };
    const targetSegment = topSegments[1];
    const baseProject = createInitialProject();
    const project = {
      ...baseProject,
      scene: {
        ...baseProject.scene,
        objects: [movingSegment, targetSegment],
        layers: [
          {
            id: "main-layer",
            name: "Main",
            visible: true,
            locked: false,
            objectIds: [movingSegment.id, targetSegment.id]
          }
        ]
      }
    };

    const result = applyProjectAction(project, {
      type: "scene/snapObjectToNearestCompatiblePort",
      objectId: movingSegment.id,
      maxDistanceM: 1
    });
    const snappedObject = result.project.scene.objects.find((object) => object.id === movingSegment.id)!;
    const movingPort = resolveConnectionPortWorld(snappedObject, "end-b")!;
    const targetPort = resolveConnectionPortWorld(targetSegment, "end-a")!;

    expect(result.diagnostics[0]).toContain("Snapped");
    expect(movingPort.worldPosition.x).toBeCloseTo(targetPort.worldPosition.x);
    expect(movingPort.worldPosition.y).toBeCloseTo(targetPort.worldPosition.y);
    expect(movingPort.worldPosition.z).toBeCloseTo(targetPort.worldPosition.z);
  });

  it("snaps a group to the nearest compatible external port without splitting the group", () => {
    const truss = createTrussGroup({
      mode: "portal",
      widthM: 6,
      heightM: 4,
      depthM: 3,
      system: "mdm-tq29-c2"
    });
    const topSegments = truss.objects.filter((object) => object.name.includes("Top span"));
    const movingSegment = {
      ...topSegments[0],
      transform: {
        ...topSegments[0].transform,
        position: {
          x: topSegments[0].transform.position.x - 0.25,
          y: topSegments[0].transform.position.y,
          z: topSegments[0].transform.position.z + 0.1
        }
      }
    };
    const movingLeg = {
      ...truss.objects.find((object) => object.name.includes("Left leg"))!,
      transform: {
        ...truss.objects.find((object) => object.name.includes("Left leg"))!.transform,
        position: {
          x: truss.objects.find((object) => object.name.includes("Left leg"))!.transform.position.x - 0.25,
          y: truss.objects.find((object) => object.name.includes("Left leg"))!.transform.position.y,
          z: truss.objects.find((object) => object.name.includes("Left leg"))!.transform.position.z + 0.1
        }
      }
    };
    const targetSegment = topSegments[1];
    const movingGroup = {
      ...truss.group,
      id: "moving-group",
      objectIds: [movingSegment.id, movingLeg.id]
    };
    const baseProject = createInitialProject();
    const project = {
      ...baseProject,
      scene: {
        ...baseProject.scene,
        objects: [movingSegment, movingLeg, targetSegment],
        groups: [movingGroup],
        layers: [
          {
            id: "main-layer",
            name: "Main",
            visible: true,
            locked: false,
            objectIds: [movingSegment.id, movingLeg.id, targetSegment.id]
          }
        ]
      }
    };

    const result = applyProjectAction(project, {
      type: "scene/snapGroupToNearestCompatiblePort",
      groupId: movingGroup.id,
      maxDistanceM: 1
    });
    const snappedSegment = result.project.scene.objects.find((object) => object.id === movingSegment.id)!;
    const snappedLeg = result.project.scene.objects.find((object) => object.id === movingLeg.id)!;
    const movingPort = resolveConnectionPortWorld(snappedSegment, "end-b")!;
    const targetPort = resolveConnectionPortWorld(targetSegment, "end-a")!;

    expect(result.diagnostics[0]).toContain("Snapped");
    expect(movingPort.worldPosition.x).toBeCloseTo(targetPort.worldPosition.x);
    expect(movingPort.worldPosition.z).toBeCloseTo(targetPort.worldPosition.z);
    expect(snappedLeg.transform.position.x - movingLeg.transform.position.x).toBeCloseTo(
      snappedSegment.transform.position.x - movingSegment.transform.position.x
    );
    expect(snappedLeg.transform.position.z - movingLeg.transform.position.z).toBeCloseTo(
      snappedSegment.transform.position.z - movingSegment.transform.position.z
    );
    expect(result.project.scene.selection.selectedGroupId).toBe(movingGroup.id);
  });

  it("adds a scene object through action boundary and selects it", () => {
    const project = createInitialProject();
    const object = createTestSceneObject(2);

    const result = applyProjectAction(project, {
      type: "scene/addObject",
      object
    });

    expect(result.project.scene.objects).toHaveLength(2);
    expect(result.project.scene.objects[1].id).toBe(object.id);
    expect(allLayerObjectIds(result.project.scene.layers)).toContain(object.id);
    expect(result.project.scene.selection.selectedObjectIds).toEqual([object.id]);
  });

  it("duplicates an object with a new stable id and safe layer references", () => {
    const project = createInitialProject();
    const sourceId = project.scene.objects[0].id;

    const result = applyProjectAction(project, {
      type: "scene/duplicateObject",
      objectId: sourceId,
      newObjectId: "object-copy"
    });

    expect(result.project.scene.objects).toHaveLength(2);
    expect(result.project.scene.objects[1].id).toBe("object-copy");
    expect(result.project.scene.objects[1].catalogRef).toBe(project.scene.objects[0].catalogRef);
    expect(allLayerObjectIds(result.project.scene.layers)).toContain("object-copy");
    expect(result.project.scene.selection.selectedObjectIds).toEqual(["object-copy"]);
    expect(result.project.history.canUndo).toBe(true);
  });

  it("deletes an object and cleans selection plus references", () => {
    const projectWithTwoObjects = applyProjectAction(createInitialProject(), {
      type: "scene/addObject",
      object: createTestSceneObject(2)
    }).project;
    const deletedId = projectWithTwoObjects.scene.objects[0].id;

    const result = applyProjectAction(projectWithTwoObjects, {
      type: "scene/deleteObject",
      objectId: deletedId
    });

    expect(result.project.scene.objects.map((object) => object.id)).not.toContain(deletedId);
    expect(allLayerObjectIds(result.project.scene.layers)).not.toContain(deletedId);
    expect(result.project.scene.selection.mode).toBe("none");
  });

  it("renames an object without allowing empty names", () => {
    const project = createInitialProject();
    const objectId = project.scene.objects[0].id;

    const renamed = applyProjectAction(project, {
      type: "scene/renameObject",
      objectId,
      name: "  Main cube  "
    });
    const rejected = applyProjectAction(renamed.project, {
      type: "scene/renameObject",
      objectId,
      name: " "
    });

    expect(renamed.project.scene.objects[0].name).toBe("Main cube");
    expect(rejected.project.scene.objects[0].name).toBe("Main cube");
    expect(rejected.diagnostics).toEqual(["Object name cannot be empty"]);
  });

  it("adds a SceneGroup with child objects through the action boundary", () => {
    const project = createInitialProject();
    const stage = createStageGroup({
      system: "imlight-copy",
      widthM: 2,
      depthM: 2,
      heightM: 0.6,
      deckType: "generic-deck",
      stairsEnabled: false,
      closureEnabled: false
    });

    const result = applyProjectAction(project, {
      type: "scene/addGroup",
      group: stage.group,
      objects: stage.objects
    });

    expect(result.project.scene.groups).toHaveLength(1);
    expect(result.project.scene.groups[0].type).toBe("StageGroup");
    expect(result.project.scene.objects).toHaveLength(1 + stage.objects.length);
    expect(allLayerObjectIds(result.project.scene.layers)).toEqual(
      expect.arrayContaining(stage.objects.map((object) => object.id))
    );
    expect(result.project.scene.selection.mode).toBe("group");
    expect(result.project.scene.selection.selectedGroupId).toBe(stage.group.id);
    expect(result.diagnostics).toEqual([`Created Stage template ${stage.group.name}`]);
  });

  it("adds a TrussGroup through the same scene group action boundary", () => {
    const project = createInitialProject();
    const truss = createTrussGroup({
      mode: "portal",
      widthM: 6,
      heightM: 4,
      depthM: 3,
      system: "mdm-tq29-c2"
    });

    const result = applyProjectAction(project, {
      type: "scene/addGroup",
      group: truss.group,
      objects: truss.objects
    });

    expect(result.project.scene.groups[0].type).toBe("TrussGroup");
    expect(result.project.scene.objects).toHaveLength(1 + truss.objects.length);
    expect(result.project.scene.selection.mode).toBe("group");
    expect(result.project.scene.selection.selectedGroupId).toBe(truss.group.id);
    expect(result.diagnostics).toEqual([`Created Truss template ${truss.group.name}`]);
  });

  it("replaces a generated SceneGroup while preserving selection, layers, and plan position", () => {
    const stage = createStageGroup({
      system: "imlight-copy",
      widthM: 2,
      depthM: 2,
      heightM: 0.6,
      deckType: "generic-deck",
      stairsEnabled: false,
      closureEnabled: false
    });
    const withStage = applyProjectAction(createInitialProject(), {
      type: "scene/addGroup",
      group: stage.group,
      objects: stage.objects
    }).project;
    const moved = applyProjectAction(withStage, {
      type: "scene/moveGroup",
      groupId: stage.group.id,
      delta: { x: 1.5, y: 0, z: -0.75 }
    }).project;
    const replacement = createStageGroup({
      system: "imlight-copy",
      widthM: 4,
      depthM: 2,
      heightM: 1,
      deckType: "generic-deck",
      stairsEnabled: true,
      closureEnabled: false
    });
    const movedObjects = moved.scene.objects.filter((object) => stage.group.objectIds.includes(object.id));
    const movedCenter = centerXZ(movedObjects);
    const replacementCenter = centerXZ(replacement.objects);
    const translatedReplacementObjects = replacement.objects.map((object) => ({
      ...object,
      transform: {
        ...object.transform,
        position: {
          ...object.transform.position,
          x: object.transform.position.x + movedCenter.x - replacementCenter.x,
          z: object.transform.position.z + movedCenter.z - replacementCenter.z
        }
      }
    }));

    const result = applyProjectAction(moved, {
      type: "scene/replaceGroup",
      groupId: stage.group.id,
      group: replacement.group,
      objects: translatedReplacementObjects
    });
    const updatedGroup = result.project.scene.groups.find((group) => group.id === stage.group.id)!;
    const updatedObjects = result.project.scene.objects.filter((object) => updatedGroup.objectIds.includes(object.id));

    expect(updatedGroup.builderRef?.parameters.requestedWidthM).toBe(4);
    expect(updatedGroup.builderRef?.parameters.widthM).toBe(replacement.group.builderRef?.parameters.widthM);
    expect(updatedGroup.objectIds).toHaveLength(replacement.objects.length);
    expect(result.project.scene.objects.map((object) => object.id)).not.toEqual(expect.arrayContaining(stage.group.objectIds));
    expect(allLayerObjectIds(result.project.scene.layers)).toEqual(expect.arrayContaining(updatedGroup.objectIds));
    expect(allLayerObjectIds(result.project.scene.layers)).not.toEqual(expect.arrayContaining(stage.group.objectIds));
    expect(centerXZ(updatedObjects).x).toBeCloseTo(movedCenter.x);
    expect(centerXZ(updatedObjects).z).toBeCloseTo(movedCenter.z);
    expect(result.project.scene.selection.selectedGroupId).toBe(stage.group.id);
    expect(result.project.history.canUndo).toBe(true);
    expect(result.diagnostics).toEqual([`Updated Stage template ${replacement.group.name}`]);
  });

  it("uses the replacement SceneGroup name when updating generated groups", () => {
    const stage = createStageGroup({
      system: "imlight-copy",
      widthM: 2,
      depthM: 2,
      heightM: 0.6,
      deckType: "generic-deck",
      stairsEnabled: false,
      closureEnabled: false
    });
    const withStage = applyProjectAction(createInitialProject(), {
      type: "scene/addGroup",
      group: stage.group,
      objects: stage.objects
    }).project;
    const replacement = createStageGroup({
      system: "imlight-copy",
      widthM: 3,
      depthM: 2,
      heightM: 0.6,
      deckType: "generic-deck",
      stairsEnabled: false,
      closureEnabled: false
    });

    const result = applyProjectAction(withStage, {
      type: "scene/replaceGroup",
      groupId: stage.group.id,
      group: {
        ...replacement.group,
        name: "Custom stage name"
      },
      objects: replacement.objects
    });

    expect(result.project.scene.groups.find((group) => group.id === stage.group.id)?.name).toBe("Custom stage name");
  });

  it("selects and moves all objects in a SceneGroup", () => {
    const project = createInitialProject();
    const stage = createStageGroup({
      system: "imlight-copy",
      widthM: 2,
      depthM: 2,
      heightM: 0.6,
      deckType: "generic-deck",
      stairsEnabled: false,
      closureEnabled: false
    });
    const withStage = applyProjectAction(project, {
      type: "scene/addGroup",
      group: stage.group,
      objects: stage.objects
    }).project;

    const selected = applyProjectAction(withStage, {
      type: "scene/selectGroup",
      groupId: stage.group.id
    }).project;
    const moved = applyProjectAction(selected, {
      type: "scene/moveGroup",
      groupId: stage.group.id,
      delta: { x: 1, y: 9, z: -1 }
    }).project;

    const movedStageObjects = moved.scene.objects.filter((object) => stage.group.objectIds.includes(object.id));

    expect(selected.scene.selection.mode).toBe("group");
    expect(selected.scene.selection.selectedObjectIds).toEqual(stage.group.objectIds);
    expect(movedStageObjects[0].transform.position.x).toBe(stage.objects[0].transform.position.x + 1);
    expect(movedStageObjects[0].transform.position.y).toBe(stage.objects[0].transform.position.y);
    expect(movedStageObjects[0].transform.position.z).toBe(stage.objects[0].transform.position.z - 1);
    expect(moved.scene.selection.selectedGroupId).toBe(stage.group.id);
  });

  it("duplicates a SceneGroup with new object ids and safe references", () => {
    const stage = createStageGroup({
      system: "imlight-copy",
      widthM: 2,
      depthM: 2,
      heightM: 0.6,
      deckType: "generic-deck",
      stairsEnabled: false,
      closureEnabled: false
    });
    const withStage = applyProjectAction(createInitialProject(), {
      type: "scene/addGroup",
      group: stage.group,
      objects: stage.objects
    }).project;

    const result = applyProjectAction(withStage, {
      type: "scene/duplicateGroup",
      groupId: stage.group.id,
      newGroupId: "stage-group-copy",
      newObjectIds: stage.group.objectIds.map((_, index) => `stage-object-copy-${index}`)
    });

    const duplicatedGroup = result.project.scene.groups.find((group) => group.id === "stage-group-copy");

    expect(duplicatedGroup?.objectIds).toHaveLength(stage.group.objectIds.length);
    expect(duplicatedGroup?.objectIds[0]).toBe("stage-object-copy-0");
    expect(allLayerObjectIds(result.project.scene.layers)).toContain("stage-object-copy-0");
    expect(result.project.scene.selection.selectedGroupId).toBe("stage-group-copy");
    expect(result.project.scene.objects.find((object) => object.id === "stage-object-copy-0")?.meta?.groupId).toBe(
      "stage-group-copy"
    );
  });

  it("renames and deletes a SceneGroup while cleaning child object references", () => {
    const stage = createStageGroup({
      system: "imlight-copy",
      widthM: 2,
      depthM: 2,
      heightM: 0.6,
      deckType: "generic-deck",
      stairsEnabled: false,
      closureEnabled: false
    });
    const withStage = applyProjectAction(createInitialProject(), {
      type: "scene/addGroup",
      group: stage.group,
      objects: stage.objects
    }).project;

    const renamed = applyProjectAction(withStage, {
      type: "scene/renameGroup",
      groupId: stage.group.id,
      name: " Main stage "
    });
    const deleted = applyProjectAction(renamed.project, {
      type: "scene/deleteGroup",
      groupId: stage.group.id
    });

    expect(renamed.project.scene.groups[0].name).toBe("Main stage");
    expect(deleted.project.scene.groups).toHaveLength(0);
    expect(deleted.project.scene.objects.map((object) => object.id)).not.toEqual(
      expect.arrayContaining(stage.group.objectIds)
    );
    expect(allLayerObjectIds(deleted.project.scene.layers)).not.toEqual(expect.arrayContaining(stage.group.objectIds));
    expect(deleted.project.scene.selection.mode).toBe("none");
  });
});
