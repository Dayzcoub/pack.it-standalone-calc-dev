import type { SceneLayer, SceneObject, SceneObjectType } from "./contracts";

export type BuiltInLayerId =
  | "layer-stage"
  | "layer-truss"
  | "layer-led"
  | "layer-audio"
  | "layer-light"
  | "layer-power"
  | "layer-rigging"
  | "layer-decor"
  | "layer-generic";

export const BUILT_IN_LAYER_DEFINITIONS: Array<{ id: BuiltInLayerId; name: string; objectTypes: SceneObjectType[] }> = [
  { id: "layer-stage", name: "Stage", objectTypes: ["stage"] },
  { id: "layer-truss", name: "Truss", objectTypes: ["truss"] },
  { id: "layer-led", name: "LED", objectTypes: ["led"] },
  { id: "layer-audio", name: "Audio", objectTypes: ["audio"] },
  { id: "layer-light", name: "Light", objectTypes: ["light"] },
  { id: "layer-power", name: "Power", objectTypes: ["power"] },
  { id: "layer-rigging", name: "Rigging", objectTypes: ["rigging"] },
  { id: "layer-decor", name: "Decor", objectTypes: ["decor"] },
  { id: "layer-generic", name: "Generic", objectTypes: ["generic3d"] }
];

export const createBuiltInLayers = (objects: SceneObject[] = []): SceneLayer[] =>
  BUILT_IN_LAYER_DEFINITIONS.map((definition) => ({
    id: definition.id,
    name: definition.name,
    visible: true,
    locked: false,
    objectIds: objects
      .filter((object) => definition.objectTypes.includes(object.type))
      .map((object) => object.id)
  }));

export const layerIdForObjectType = (type: SceneObjectType): BuiltInLayerId =>
  BUILT_IN_LAYER_DEFINITIONS.find((definition) => definition.objectTypes.includes(type))?.id ?? "layer-generic";

export const addObjectsToBuiltInLayers = (layers: SceneLayer[], objects: SceneObject[]): SceneLayer[] =>
  layers.map((layer) => ({
    ...layer,
    objectIds: [
      ...layer.objectIds,
      ...objects
        .filter((object) => layer.id === layerIdForObjectType(object.type))
        .map((object) => object.id)
    ]
  }));
