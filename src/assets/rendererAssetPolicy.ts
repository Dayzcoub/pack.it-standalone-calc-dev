import { resolveAssetRef, type AssetResolution } from "./assetResolver";
import type { AssetLoadStatus } from "./assetLoader";
import type { SceneObject } from "../scene/contracts";

export type RenderAssetStrategy =
  | "procedural-placeholder"
  | "future-glb-placeholder"
  | "blocked-external-placeholder"
  | "unsupported-placeholder";

export type RenderAssetPlan = {
  strategy: RenderAssetStrategy;
  resolution: AssetResolution;
  expectedLoadStatus: AssetLoadStatus;
  reason: string;
};

export const createRenderAssetPlan = (object: SceneObject): RenderAssetPlan => {
  const resolution = resolveAssetRef(object.assetRef);

  if (resolution.status === "local-runtime-candidate") {
    return {
      strategy: "future-glb-placeholder",
      resolution,
      expectedLoadStatus: "disabled-by-scope",
      reason: "GLB/GLTF asset is local, but runtime GLTFLoader is not enabled yet."
    };
  }

  if (resolution.status === "external-blocked") {
    return {
      strategy: "blocked-external-placeholder",
      resolution,
      expectedLoadStatus: "blocked",
      reason: "External asset URLs are blocked by offline-first runtime policy."
    };
  }

  if (resolution.status === "unsupported") {
    return {
      strategy: "unsupported-placeholder",
      resolution,
      expectedLoadStatus: "unsupported",
      reason: "Asset reference is not loadable by the future GLB/GLTF runtime path."
    };
  }

  return {
    strategy: "procedural-placeholder",
    resolution,
    expectedLoadStatus: "not-requested",
    reason: "Object has no runtime asset and should use procedural placeholder geometry."
  };
};
