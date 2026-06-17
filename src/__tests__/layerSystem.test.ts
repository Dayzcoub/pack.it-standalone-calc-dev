import { describe, expect, it } from "vitest";
import { applyProjectAction } from "../actions/actionSystem";
import { createInitialProject, createTestSceneObject } from "../app/createInitialProject";
import { createTrussGroup } from "../builders/truss/createTrussGroup";

const layerById = (project: ReturnType<typeof createInitialProject>, layerId: string) =>
  project.scene.layers.find((layer) => layer.id === layerId);

describe("LayerSystem foundation", () => {
  it("creates canonical Task 001 layers and places generic objects on Generic", () => {
    const project = createInitialProject();
    const testObject = project.scene.objects[0];

    expect(project.scene.layers.map((layer) => layer.id)).toEqual([
      "layer-stage",
      "layer-truss",
      "layer-led",
      "layer-audio",
      "layer-light",
      "layer-power",
      "layer-rigging",
      "layer-decor",
      "layer-generic"
    ]);
    expect(layerById(project, "layer-generic")?.objectIds).toEqual([testObject.id]);
  });

  it("routes newly added objects and groups to their built-in type layers", () => {
    const project = createInitialProject();
    const truss = createTrussGroup({
      mode: "portal",
      widthM: 6,
      heightM: 4,
      depthM: 3,
      system: "mdm-tq29-c2"
    });
    const withTruss = applyProjectAction(project, {
      type: "scene/addGroup",
      group: truss.group,
      objects: truss.objects
    }).project;
    const withCube = applyProjectAction(withTruss, {
      type: "scene/addObject",
      object: createTestSceneObject(2)
    }).project;

    expect(layerById(withCube, "layer-truss")?.objectIds).toEqual(
      expect.arrayContaining(truss.objects.map((object) => object.id))
    );
    expect(layerById(withCube, "layer-generic")?.objectIds).toHaveLength(2);
  });
});
