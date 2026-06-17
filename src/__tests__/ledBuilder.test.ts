import { describe, expect, it } from "vitest";
import { createLedGroup, selectLedLegSeamIndexes } from "../builders/led/createLedGroup";

describe("LED builder", () => {
  it("creates a LedGroup with cabinet objects and generated BOM metadata", () => {
    const result = createLedGroup({
      cabinetId: "generic-640",
      widthM: 1.92,
      heightM: 1.28,
      hangingEnabled: true,
      standingEnabled: true,
      floorClearanceM: 0.5,
      legCount: 2,
      legType: "2m"
    });

    const cabinets = result.objects.filter((object) => object.type === "led");
    const legs = result.objects.filter((object) => object.meta?.partRole === "standing-leg");

    expect(result.group.type).toBe("LedGroup");
    expect(result.group.name).toBe("LED 1.92 x 1.28 m");
    expect(cabinets).toHaveLength(6);
    expect(legs).toHaveLength(2);
    expect(legs.map((leg) => leg.transform.position.x)).toEqual([-0.32, 0.32]);
    expect(legs.every((leg) => leg.transform.position.y === 0.25)).toBe(true);
    expect(legs.every((leg) => leg.dimensions?.height === 0.5)).toBe(true);
    expect(Math.min(...cabinets.map((cabinet) => cabinet.transform.position.y - (cabinet.dimensions?.height ?? 0) / 2))).toBe(0.5);
    expect(result.group.meta?.generatedBomGroups).toBeDefined();
    expect(result.group.builderRef?.parameters).toMatchObject({
      widthM: 1.92,
      heightM: 1.28,
      standingEnabled: true,
      floorClearanceM: 0.5,
      legCount: 2,
      legType: "2m"
    });
  });

  it("distributes four legs evenly across cabinet seams", () => {
    const result = createLedGroup({
      cabinetId: "generic-640",
      widthM: 5.12,
      heightM: 1.28,
      hangingEnabled: false,
      standingEnabled: true,
      floorClearanceM: 0.4,
      legCount: 4,
      legType: "3m"
    });
    const legs = result.objects.filter((object) => object.meta?.partRole === "standing-leg");

    expect(selectLedLegSeamIndexes(8, 4)).toEqual([1, 3, 5, 7]);
    expect(legs).toHaveLength(4);
    expect(legs.map((leg) => leg.transform.position.x)).toEqual([-1.92, -0.64, 0.64, 1.92]);
  });
});
