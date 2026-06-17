import { describe, expect, it } from "vitest";
import { calculateStage, defaultStageInput } from "../calculators/stage/calculateStage";
import type { StageInput } from "../calculators/stage/contracts";

type StageInputOverrides = Omit<Partial<StageInput>, "stairs" | "closure" | "pricing"> & {
  stairs?: Partial<StageInput["stairs"]>;
  closure?: Partial<StageInput["closure"]>;
  pricing?: Partial<StageInput["pricing"]>;
};

const baseInput = (overrides: StageInputOverrides = {}): StageInput => ({
  ...defaultStageInput(),
  ...overrides,
  stairs: {
    ...defaultStageInput().stairs,
    ...overrides.stairs
  },
  closure: {
    ...defaultStageInput().closure,
    ...overrides.closure
  },
  pricing: {
    ...defaultStageInput().pricing,
    ...overrides.pricing
  }
});

describe("Stage core", () => {
  it("calculates Imlight Copy 7.2 x 4.8 x 0.8 on a 1.2 m module grid", () => {
    const result = calculateStage(baseInput({ system: "imlight-copy" }), "2026-06-16T00:00:00.000Z");

    expect(result.kind).toBe("stage");
    expect(result.calculationEngineVersion).toBe("stage-core-0.1.0");
    expect(result.stage.built).toMatchObject({
      widthM: 7.2,
      depthM: 4.8,
      heightM: 0.8,
      columns: 6,
      rows: 4,
      moduleCount: 24
    });
    expect(result.bom[0].rows[0]).toMatchObject({
      name: "Imlight Copy deck 1.2 x 1.2 m",
      quantity: 24
    });
    expect(result.bom[1].rows[0]).toMatchObject({
      quantity: 35
    });
    expect(result.price.total).toBe(800);
    expect(result.drawingModel.elements).toHaveLength(24);
  });

  it("calculates PKC SHIP-PAZ with shared-grid supports", () => {
    const result = calculateStage(baseInput({ system: "pkc-ship-paz" }), "2026-06-16T00:00:00.000Z");

    expect(result.bom[0].rows[0]).toMatchObject({
      name: "PKC SS-PS module 1.2 x 1.2 m",
      quantity: 24
    });
    expect(result.bom[1].rows[0].quantity).toBe(35);
    expect(result.bom[2].rows[0]).toMatchObject({
      name: "PKC SHIP-PAZ connector set",
      quantity: 24
    });
  });

  it("calculates PKC PAZ-PAZ with four legs per module and connector rows", () => {
    const result = calculateStage(baseInput({ system: "pkc-paz-paz" }), "2026-06-16T00:00:00.000Z");

    expect(result.bom[0].rows[0]).toMatchObject({
      name: "PKC SS-PP module 1.2 x 1.2 m",
      quantity: 24
    });
    expect(result.bom[1].rows[0].quantity).toBe(96);
    expect(result.bom[2].rows.map((row) => [row.sku, row.quantity])).toEqual([
      ["SD-LM-T", 20],
      ["SD-LM-X", 15],
      ["SD-LM-SS", 96]
    ]);
  });

  it("adds stairs and closure BOM and price rows", () => {
    const result = calculateStage(
      baseInput({
        stairs: { enabled: true, count: 2, widthM: 1 },
        closure: { enabled: true, type: "fabric", sides: ["front", "left"] }
      }),
      "2026-06-16T00:00:00.000Z"
    );

    expect(result.bom[3].rows[0]).toMatchObject({ name: "Stage stairs 1 m", quantity: 2 });
    expect(result.bom[4].rows[0]).toMatchObject({ name: "Stage closure fabric", quantity: 12 });
    expect(result.price.rows.some((row) => row.id === "stage-stairs-price")).toBe(true);
    expect(result.price.rows.some((row) => row.id === "stage-closure-price")).toBe(true);
    expect(result.price.total).toBe(920);
  });

  it("returns structured warnings for invalid zero width", () => {
    const result = calculateStage(baseInput({ widthM: 0 }), "2026-06-16T00:00:00.000Z");

    expect(result.meta.hasBlockingErrors).toBe(true);
    expect(result.warnings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "invalid-widthM",
          severity: "danger",
          blocksExport: true
        })
      ])
    );
    expect(result.stage.built.moduleCount).toBeGreaterThan(0);
  });

  it("blocks negative price input without returning negative totals", () => {
    const result = calculateStage(baseInput({ pricing: { moduleRentalPrice: -10 } }), "2026-06-16T00:00:00.000Z");

    expect(result.meta.hasBlockingErrors).toBe(true);
    expect(result.price.total).toBeGreaterThanOrEqual(0);
    expect(result.warnings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "negative-price-moduleRentalPrice",
          fieldPath: "pricing.moduleRentalPrice"
        })
      ])
    );
  });
});
