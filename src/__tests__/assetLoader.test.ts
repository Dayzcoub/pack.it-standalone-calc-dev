import { describe, expect, it } from "vitest";
import { createTestSceneObject } from "../app/createInitialProject";
import { createAssetLoaderFromFeatureFlags, createDisabledAssetLoader } from "../assets/assetLoader";
import { createRenderAssetPlan } from "../assets/rendererAssetPolicy";
import { PROJECT_SCHEMA_VERSION } from "../app/constants";
import { createSceneObjectFromCatalogItem } from "../catalog/createSceneObjectFromCatalogItem";
import { createLocalMdmCatalogModel } from "../catalog/localMdmCatalog";

describe("asset loader boundary", () => {
  it("keeps future GLB loading disabled by MVP scope", async () => {
    const catalog = createLocalMdmCatalogModel(PROJECT_SCHEMA_VERSION);
    const item = catalog.items.find((candidate) => candidate.id === "MDM_TQ29X29V300CXV")!;
    const plan = createRenderAssetPlan(createSceneObjectFromCatalogItem(item));
    const loader = createDisabledAssetLoader();

    const result = await loader.load(plan);

    expect(plan.expectedLoadStatus).toBe("disabled-by-scope");
    expect(result.status).toBe("disabled-by-scope");
    expect(result.object).toBeUndefined();
  });

  it("does not request loading for procedural placeholders", async () => {
    const loader = createDisabledAssetLoader();
    const result = await loader.load(createRenderAssetPlan(createTestSceneObject()));

    expect(result.status).toBe("not-requested");
  });

  it("creates the disabled loader from current feature flags", async () => {
    const loader = createAssetLoaderFromFeatureFlags({
      blenderServer: false,
      connectedCrmWarehouse: false,
      aiAssistant: false,
      runtimeGlbLoading: false
    });
    const catalog = createLocalMdmCatalogModel(PROJECT_SCHEMA_VERSION);
    const item = catalog.items.find((candidate) => candidate.id === "MDM_TQ29X29V300CXV")!;

    const result = await loader.load(createRenderAssetPlan(createSceneObjectFromCatalogItem(item)));

    expect(result.status).toBe("disabled-by-scope");
  });
});
