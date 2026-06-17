import type { CatalogItem } from "./contracts";
import type { SceneObject } from "../scene/contracts";
import { createId } from "../app/id";

export const createSceneObjectFromCatalogItem = (item: CatalogItem, index = 1): SceneObject => {
  const height = item.dimensions?.height ?? 1;

  return {
    id: createId("catalog-object"),
    type: item.type,
    name: item.displayName,
    transform: {
      position: { x: (index - 1) * 0.5, y: height / 2, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 }
    },
    dimensions: item.dimensions,
    assetRef: item.assetRef,
    catalogRef: item.id,
    connectionPorts: item.connectionPorts?.map((port) => ({ ...port })),
    bomMode: "catalogLinked",
    capabilities: {
      ...item.capabilities,
      transformRules: {
        canMove: true,
        canRotate: true,
        canScale: false,
        lockY: true
      }
    },
    meta: {
      source: "asset-library",
      manufacturer: item.manufacturer,
      model: item.model,
      sourceStatus: item.source.sourceStatus
    },
    warnings: []
  };
};
