import type { Object3D } from "three";
import type { RenderAssetPlan } from "./rendererAssetPolicy";
import type { ProjectSettings } from "../project/contracts";

export type AssetLoadStatus =
  | "not-requested"
  | "loaded"
  | "disabled-by-scope"
  | "blocked"
  | "unsupported"
  | "failed";

export type AssetLoadResult = {
  status: AssetLoadStatus;
  object?: Object3D;
  message: string;
};

export type AssetLoader = {
  load(plan: RenderAssetPlan): Promise<AssetLoadResult>;
};

export const createDisabledAssetLoader = (): AssetLoader => ({
  async load(plan) {
    if (plan.strategy === "future-glb-placeholder") {
      return {
        status: "disabled-by-scope",
        message: "Runtime GLB loading is intentionally disabled for the current MVP scope."
      };
    }

    if (plan.strategy === "blocked-external-placeholder") {
      return {
        status: "blocked",
        message: "External assets are blocked by offline-first runtime policy."
      };
    }

    if (plan.strategy === "unsupported-placeholder") {
      return {
        status: "unsupported",
        message: "Asset reference is not supported by the runtime asset boundary."
      };
    }

    return {
      status: "not-requested",
      message: "Procedural placeholder does not need asset loading."
    };
  }
});

export const createAssetLoaderFromFeatureFlags = (featureFlags: ProjectSettings["featureFlags"]): AssetLoader => {
  if (featureFlags.runtimeGlbLoading) {
    return createDisabledAssetLoader();
  }

  return createDisabledAssetLoader();
};
