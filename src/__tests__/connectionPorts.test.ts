import { describe, expect, it } from "vitest";
import { createTrussGroup } from "../builders/truss/createTrussGroup";
import {
  createConnectionAlignmentDelta,
  findNearestCompatibleConnectionPort,
  resolveConnectionPortWorld
} from "../scene/connectionPorts";

describe("connection port world math", () => {
  it("resolves local truss ports into world coordinates", () => {
    const result = createTrussGroup({
      mode: "portal",
      widthM: 6,
      heightM: 4,
      depthM: 3,
      system: "mdm-tq29-c2"
    });
    const topSegment = result.objects.find((object) => object.name.includes("Top span TQ29x29V300CXV"));

    expect(topSegment).toBeDefined();
    const endA = resolveConnectionPortWorld(topSegment!, "end-a");
    const endB = resolveConnectionPortWorld(topSegment!, "end-b");

    expect(endA?.worldPosition.y).toBe(4);
    expect(endB?.worldPosition.y).toBe(4);
    expect(endB!.worldPosition.x - endA!.worldPosition.x).toBeCloseTo(3);
    expect(endA?.worldNormal).toMatchObject({ x: -1, y: 0, z: 0 });
    expect(endB?.worldNormal).toMatchObject({ x: 1, y: 0, z: 0 });
  });

  it("computes the translation needed to align two compatible ports", () => {
    const result = createTrussGroup({
      mode: "portal",
      widthM: 6,
      heightM: 4,
      depthM: 3,
      system: "mdm-tq29-c2"
    });
    const leftTopSegment = result.objects.find((object) => object.name.includes("Top span TQ29x29V300CXV"))!;
    const leftCorner = result.objects.find((object) => object.name === "Left top 90 corner")!;

    const delta = createConnectionAlignmentDelta(leftTopSegment, "end-a", leftCorner, "face-x-positive");

    expect(delta).toBeDefined();
    expect(delta?.compatible).toBe(true);
    expect(delta?.positionDelta.y).toBeCloseTo(0);
    expect(delta?.positionDelta.z).toBeCloseTo(0);
    expect(delta?.normalDot).toBeCloseTo(-1);
  });

  it("finds the nearest compatible opposite-facing port", () => {
    const result = createTrussGroup({
      mode: "portal",
      widthM: 6,
      heightM: 4,
      depthM: 3,
      system: "mdm-tq29-c2"
    });
    const topSegments = result.objects.filter((object) => object.name.includes("Top span"));
    const movingSegment = {
      ...topSegments[0],
      transform: {
        ...topSegments[0].transform,
        position: {
          x: topSegments[0].transform.position.x - 0.2,
          y: topSegments[0].transform.position.y,
          z: topSegments[0].transform.position.z
        }
      }
    };
    const targetSegment = topSegments[1];

    const candidate = findNearestCompatibleConnectionPort(movingSegment, [movingSegment, targetSegment], {
      maxDistanceM: 1
    });

    expect(candidate?.movingPort.id).toBe("end-b");
    expect(candidate?.targetPort.id).toBe("end-a");
    expect(candidate?.targetObject.id).toBe(targetSegment.id);
    expect(candidate?.normalDot).toBeCloseTo(-1);
  });
});
