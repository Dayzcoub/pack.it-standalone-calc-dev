import { describe, expect, it } from "vitest";
import { createStageGroup } from "../builders/stage/createStageGroup";

describe("Stage builder placeholder", () => {
  it("creates a visual StageGroup with generated child SceneObjects", () => {
    const result = createStageGroup({
      system: "imlight-copy",
      widthM: 4,
      depthM: 3,
      heightM: 0.8,
      deckType: "generic-deck",
      stairsEnabled: true,
      closureEnabled: false
    });

    expect(result.group.name).toBe("Stage 4.8 x 3.6 m");
    expect(result.group.type).toBe("StageGroup");
    expect(result.group.builderRef?.builderType).toBe("stage");
    expect(result.group.builderRef?.parameters).toMatchObject({
      system: "imlight-copy",
      requestedWidthM: 4,
      requestedDepthM: 3,
      widthM: 4.8,
      depthM: 3.6,
      heightM: 0.8,
      stairsEnabled: true,
      closureEnabled: false
    });
    expect(result.objects).toHaveLength(12);
    expect(result.objects.every((object) => object.type === "stage")).toBe(true);
    expect(result.objects.every((object) => object.bomMode === "none")).toBe(true);
    expect(result.objects.every((object) => object.catalogRef === "IMC-DECK-1200")).toBe(true);
    expect(result.group.objectIds).toEqual(result.objects.map((object) => object.id));
    expect(result.group.meta?.calculationEngineVersion).toBe("stage-core-0.1.0");
    expect(result.group.meta?.generatedBomGroups).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "stage-deck-group"
        })
      ])
    );
  });
});
