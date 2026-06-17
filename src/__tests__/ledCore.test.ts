import { describe, expect, it } from "vitest";
import { calculateLed } from "../calculators/led/calculateLed";

const baseInput = () => ({
  calculationName: "LED test",
  priceProfileId: "default-local",
  locale: "en-US" as const,
  currency: "USD" as const,
  cabinetId: "generic-640" as const,
  constructions: [
    {
      id: "main",
      name: "Main LED",
      widthM: 5.12,
      heightM: 2.56,
      mountMode: {
        hanging: true,
        standing: false
      }
    }
  ],
  pricing: {
    cabinetRentalPrice: 18,
    mountingPrice: 160,
    deliveryPrice: 90,
    hangingBarPrice: 8,
    legPrice: 12
  }
});

describe("LED core", () => {
  it("calculates deterministic 640 mm cabinet grid, weight and power", () => {
    const result = calculateLed(baseInput(), "2026-06-17T00:00:00.000Z");

    expect(result.kind).toBe("led");
    expect(result.led.constructions[0].built).toMatchObject({
      widthM: 5.12,
      heightM: 2.56,
      columns: 8,
      rows: 4,
      cabinetCount: 32
    });
    expect(result.led.totals).toMatchObject({
      cabinetCount: 32,
      weightKg: 448,
      powerW: 10240,
      hangingBars: 8,
      legs: 0,
      powerCables: 4
    });
    expect(result.bom.flatMap((group) => group.rows).find((row) => row.id === "led-cabinets")?.quantity).toBe(32);
    expect(result.drawingModel.elements).toHaveLength(32);
  });

  it("warns when requested size is rounded to cabinet grid", () => {
    const result = calculateLed({
      ...baseInput(),
      constructions: [
        {
          ...baseInput().constructions[0],
          widthM: 5,
          heightM: 2.5,
          mountMode: {
            hanging: false,
            standing: true
          },
          floorClearanceM: 0.6,
          legCount: 4
        }
      ]
    });

    expect(result.led.constructions[0].built.widthM).toBe(5.12);
    expect(result.led.constructions[0].built.heightM).toBe(2.56);
    expect(result.led.constructions[0].floorClearanceM).toBe(0.6);
    expect(result.led.constructions[0].legCount).toBe(4);
    expect(result.led.totals.legs).toBe(4);
    expect(result.warnings.map((warning) => warning.code)).toEqual(
      expect.arrayContaining(["width-rounded-main", "height-rounded-main", "missing-leg-type"])
    );
  });
});
