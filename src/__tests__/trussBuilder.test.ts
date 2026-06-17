import { describe, expect, it } from "vitest";
import { createTrussGroup } from "../builders/truss/createTrussGroup";

describe("Truss builder placeholder", () => {
  it("creates a catalog-linked MDM TQ29 portal TrussGroup", () => {
    const result = createTrussGroup({
      mode: "portal",
      widthM: 6,
      heightM: 4,
      depthM: 3,
      system: "mdm-tq29-c2"
    });

    expect(result.group.type).toBe("TrussGroup");
    expect(result.group.builderRef?.builderType).toBe("truss");
    expect(result.group.builderRef?.parameters).toMatchObject({
      mode: "portal",
      widthM: 6,
      heightM: 4,
      depthM: 3,
      system: "mdm-tq29-c2"
    });
    expect(result.objects).toHaveLength(10);
    expect(result.objects.every((object) => object.type === "truss")).toBe(true);
    expect(result.objects.every((object) => object.bomMode === "generated")).toBe(true);
    expect(result.objects.every((object) => object.catalogRef)).toBe(true);
    expect(result.objects.every((object) => object.connectionPorts && object.connectionPorts.length > 0)).toBe(true);
    expect(result.objects.some((object) => object.catalogRef === "MDM_TQ29X29V300CXV")).toBe(true);
    expect(result.objects.some((object) => object.catalogRef === "MDM_CD29U003FCXV90GRAD")).toBe(true);
    expect(
      result.objects.filter((object) => object.catalogRef === "MDM_PLOSCHADKA_OPORNAYA_B_29X29_OB380")
    ).toHaveLength(2);
    expect(result.group.objectIds).toEqual(result.objects.map((object) => object.id));
  });

  it("adds placeholder connection ports for future GLB snapping", () => {
    const result = createTrussGroup({
      mode: "portal",
      widthM: 6,
      heightM: 4,
      depthM: 3,
      system: "mdm-tq29-c2"
    });
    const straight = result.objects.find((object) => object.meta?.partRole === "straight");
    const corner = result.objects.find((object) => object.meta?.partRole === "corner");
    const base = result.objects.find((object) => object.meta?.partRole === "base");

    expect(straight?.connectionPorts?.map((port) => port.id)).toEqual(["end-a", "end-b"]);
    expect(straight?.connectionPorts?.every((port) => port.compatibleTags.includes("MDM_C2_29Q"))).toBe(true);
    expect(corner?.connectionPorts?.some((port) => port.role === "corner-face")).toBe(true);
    expect(base?.connectionPorts?.map((port) => port.role)).toEqual(["support", "floor"]);
  });

  it("creates frame and stool modes from standard catalog sections", () => {
    const frame = createTrussGroup({
      mode: "frame",
      widthM: 5,
      heightM: 3,
      depthM: 2,
      system: "mdm-tq29-c2"
    });
    const stool = createTrussGroup({
      mode: "stool",
      widthM: 5,
      heightM: 2,
      depthM: 3,
      system: "mdm-tq29-c2"
    });

    expect(frame.objects.length).toBeGreaterThan(4);
    expect(stool.objects.length).toBeGreaterThan(4);
    expect(
      stool.objects.filter((object) => object.name.includes(" leg ") && object.meta?.partRole === "straight")
    ).toHaveLength(4);
    expect(stool.objects.filter((object) => object.meta?.partRole === "base")).toHaveLength(4);
    expect(frame.group.meta?.taskScope).toContain("Catalog-linked MDM TQ29");
    expect(stool.group.builderRef?.parameters).toMatchObject({ mode: "stool" });
  });

  it("rounds requested spans to 0.5 m sections and records warnings", () => {
    const result = createTrussGroup({
      mode: "portal",
      widthM: 4.2,
      heightM: 3.2,
      depthM: 3,
      system: "mdm-tq29-c2"
    });

    expect(result.group.builderRef?.parameters).toMatchObject({
      requestedWidthM: 4.2,
      widthM: 4,
      requestedHeightM: 3.2,
      heightM: 3
    });
    expect(result.objects.some((object) => object.warnings.length > 0)).toBe(true);
  });
});
