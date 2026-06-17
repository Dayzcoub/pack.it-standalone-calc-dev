import { describe, expect, it } from "vitest";
import { createTestSceneObject } from "../app/createInitialProject";
import { createRenderAssetPlan } from "../assets/rendererAssetPolicy";
import { createLocalMdmCatalogModel } from "../catalog/localMdmCatalog";
import { createSceneObjectFromCatalogItem } from "../catalog/createSceneObjectFromCatalogItem";
import { PROJECT_SCHEMA_VERSION } from "../app/constants";

describe("renderer asset policy", () => {
  it("uses procedural placeholders for objects without assetRef", () => {
    const object = createTestSceneObject();

    expect(createRenderAssetPlan(object).strategy).toBe("procedural-placeholder");
  });

  it("keeps local GLB assets behind a future loader placeholder strategy", () => {
    const catalog = createLocalMdmCatalogModel(PROJECT_SCHEMA_VERSION);
    const item = catalog.items.find((candidate) => candidate.id === "MDM_TQ29X29V300CXV")!;
    const object = createSceneObjectFromCatalogItem(item);

    const plan = createRenderAssetPlan(object);

    expect(plan.strategy).toBe("future-glb-placeholder");
    expect(plan.resolution.runtimePath).toBe(item.assetRef);
  });

  it("keeps blocked and unsupported assets on placeholder geometry", () => {
    expect(
      createRenderAssetPlan({
        ...createTestSceneObject(),
        assetRef: "https://example.com/model.glb"
      }).strategy
    ).toBe("blocked-external-placeholder");
    expect(
      createRenderAssetPlan({
        ...createTestSceneObject(),
        assetRef: "/assets/model.obj"
      }).strategy
    ).toBe("unsupported-placeholder");
  });
});
