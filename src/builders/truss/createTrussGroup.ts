import {
  MDM_BASE_B_29X29_OB380,
  findTq29ByLength,
  MDM_CD29_CORNER_90,
  MDM_TQ29_ALLOWED_LENGTHS
} from "../../data/mdm/trussCatalog";
import {
  createMdmBaseConnectionPorts,
  createMdmCornerConnectionPorts,
  createMdmStraightTrussConnectionPorts
} from "../../data/mdm/trussConnectionPorts";
import { createId } from "../../app/id";
import type { ConnectionPort, Dimensions3D, SceneGroup, SceneObject, Transform3D, ValidationIssue } from "../../scene/contracts";

export type TrussBuilderMode = "portal" | "frame" | "stool";

export type TrussBuilderInput = {
  mode: TrussBuilderMode;
  widthM: number;
  heightM: number;
  depthM: number;
  system: "mdm-tq29-c2";
};

export type TrussBuilderOutput = {
  group: SceneGroup;
  objects: SceneObject[];
};

type Axis = "x" | "y" | "z";

type SegmentPlanItem = {
  lengthM: number;
  catalogId: string;
  title: string;
  assetPath: string;
};

export const defaultTrussBuilderInput = (): TrussBuilderInput => ({
  mode: "portal",
  widthM: 6,
  heightM: 4,
  depthM: 3,
  system: "mdm-tq29-c2"
});

const roundToHalfMeter = (value: number) => Math.max(0.5, Math.round(value * 2) / 2);

export const splitTq29Span = (spanM: number): SegmentPlanItem[] => {
  let remaining = roundToHalfMeter(spanM);
  const result: SegmentPlanItem[] = [];

  while (remaining > 0.001) {
    const nextLength =
      MDM_TQ29_ALLOWED_LENGTHS.find((length) => length <= remaining + 0.001) ??
      MDM_TQ29_ALLOWED_LENGTHS[MDM_TQ29_ALLOWED_LENGTHS.length - 1];
    const catalogItem = findTq29ByLength(nextLength);

    if (!catalogItem) {
      throw new Error(`Missing MDM TQ29 catalog item for ${nextLength} m`);
    }

    result.push({
      lengthM: nextLength,
      catalogId: catalogItem.id,
      title: catalogItem.title,
      assetPath: catalogItem.assetPath
    });
    remaining = Number((remaining - nextLength).toFixed(3));
  }

  return result;
};

const createWarnings = (requested: number, built: number, source: string): ValidationIssue[] =>
  Math.abs(requested - built) > 0.001
    ? [
        {
          id: createId("warning"),
          severity: "warning",
          source,
          message: `Requested ${requested} m was rounded to ${built} m to match available 0.5 m TQ29 sections.`
        }
      ]
    : [];

const dimensionsForAxis = (axis: Axis, lengthM: number): Dimensions3D => {
  const profile = 0.29;
  if (axis === "x") {
    return { width: lengthM, height: profile, depth: profile };
  }
  if (axis === "y") {
    return { width: profile, height: lengthM, depth: profile };
  }
  return { width: profile, height: profile, depth: lengthM };
};

const positionForAxis = (axis: Axis, center: { x: number; y: number; z: number }, offset: number) => {
  if (axis === "x") {
    return { x: center.x + offset, y: center.y, z: center.z };
  }
  if (axis === "y") {
    return { x: center.x, y: center.y + offset, z: center.z };
  }
  return { x: center.x, y: center.y, z: center.z + offset };
};

const createTrussObject = (
  groupId: string,
  name: string,
  transform: Transform3D,
  dimensions: Dimensions3D,
  options: {
    catalogRef: string;
    assetRef: string;
    lengthM?: number;
    partRole: "straight" | "corner" | "base";
    connectionPorts: ConnectionPort[];
    warnings?: ValidationIssue[];
  }
): SceneObject => ({
  id: createId(options.partRole === "corner" ? "truss-corner" : options.partRole === "base" ? "truss-base" : "truss-segment"),
  type: "truss",
  name,
  transform,
  dimensions,
  assetRef: options.assetRef,
  catalogRef: options.catalogRef,
  connectionPorts: options.connectionPorts,
  bomMode: "generated",
  capabilities: {
    canStandOnFloor: true,
    canBeSuspended: true,
    hasAttachmentPoints: options.connectionPorts.length > 0,
    contributesToBom: false,
    contributesToPdf: false,
    has3dAsset: true,
    transformRules: {
      canMove: true,
      canRotate: true,
      canScale: false,
      lockY: true
    }
  },
  meta: {
    groupId,
    builder: "truss",
    builderVersion: "truss-mdm-tq29-c2-0.1.0",
    manufacturer: "MDM",
    system: "TQ29 C2",
    compatibilityGroup: options.partRole === "base" ? "MDM_ACCESSORY_29" : "MDM_C2_29Q",
    partRole: options.partRole,
    lengthM: options.lengthM,
    dataStatus: "geometry_from_glb__engineering_data_needs_passport",
    snapStatus: "connection_ports_placeholder",
    unitsAssumption: "mm_from_glb_bbox_scale_0.001"
  },
  warnings: options.warnings ?? []
});

const addStraightSpan = (
  objects: SceneObject[],
  groupId: string,
  axis: Axis,
  name: string,
  spanM: number,
  center: { x: number; y: number; z: number },
  requestedM: number
) => {
  const plan = splitTq29Span(spanM);
  const builtM = plan.reduce((sum, item) => sum + item.lengthM, 0);
  let cursor = -builtM / 2;
  const warnings = createWarnings(requestedM, builtM, name);

  plan.forEach((item, index) => {
    const segmentCenter = cursor + item.lengthM / 2;
    cursor += item.lengthM;
    objects.push(
      createTrussObject(
        groupId,
        `${name} ${item.title}`,
        {
          position: positionForAxis(axis, center, segmentCenter),
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 }
        },
        dimensionsForAxis(axis, item.lengthM),
        {
          catalogRef: item.catalogId,
          assetRef: item.assetPath,
          lengthM: item.lengthM,
          partRole: "straight",
          connectionPorts: createMdmStraightTrussConnectionPorts(axis, item.lengthM),
          warnings: index === 0 ? warnings : []
        }
      )
    );
  });
};

const addCorner = (
  objects: SceneObject[],
  groupId: string,
  name: string,
  position: { x: number; y: number; z: number }
) => {
  objects.push(
    createTrussObject(
      groupId,
      name,
      {
        position,
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
      },
      { width: 0.5, height: 0.29, depth: 0.5 },
      {
        catalogRef: MDM_CD29_CORNER_90.id,
        assetRef: MDM_CD29_CORNER_90.assetPath,
        partRole: "corner",
        connectionPorts: createMdmCornerConnectionPorts()
      }
    )
  );
};

const addBase = (
  objects: SceneObject[],
  groupId: string,
  name: string,
  position: { x: number; y: number; z: number }
) => {
  objects.push(
    createTrussObject(
      groupId,
      name,
      {
        position,
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
      },
      { width: 0.42, height: 0.05, depth: 0.42 },
      {
        catalogRef: MDM_BASE_B_29X29_OB380.id,
        assetRef: MDM_BASE_B_29X29_OB380.assetPath,
        partRole: "base",
        connectionPorts: createMdmBaseConnectionPorts()
      }
    )
  );
};

export const createTrussGroup = (input: TrussBuilderInput): TrussBuilderOutput => {
  const safeWidth = roundToHalfMeter(input.widthM);
  const safeHeight = roundToHalfMeter(input.heightM);
  const safeDepth = roundToHalfMeter(input.depthM);
  const groupId = createId("truss-group");
  const objects: SceneObject[] = [];

  if (input.mode === "portal" || input.mode === "frame") {
    addStraightSpan(objects, groupId, "x", "Top span", safeWidth, { x: 0, y: safeHeight, z: 0 }, input.widthM);
    addStraightSpan(
      objects,
      groupId,
      "y",
      "Left leg",
      safeHeight,
      { x: -safeWidth / 2, y: safeHeight / 2, z: 0 },
      input.heightM
    );
    addStraightSpan(
      objects,
      groupId,
      "y",
      "Right leg",
      safeHeight,
      { x: safeWidth / 2, y: safeHeight / 2, z: 0 },
      input.heightM
    );
    addCorner(objects, groupId, "Left top 90 corner", { x: -safeWidth / 2, y: safeHeight, z: 0 });
    addCorner(objects, groupId, "Right top 90 corner", { x: safeWidth / 2, y: safeHeight, z: 0 });
    addBase(objects, groupId, "Left base B-29x29-OB380", { x: -safeWidth / 2, y: 0.025, z: 0 });
    addBase(objects, groupId, "Right base B-29x29-OB380", { x: safeWidth / 2, y: 0.025, z: 0 });
  }

  if (input.mode === "frame") {
    addStraightSpan(objects, groupId, "x", "Bottom span", safeWidth, { x: 0, y: 0, z: 0 }, input.widthM);
    addCorner(objects, groupId, "Left bottom 90 corner", { x: -safeWidth / 2, y: 0, z: 0 });
    addCorner(objects, groupId, "Right bottom 90 corner", { x: safeWidth / 2, y: 0, z: 0 });
  }

  if (input.mode === "stool") {
    addStraightSpan(
      objects,
      groupId,
      "x",
      "Back span",
      safeWidth,
      { x: 0, y: safeHeight, z: -safeDepth / 2 },
      input.widthM
    );
    addStraightSpan(
      objects,
      groupId,
      "x",
      "Front span",
      safeWidth,
      { x: 0, y: safeHeight, z: safeDepth / 2 },
      input.widthM
    );
    addStraightSpan(
      objects,
      groupId,
      "z",
      "Left depth span",
      safeDepth,
      { x: -safeWidth / 2, y: safeHeight, z: 0 },
      input.depthM
    );
    addStraightSpan(
      objects,
      groupId,
      "z",
      "Right depth span",
      safeDepth,
      { x: safeWidth / 2, y: safeHeight, z: 0 },
      input.depthM
    );
    [
      { x: -safeWidth / 2, z: -safeDepth / 2, name: "Back left leg" },
      { x: safeWidth / 2, z: -safeDepth / 2, name: "Back right leg" },
      { x: -safeWidth / 2, z: safeDepth / 2, name: "Front left leg" },
      { x: safeWidth / 2, z: safeDepth / 2, name: "Front right leg" }
    ].forEach((leg) => {
      addStraightSpan(
        objects,
        groupId,
        "y",
        leg.name,
        safeHeight,
        { x: leg.x, y: safeHeight / 2, z: leg.z },
        input.heightM
      );
      addBase(objects, groupId, `${leg.name} base B-29x29-OB380`, { x: leg.x, y: 0.025, z: leg.z });
    });
    [
      { x: -safeWidth / 2, y: safeHeight, z: -safeDepth / 2 },
      { x: safeWidth / 2, y: safeHeight, z: -safeDepth / 2 },
      { x: -safeWidth / 2, y: safeHeight, z: safeDepth / 2 },
      { x: safeWidth / 2, y: safeHeight, z: safeDepth / 2 }
    ].forEach((position, index) => addCorner(objects, groupId, `Stool 90 corner ${index + 1}`, position));
  }

  return {
    group: {
      id: groupId,
      type: "TrussGroup",
      name: `MDM TQ29 ${input.mode} ${safeWidth} m`,
      objectIds: objects.map((object) => object.id),
      visible: true,
      locked: false,
      builderRef: {
        builderType: "truss",
        builderVersion: "truss-mdm-tq29-c2-0.1.0",
        parameters: {
          mode: input.mode,
          requestedWidthM: input.widthM,
          requestedHeightM: input.heightM,
          requestedDepthM: input.depthM,
          widthM: safeWidth,
          heightM: safeHeight,
          depthM: safeDepth,
          system: input.system,
          sourcePackage: "FEG_MDM_GLB_ready_for_constructor_v0_3"
        }
      },
      meta: {
        taskScope: "Catalog-linked MDM TQ29 visual assembly. Snap points, load data and certified assembly rules are not enabled.",
        compatibilityGroup: "MDM_C2_29Q"
      }
    },
    objects
  };
};
