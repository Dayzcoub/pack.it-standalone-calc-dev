import type { ConnectionPort, Vec3 } from "../../scene/contracts";

export type MdmPortAxis = "x" | "y" | "z";

const axisVector = (axis: MdmPortAxis, direction: 1 | -1): Vec3 => {
  if (axis === "x") {
    return { x: direction, y: 0, z: 0 };
  }
  if (axis === "y") {
    return { x: 0, y: direction, z: 0 };
  }
  return { x: 0, y: 0, z: direction };
};

const positionForAxis = (axis: MdmPortAxis, offset: number): Vec3 => {
  if (axis === "x") {
    return { x: offset, y: 0, z: 0 };
  }
  if (axis === "y") {
    return { x: 0, y: offset, z: 0 };
  }
  return { x: 0, y: 0, z: offset };
};

export const createMdmStraightTrussConnectionPorts = (axis: MdmPortAxis, lengthM: number): ConnectionPort[] => [
  {
    id: "end-a",
    label: "End A",
    role: "end",
    localPosition: positionForAxis(axis, -lengthM / 2),
    localNormal: axisVector(axis, -1),
    compatibleTags: ["MDM_C2_29Q", "TQ29", "truss-end"],
    status: "placeholder"
  },
  {
    id: "end-b",
    label: "End B",
    role: "end",
    localPosition: positionForAxis(axis, lengthM / 2),
    localNormal: axisVector(axis, 1),
    compatibleTags: ["MDM_C2_29Q", "TQ29", "truss-end"],
    status: "placeholder"
  }
];

export const createMdmCornerConnectionPorts = (): ConnectionPort[] =>
  [
    { id: "face-x-negative", label: "Face X-", position: { x: -0.25, y: 0, z: 0 }, normal: { x: -1, y: 0, z: 0 } },
    { id: "face-x-positive", label: "Face X+", position: { x: 0.25, y: 0, z: 0 }, normal: { x: 1, y: 0, z: 0 } },
    { id: "face-z-negative", label: "Face Z-", position: { x: 0, y: 0, z: -0.25 }, normal: { x: 0, y: 0, z: -1 } },
    { id: "face-z-positive", label: "Face Z+", position: { x: 0, y: 0, z: 0.25 }, normal: { x: 0, y: 0, z: 1 } },
    { id: "face-y-negative", label: "Face Y-", position: { x: 0, y: -0.145, z: 0 }, normal: { x: 0, y: -1, z: 0 } },
    { id: "face-y-positive", label: "Face Y+", position: { x: 0, y: 0.145, z: 0 }, normal: { x: 0, y: 1, z: 0 } }
  ].map((port) => ({
    id: port.id,
    label: port.label,
    role: "corner-face" as const,
    localPosition: port.position,
    localNormal: port.normal,
    compatibleTags: ["MDM_C2_29Q", "CD29", "corner-face"],
    status: "placeholder" as const
  }));

export const createMdmBaseConnectionPorts = (): ConnectionPort[] => [
  {
    id: "base-top",
    label: "Top support",
    role: "support",
    localPosition: { x: 0, y: 0.025, z: 0 },
    localNormal: { x: 0, y: 1, z: 0 },
    compatibleTags: ["MDM_C2_29Q", "MDM_ACCESSORY_29", "floor-support"],
    status: "placeholder"
  },
  {
    id: "base-floor",
    label: "Floor contact",
    role: "floor",
    localPosition: { x: 0, y: -0.025, z: 0 },
    localNormal: { x: 0, y: -1, z: 0 },
    compatibleTags: ["floor"],
    status: "placeholder"
  }
];
