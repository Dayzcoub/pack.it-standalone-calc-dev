import type { ProjectModel } from "../project/contracts";
import { createCameraStateFromPreset } from "../renderer/cameraPresets";
import type { SceneGroup, SceneObject, Vec3 } from "../scene/contracts";
import type { CameraMode } from "../scene/contracts";
import { createConnectionAlignmentDelta, findNearestCompatibleConnectionPort } from "../scene/connectionPorts";
import { addObjectsToBuiltInLayers } from "../scene/layerSystem";

export type ProjectAction =
  | {
      type: "project/rename";
      title: string;
    }
  | {
      type: "scene/selectObject";
      objectId?: string;
    }
  | {
      type: "scene/selectGroup";
      groupId?: string;
    }
  | {
      type: "scene/setConnectionPortsVisible";
      visible: boolean;
    }
  | {
      type: "scene/setLayerVisible";
      layerId: string;
      visible: boolean;
    }
  | {
      type: "scene/setLayerLocked";
      layerId: string;
      locked: boolean;
    }
  | {
      type: "scene/applyCameraPreset";
      presetId: CameraMode;
    }
  | {
      type: "scene/addObject";
      object: SceneObject;
    }
  | {
      type: "scene/addGroup";
      group: SceneGroup;
      objects: SceneObject[];
    }
  | {
      type: "scene/replaceGroup";
      groupId: string;
      group: SceneGroup;
      objects: SceneObject[];
    }
  | {
      type: "scene/duplicateGroup";
      groupId: string;
      newGroupId: string;
      newObjectIds: string[];
    }
  | {
      type: "scene/deleteGroup";
      groupId: string;
    }
  | {
      type: "scene/renameGroup";
      groupId: string;
      name: string;
    }
  | {
      type: "scene/duplicateObject";
      objectId: string;
      newObjectId: string;
    }
  | {
      type: "scene/deleteObject";
      objectId: string;
    }
  | {
      type: "scene/renameObject";
      objectId: string;
      name: string;
    }
  | {
      type: "scene/moveObject";
      objectId: string;
      delta: Vec3;
    }
  | {
      type: "scene/snapObjectPortToTargetPort";
      objectId: string;
      portId: string;
      targetObjectId: string;
      targetPortId: string;
    }
  | {
      type: "scene/snapObjectToNearestCompatiblePort";
      objectId: string;
      maxDistanceM?: number;
    }
  | {
      type: "scene/snapGroupToNearestCompatiblePort";
      groupId: string;
      maxDistanceM?: number;
    }
  | {
      type: "scene/moveGroup";
      groupId: string;
      delta: Vec3;
    }
  | {
      type: "scene/openBuilder";
      builderType: "stage" | "truss" | "led" | "asset-library";
    };

export type ActionResult = {
  project: ProjectModel;
  diagnostics: string[];
};

const touchProject = (project: ProjectModel, actionType?: string): ProjectModel => ({
  ...project,
  history: actionType
    ? {
        pastActionIds: [...(project.history?.pastActionIds ?? []), `${Date.now()}:${actionType}`],
        futureActionIds: [],
        canUndo: true,
        canRedo: false
      }
    : project.history,
  updatedAt: new Date().toISOString()
});

const isObjectOnLockedLayer = (project: ProjectModel, objectId: string) =>
  project.scene.layers.some((layer) => layer.locked && layer.objectIds.includes(objectId));

const templateLabelForGroup = (group: SceneGroup) => {
  if (group.builderRef?.builderType === "stage") {
    return "Stage template";
  }
  if (group.builderRef?.builderType === "truss") {
    return "Truss template";
  }
  if (group.builderRef?.builderType === "led") {
    return "LED template";
  }

  return "Group";
};

export const applyProjectAction = (project: ProjectModel, action: ProjectAction): ActionResult => {
  switch (action.type) {
    case "project/rename":
      return {
        project: touchProject(
          {
            ...project,
            title: action.title
          },
          action.type
        ),
        diagnostics: []
      };

    case "scene/selectObject": {
      const selectedObject = action.objectId
        ? project.scene.objects.find((object) => object.id === action.objectId)
        : undefined;

      return {
        project: {
          ...project,
          scene: {
            ...project.scene,
            selection: selectedObject
              ? {
                  selectedObjectIds: [selectedObject.id],
                  activeInspectorTargetId: selectedObject.id,
                  mode: "object"
                }
              : {
                  selectedObjectIds: [],
                  mode: "none"
                }
          }
        },
        diagnostics: selectedObject || !action.objectId ? [] : [`Object ${action.objectId} was not found`]
      };
    }

    case "scene/selectGroup": {
      const selectedGroup = action.groupId
        ? project.scene.groups.find((group) => group.id === action.groupId)
        : undefined;

      return {
        project: {
          ...project,
          scene: {
            ...project.scene,
            selection: selectedGroup
              ? {
                  selectedObjectIds: selectedGroup.objectIds,
                  selectedGroupId: selectedGroup.id,
                  activeInspectorTargetId: selectedGroup.objectIds[0],
                  mode: "group"
                }
              : {
                  selectedObjectIds: [],
                  mode: "none"
                }
          }
        },
        diagnostics: selectedGroup || !action.groupId ? [] : [`Group ${action.groupId} was not found`]
      };
    }

    case "scene/setConnectionPortsVisible":
      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              environment: {
                ...project.scene.environment,
                connectionPortsVisible: action.visible
              }
            }
          },
          action.type
        ),
        diagnostics: [action.visible ? "Connection ports visible" : "Connection ports hidden"]
      };

    case "scene/setLayerVisible": {
      const layer = project.scene.layers.find((sceneLayer) => sceneLayer.id === action.layerId);

      if (!layer) {
        return {
          project,
          diagnostics: [`Layer ${action.layerId} was not found`]
        };
      }

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              layers: project.scene.layers.map((sceneLayer) =>
                sceneLayer.id === action.layerId
                  ? {
                      ...sceneLayer,
                      visible: action.visible
                    }
                  : sceneLayer
              ),
              selection: action.visible
                ? project.scene.selection
                : {
                    selectedObjectIds: project.scene.selection.selectedObjectIds.filter(
                      (objectId) => !layer.objectIds.includes(objectId)
                    ),
                    mode: project.scene.selection.selectedObjectIds.some((objectId) => layer.objectIds.includes(objectId))
                      ? "none"
                      : project.scene.selection.mode
                  }
            }
          },
          action.type
        ),
        diagnostics: [`${layer.name} layer ${action.visible ? "shown" : "hidden"}`]
      };
    }

    case "scene/setLayerLocked": {
      const layer = project.scene.layers.find((sceneLayer) => sceneLayer.id === action.layerId);

      if (!layer) {
        return {
          project,
          diagnostics: [`Layer ${action.layerId} was not found`]
        };
      }

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              layers: project.scene.layers.map((sceneLayer) =>
                sceneLayer.id === action.layerId
                  ? {
                      ...sceneLayer,
                      locked: action.locked
                    }
                  : sceneLayer
              )
            }
          },
          action.type
        ),
        diagnostics: [`${layer.name} layer ${action.locked ? "locked" : "unlocked"}`]
      };
    }

    case "scene/applyCameraPreset":
      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              camera: createCameraStateFromPreset(action.presetId, project.scene)
            }
          },
          action.type
        ),
        diagnostics: [`Camera view set to ${action.presetId}`]
      };

    case "scene/addObject": {
      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              objects: [...project.scene.objects, action.object],
              layers: addObjectsToBuiltInLayers(project.scene.layers, [action.object]),
              selection: {
                selectedObjectIds: [action.object.id],
                activeInspectorTargetId: action.object.id,
                mode: "object"
              }
            }
          },
          action.type
        ),
        diagnostics: [`Added ${action.object.name}`]
      };
    }

    case "scene/addGroup": {
      const objectIds = action.objects.map((object) => object.id);

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              objects: [...project.scene.objects, ...action.objects],
              groups: [...project.scene.groups, action.group],
              layers: addObjectsToBuiltInLayers(project.scene.layers, action.objects),
              selection: {
                selectedObjectIds: objectIds,
                selectedGroupId: action.group.id,
                activeInspectorTargetId: objectIds[0],
                mode: "group"
              }
            }
          },
          action.type
        ),
        diagnostics: [`Created ${templateLabelForGroup(action.group)} ${action.group.name}`]
      };
    }

    case "scene/replaceGroup": {
      const sourceGroup = project.scene.groups.find((group) => group.id === action.groupId);

      if (!sourceGroup) {
        return {
          project,
          diagnostics: [`Group ${action.groupId} was not found`]
        };
      }

      const deletedObjectIds = new Set(sourceGroup.objectIds);
      const objectIds = action.objects.map((object) => object.id);
      const replacementGroup: SceneGroup = {
        ...action.group,
        id: sourceGroup.id,
        visible: sourceGroup.visible,
        locked: sourceGroup.locked,
        objectIds,
        parentGroupId: sourceGroup.parentGroupId
      };
      const replacementObjects = action.objects.map((object) => ({
        ...object,
        meta: {
          ...object.meta,
          groupId: sourceGroup.id
        }
      }));
      const cleanedLayers = project.scene.layers.map((layer) => ({
        ...layer,
        objectIds: layer.objectIds.filter((objectId) => !deletedObjectIds.has(objectId))
      }));

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              objects: [
                ...project.scene.objects
                  .filter((sceneObject) => !deletedObjectIds.has(sceneObject.id))
                  .map((sceneObject) => ({
                    ...sceneObject,
                    children: sceneObject.children?.filter((childId) => !deletedObjectIds.has(childId))
                  })),
                ...replacementObjects
              ],
              groups: project.scene.groups.map((group) => (group.id === sourceGroup.id ? replacementGroup : group)),
              layers: addObjectsToBuiltInLayers(cleanedLayers, replacementObjects),
              selection: {
                selectedObjectIds: objectIds,
                selectedGroupId: sourceGroup.id,
                activeInspectorTargetId: objectIds[0],
                mode: "group"
              }
            }
          },
          action.type
        ),
        diagnostics: [`Updated ${templateLabelForGroup(replacementGroup)} ${replacementGroup.name}`]
      };
    }

    case "scene/duplicateGroup": {
      const sourceGroup = project.scene.groups.find((group) => group.id === action.groupId);

      if (!sourceGroup) {
        return {
          project,
          diagnostics: [`Group ${action.groupId} was not found`]
        };
      }

      if (action.newObjectIds.length !== sourceGroup.objectIds.length) {
        return {
          project,
          diagnostics: ["Duplicate group requires one new object id per source object"]
        };
      }

      const sourceObjects = sourceGroup.objectIds
        .map((objectId) => project.scene.objects.find((sceneObject) => sceneObject.id === objectId))
        .filter((object): object is SceneObject => Boolean(object));

      const idMap = new Map(sourceGroup.objectIds.map((objectId, index) => [objectId, action.newObjectIds[index]]));
      const duplicatedObjects = sourceObjects.map((sourceObject) => ({
        ...sourceObject,
        id: idMap.get(sourceObject.id)!,
        name: `${sourceObject.name} copy`,
        transform: {
          ...sourceObject.transform,
          position: {
            x: sourceObject.transform.position.x + 0.75,
            y: sourceObject.transform.position.y,
            z: sourceObject.transform.position.z + 0.75
          }
        },
        children: sourceObject.children?.map((childId) => idMap.get(childId) ?? childId),
        meta: {
          ...sourceObject.meta,
          groupId: action.newGroupId,
          duplicatedFrom: sourceObject.id
        },
        warnings: [...sourceObject.warnings]
      }));

      const duplicatedGroup: SceneGroup = {
        ...sourceGroup,
        id: action.newGroupId,
        name: `${sourceGroup.name} copy`,
        objectIds: duplicatedObjects.map((object) => object.id),
        builderRef: sourceGroup.builderRef
          ? {
              ...sourceGroup.builderRef,
              parameters: { ...sourceGroup.builderRef.parameters }
            }
          : undefined,
        meta: {
          ...sourceGroup.meta,
          duplicatedFrom: sourceGroup.id
        }
      };

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              objects: [...project.scene.objects, ...duplicatedObjects],
              groups: [...project.scene.groups, duplicatedGroup],
              layers: project.scene.layers.map((layer) =>
                layer.objectIds.some((objectId) => sourceGroup.objectIds.includes(objectId))
                  ? {
                      ...layer,
                      objectIds: [...layer.objectIds, ...duplicatedGroup.objectIds]
                    }
                  : layer
              ),
              selection: {
                selectedObjectIds: duplicatedGroup.objectIds,
                selectedGroupId: duplicatedGroup.id,
                activeInspectorTargetId: duplicatedGroup.objectIds[0],
                mode: "group"
              }
            }
          },
          action.type
        ),
        diagnostics: [`Duplicated ${sourceGroup.name}`]
      };
    }

    case "scene/deleteGroup": {
      const sourceGroup = project.scene.groups.find((group) => group.id === action.groupId);

      if (!sourceGroup) {
        return {
          project,
          diagnostics: [`Group ${action.groupId} was not found`]
        };
      }

      const deletedObjectIds = new Set(sourceGroup.objectIds);

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              objects: project.scene.objects
                .filter((sceneObject) => !deletedObjectIds.has(sceneObject.id))
                .map((sceneObject) => ({
                  ...sceneObject,
                  children: sceneObject.children?.filter((childId) => !deletedObjectIds.has(childId))
                })),
              groups: project.scene.groups
                .filter((group) => group.id !== sourceGroup.id)
                .map((group) => ({
                  ...group,
                  objectIds: group.objectIds.filter((objectId) => !deletedObjectIds.has(objectId))
                }))
                .filter((group) => group.objectIds.length > 0),
              layers: project.scene.layers.map((layer) => ({
                ...layer,
                objectIds: layer.objectIds.filter((objectId) => !deletedObjectIds.has(objectId))
              })),
              selection: {
                selectedObjectIds: [],
                mode: "none"
              }
            }
          },
          action.type
        ),
        diagnostics: ["Group deleted"]
      };
    }

    case "scene/renameGroup": {
      const trimmedName = action.name.trim();
      if (!trimmedName) {
        return {
          project,
          diagnostics: ["Group name cannot be empty"]
        };
      }

      if (!project.scene.groups.some((group) => group.id === action.groupId)) {
        return {
          project,
          diagnostics: [`Group ${action.groupId} was not found`]
        };
      }

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              groups: project.scene.groups.map((group) =>
                group.id === action.groupId
                  ? {
                      ...group,
                      name: trimmedName
                    }
                  : group
              )
            }
          },
          action.type
        ),
        diagnostics: ["Group renamed"]
      };
    }

    case "scene/duplicateObject": {
      const sourceObject = project.scene.objects.find((sceneObject) => sceneObject.id === action.objectId);

      if (!sourceObject) {
        return {
          project,
          diagnostics: [`Object ${action.objectId} was not found`]
        };
      }

      const duplicatedObject: SceneObject = {
        ...sourceObject,
        id: action.newObjectId,
        name: `${sourceObject.name} copy`,
        transform: {
          ...sourceObject.transform,
          position: {
            x: sourceObject.transform.position.x + 0.75,
            y: sourceObject.transform.position.y,
            z: sourceObject.transform.position.z + 0.75
          }
        },
        children: sourceObject.children ? [...sourceObject.children] : undefined,
        meta: {
          ...sourceObject.meta,
          duplicatedFrom: sourceObject.id
        },
        warnings: [...sourceObject.warnings]
      };

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              objects: [...project.scene.objects, duplicatedObject],
              layers: project.scene.layers.map((layer) =>
                layer.objectIds.includes(sourceObject.id)
                  ? {
                      ...layer,
                      objectIds: [...layer.objectIds, duplicatedObject.id]
                    }
                  : layer
              ),
              selection: {
                selectedObjectIds: [duplicatedObject.id],
                activeInspectorTargetId: duplicatedObject.id,
                mode: "object"
              }
            }
          },
          action.type
        ),
        diagnostics: [`Duplicated ${sourceObject.name}`]
      };
    }

    case "scene/deleteObject": {
      const objectExists = project.scene.objects.some((sceneObject) => sceneObject.id === action.objectId);

      if (!objectExists) {
        return {
          project,
          diagnostics: [`Object ${action.objectId} was not found`]
        };
      }

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              objects: project.scene.objects
                .filter((sceneObject) => sceneObject.id !== action.objectId)
                .map((sceneObject) => ({
                  ...sceneObject,
                  children: sceneObject.children?.filter((childId) => childId !== action.objectId)
                })),
              groups: project.scene.groups
                .map((group) => ({
                  ...group,
                  objectIds: group.objectIds.filter((objectId) => objectId !== action.objectId)
                }))
                .filter((group) => group.objectIds.length > 0),
              layers: project.scene.layers.map((layer) => ({
                ...layer,
                objectIds: layer.objectIds.filter((objectId) => objectId !== action.objectId)
              })),
              selection: {
                selectedObjectIds: [],
                mode: "none"
              }
            }
          },
          action.type
        ),
        diagnostics: ["Object deleted"]
      };
    }

    case "scene/renameObject": {
      const trimmedName = action.name.trim();
      if (!trimmedName) {
        return {
          project,
          diagnostics: ["Object name cannot be empty"]
        };
      }

      if (!project.scene.objects.some((sceneObject) => sceneObject.id === action.objectId)) {
        return {
          project,
          diagnostics: [`Object ${action.objectId} was not found`]
        };
      }

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              objects: project.scene.objects.map((sceneObject) =>
                sceneObject.id === action.objectId
                  ? {
                      ...sceneObject,
                      name: trimmedName
                    }
                  : sceneObject
              )
            }
          },
          action.type
        ),
        diagnostics: ["Object renamed"]
      };
    }

    case "scene/moveObject": {
      const object = project.scene.objects.find((sceneObject) => sceneObject.id === action.objectId);
      const canMove = object?.capabilities.transformRules?.canMove ?? false;
      const locked = isObjectOnLockedLayer(project, action.objectId);

      if (!object || !canMove || locked) {
        return {
          project,
          diagnostics: [`Object ${action.objectId} cannot be moved`]
        };
      }

      const lockY = object.capabilities.transformRules?.lockY ?? false;

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              objects: project.scene.objects.map((sceneObject) => {
                if (sceneObject.id !== action.objectId) {
                  return sceneObject;
                }

                return {
                  ...sceneObject,
                  transform: {
                    ...sceneObject.transform,
                    position: {
                      x: sceneObject.transform.position.x + action.delta.x,
                      y: lockY
                        ? sceneObject.transform.position.y
                        : sceneObject.transform.position.y + action.delta.y,
                      z: sceneObject.transform.position.z + action.delta.z
                    }
                  }
                };
              })
            }
          },
          action.type
        ),
        diagnostics: []
      };
    }

    case "scene/snapObjectPortToTargetPort": {
      const object = project.scene.objects.find((sceneObject) => sceneObject.id === action.objectId);
      const targetObject = project.scene.objects.find((sceneObject) => sceneObject.id === action.targetObjectId);
      const canMove = object?.capabilities.transformRules?.canMove ?? false;

      if (!object || !targetObject || !canMove) {
        return {
          project,
          diagnostics: [`Cannot snap ${action.objectId} to ${action.targetObjectId}`]
        };
      }

      const delta = createConnectionAlignmentDelta(object, action.portId, targetObject, action.targetPortId);

      if (!delta) {
        return {
          project,
          diagnostics: ["Connection port was not found"]
        };
      }

      if (!delta.compatible) {
        return {
          project,
          diagnostics: ["Connection ports are not compatible"]
        };
      }

      const lockY = object.capabilities.transformRules?.lockY ?? false;

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              objects: project.scene.objects.map((sceneObject) => {
                if (sceneObject.id !== action.objectId) {
                  return sceneObject;
                }

                return {
                  ...sceneObject,
                  transform: {
                    ...sceneObject.transform,
                    position: {
                      x: sceneObject.transform.position.x + delta.positionDelta.x,
                      y: lockY
                        ? sceneObject.transform.position.y
                        : sceneObject.transform.position.y + delta.positionDelta.y,
                      z: sceneObject.transform.position.z + delta.positionDelta.z
                    }
                  }
                };
              }),
              selection: {
                selectedObjectIds: [object.id],
                activeInspectorTargetId: object.id,
                mode: "object"
              }
            }
          },
          action.type
        ),
        diagnostics: [`Snapped ${object.name} to ${targetObject.name}`]
      };
    }

    case "scene/snapObjectToNearestCompatiblePort": {
      const object = project.scene.objects.find((sceneObject) => sceneObject.id === action.objectId);
      const canMove = object?.capabilities.transformRules?.canMove ?? false;

      if (!object || !canMove) {
        return {
          project,
          diagnostics: [`Object ${action.objectId} cannot be snapped`]
        };
      }

      const candidate = findNearestCompatibleConnectionPort(object, project.scene.objects, {
        maxDistanceM: action.maxDistanceM ?? 0.75
      });

      if (!candidate) {
        return {
          project,
          diagnostics: ["No compatible snap target nearby"]
        };
      }

      return applyProjectAction(project, {
        type: "scene/snapObjectPortToTargetPort",
        objectId: object.id,
        portId: candidate.movingPort.id,
        targetObjectId: candidate.targetObject.id,
        targetPortId: candidate.targetPort.id
      });
    }

    case "scene/snapGroupToNearestCompatiblePort": {
      const group = project.scene.groups.find((sceneGroup) => sceneGroup.id === action.groupId);

      if (!group || group.locked) {
        return {
          project,
          diagnostics: [`Group ${action.groupId} cannot be snapped`]
        };
      }

      const groupObjectIds = new Set(group.objectIds);
      const groupObjects = project.scene.objects.filter((sceneObject) => groupObjectIds.has(sceneObject.id));
      const targetObjects = project.scene.objects.filter((sceneObject) => !groupObjectIds.has(sceneObject.id));
      const candidates = groupObjects
        .map((sceneObject) => ({
          sceneObject,
          candidate: findNearestCompatibleConnectionPort(sceneObject, targetObjects, {
            maxDistanceM: action.maxDistanceM ?? 0.75
          })
        }))
        .filter((entry): entry is { sceneObject: SceneObject; candidate: NonNullable<typeof entry.candidate> } =>
          Boolean(entry.candidate)
        )
        .sort((left, right) => left.candidate.distance - right.candidate.distance);
      const bestCandidate = candidates[0];

      if (!bestCandidate) {
        return {
          project,
          diagnostics: ["No compatible snap target nearby"]
        };
      }

      const delta = createConnectionAlignmentDelta(
        bestCandidate.sceneObject,
        bestCandidate.candidate.movingPort.id,
        bestCandidate.candidate.targetObject,
        bestCandidate.candidate.targetPort.id
      );

      if (!delta || !delta.compatible) {
        return {
          project,
          diagnostics: ["Connection ports are not compatible"]
        };
      }

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              objects: project.scene.objects.map((sceneObject) => {
                if (!groupObjectIds.has(sceneObject.id)) {
                  return sceneObject;
                }

                const canMove = sceneObject.capabilities.transformRules?.canMove ?? false;
                const lockY = sceneObject.capabilities.transformRules?.lockY ?? false;

                if (!canMove) {
                  return sceneObject;
                }

                return {
                  ...sceneObject,
                  transform: {
                    ...sceneObject.transform,
                    position: {
                      x: sceneObject.transform.position.x + delta.positionDelta.x,
                      y: lockY
                        ? sceneObject.transform.position.y
                        : sceneObject.transform.position.y + delta.positionDelta.y,
                      z: sceneObject.transform.position.z + delta.positionDelta.z
                    }
                  }
                };
              }),
              selection: {
                selectedObjectIds: group.objectIds,
                selectedGroupId: group.id,
                activeInspectorTargetId: group.objectIds[0],
                mode: "group"
              }
            }
          },
          action.type
        ),
        diagnostics: [`Snapped ${group.name} to ${bestCandidate.candidate.targetObject.name}`]
      };
    }

    case "scene/moveGroup": {
      const group = project.scene.groups.find((sceneGroup) => sceneGroup.id === action.groupId);

      if (!group || group.locked) {
        return {
          project,
          diagnostics: [`Group ${action.groupId} cannot be moved`]
        };
      }

      const groupObjectIds = new Set(group.objectIds);
      const lockedObjectIds = project.scene.layers
        .filter((layer) => layer.locked)
        .flatMap((layer) => layer.objectIds);

      if (group.objectIds.some((objectId) => lockedObjectIds.includes(objectId))) {
        return {
          project,
          diagnostics: [`Group ${action.groupId} contains locked layer objects`]
        };
      }

      return {
        project: touchProject(
          {
            ...project,
            scene: {
              ...project.scene,
              objects: project.scene.objects.map((sceneObject) => {
                if (!groupObjectIds.has(sceneObject.id)) {
                  return sceneObject;
                }

                const canMove = sceneObject.capabilities.transformRules?.canMove ?? false;
                const lockY = sceneObject.capabilities.transformRules?.lockY ?? false;

                if (!canMove) {
                  return sceneObject;
                }

                return {
                  ...sceneObject,
                  transform: {
                    ...sceneObject.transform,
                    position: {
                      x: sceneObject.transform.position.x + action.delta.x,
                      y: lockY
                        ? sceneObject.transform.position.y
                        : sceneObject.transform.position.y + action.delta.y,
                      z: sceneObject.transform.position.z + action.delta.z
                    }
                  }
                };
              }),
              selection: {
                selectedObjectIds: group.objectIds,
                selectedGroupId: group.id,
                activeInspectorTargetId: group.objectIds[0],
                mode: "group"
              }
            }
          },
          action.type
        ),
        diagnostics: []
      };
    }

    case "scene/openBuilder":
      return {
        project,
        diagnostics: [`${action.builderType} is a Task 001 placeholder`]
      };

    default: {
      const exhaustive: never = action;
      return {
        project,
        diagnostics: [`Unhandled action ${JSON.stringify(exhaustive)}`]
      };
    }
  }
};

export type ActionDispatcher = (action: ProjectAction) => ActionResult;
