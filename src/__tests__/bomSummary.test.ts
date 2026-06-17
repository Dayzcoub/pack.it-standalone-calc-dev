import { describe, expect, it } from "vitest";
import { createInitialScene } from "../app/createInitialProject";
import { createSceneObjectFromCatalogItem } from "../catalog/createSceneObjectFromCatalogItem";
import { createLocalMdmCatalogModel } from "../catalog/localMdmCatalog";
import { PROJECT_SCHEMA_VERSION } from "../app/constants";
import { createTrussGroup } from "../builders/truss/createTrussGroup";
import { createStageGroup } from "../builders/stage/createStageGroup";
import { createBomSummary } from "../bom/createBomSummary";

describe("createBomSummary", () => {
  it("reports the initial visual placeholder object", () => {
    const scene = createInitialScene();
    const summary = createBomSummary(scene, "2026-06-16T00:00:00.000Z");

    expect(summary.engineVersion).toBe("bom-scene-placeholder-0.1.0");
    expect(summary.totalQuantity).toBe(1);
    expect(summary.contributions).toMatchObject([
      {
        name: "Test scene cube",
        objectType: "generic3d",
        quantity: 1,
        source: "visual-only",
        confidence: "placeholder"
      }
    ]);
  });

  it("creates catalog-linked rows from Asset Library objects", () => {
    const scene = createInitialScene();
    const catalog = createLocalMdmCatalogModel(PROJECT_SCHEMA_VERSION);
    const item = catalog.items.find((candidate) => candidate.id === "MDM_TQ29X29V050CXV")!;
    scene.objects.push(createSceneObjectFromCatalogItem(item));

    const summary = createBomSummary(scene, "2026-06-16T00:00:00.000Z");
    const catalogRow = summary.contributions.find((contribution) => contribution.catalogRef === item.id);

    expect(catalogRow).toMatchObject({
      name: "TQ29x29V050CXV",
      objectType: "truss",
      quantity: 1,
      source: "catalog",
      confidence: "catalog-linked"
    });
    expect(summary.totalQuantity).toBe(2);
  });

  it("aggregates generated builder placeholder rows", () => {
    const scene = createInitialScene();
    const truss = createTrussGroup({ mode: "portal", widthM: 6, heightM: 4, depthM: 3, system: "mdm-tq29-c2" });
    scene.objects.push(...truss.objects);

    const summary = createBomSummary(scene, "2026-06-16T00:00:00.000Z");
    const straightRow = summary.contributions.find((contribution) => contribution.catalogRef === "MDM_TQ29X29V300CXV");

    expect(straightRow).toMatchObject({
      quantity: 4,
      source: "generated-placeholder",
      confidence: "placeholder"
    });
  });

  it("reads generated BOM rows stored on StageGroup metadata", () => {
    const scene = createInitialScene();
    const stage = createStageGroup({
      system: "pkc-paz-paz",
      widthM: 2.4,
      depthM: 2.4,
      heightM: 0.8,
      deckType: "generic-deck",
      stairsEnabled: true,
      closureEnabled: true
    });
    scene.groups.push(stage.group);
    scene.objects.push(...stage.objects);

    const summary = createBomSummary(scene, "2026-06-16T00:00:00.000Z");
    const deckRow = summary.contributions.find((contribution) => contribution.catalogRef === "PKC-SS-PP-1200");
    const supportRow = summary.contributions.find((contribution) => contribution.catalogRef === "PKC-PAZ-PAZ-LEG-PLACEHOLDER");
    const closureRow = summary.contributions.find((contribution) => contribution.name === "Stage closure fabric");

    expect(deckRow).toMatchObject({
      quantity: 4,
      source: "group-generated",
      unit: "pcs"
    });
    expect(supportRow).toMatchObject({
      quantity: 16,
      source: "group-generated"
    });
    expect(closureRow).toMatchObject({
      quantity: 2.4,
      unit: "m"
    });
  });
});
