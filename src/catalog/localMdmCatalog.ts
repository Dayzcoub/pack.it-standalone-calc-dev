import type { CatalogItem, CatalogModel } from "./contracts";
import {
  MDM_BASE_B_29X29_OB380,
  MDM_CD29_CORNER_90,
  MDM_TQ29_STRAIGHT_TRUSS,
  type MdmTrussCatalogItem
} from "../data/mdm/trussCatalog";
import {
  createMdmBaseConnectionPorts,
  createMdmCornerConnectionPorts,
  createMdmStraightTrussConnectionPorts
} from "../data/mdm/trussConnectionPorts";
import type { ConnectionPort } from "../scene/contracts";

const MDM_LOCAL_CATALOG_VERSION = "mdm-local-placeholder-0.1.0";

const dimensionsFromBboxMm = (item: MdmTrussCatalogItem) => ({
  width: item.bboxDimsMm[0] / 1000,
  height: item.bboxDimsMm[1] / 1000,
  depth: item.bboxDimsMm[2] / 1000
});

const portsForItem = (item: MdmTrussCatalogItem): ConnectionPort[] => {
  if (item.kind === "straight_truss") {
    return createMdmStraightTrussConnectionPorts("x", item.lengthM ?? dimensionsFromBboxMm(item).width);
  }
  if (item.kind === "corner_block") {
    return createMdmCornerConnectionPorts();
  }
  return createMdmBaseConnectionPorts();
};

const itemToCatalogItem = (item: MdmTrussCatalogItem): CatalogItem => ({
  id: item.id,
  type: "truss",
  manufacturer: "MDM",
  model: item.title,
  displayName: item.title,
  dimensions: dimensionsFromBboxMm(item),
  assetRef: item.assetPath,
  connectionPorts: portsForItem(item),
  compatibilityTags: [item.series, item.kind, item.compatibilityGroup],
  capabilities: {
    has3dAsset: true,
    hasAttachmentPoints: true,
    canStandOnFloor: item.kind === "base_plate",
    canBeSuspended: item.kind !== "base_plate",
    contributesToBom: false,
    contributesToPdf: false
  },
  source: {
    sourceSystem: "local",
    sourceId: item.source,
    sourceStatus: "needs-check",
    conflictStatus: "none"
  }
});

export const createLocalMdmCatalogModel = (schemaVersion: string): CatalogModel => ({
  schemaVersion,
  catalogVersion: MDM_LOCAL_CATALOG_VERSION,
  items: [...MDM_TQ29_STRAIGHT_TRUSS, MDM_CD29_CORNER_90, MDM_BASE_B_29X29_OB380].map(itemToCatalogItem),
  source: {
    sourceSystem: "local",
    sourceId: "FEG_MDM_GLB_ready_for_constructor_v0_3",
    sourceStatus: "needs-check",
    conflictStatus: "none"
  }
});
