export type MdmTrussCatalogItem = {
  id: string;
  title: string;
  kind: "straight_truss" | "corner_block" | "base_plate";
  series: "TQ29" | "CD29" | "B29";
  lengthM?: number;
  angleDeg?: number;
  compatibilityGroup: "MDM_C2_29Q" | "MDM_ACCESSORY_29";
  assetPath: string;
  bboxDimsMm: [number, number, number];
  source: "FEG_MDM_GLB_ready_for_constructor_v0_3";
};

export const MDM_TQ29_STRAIGHT_TRUSS: MdmTrussCatalogItem[] = [
  {
    id: "MDM_TQ29X29V050CXV",
    title: "TQ29x29V050CXV",
    kind: "straight_truss",
    series: "TQ29",
    lengthM: 0.5,
    compatibilityGroup: "MDM_C2_29Q",
    assetPath: "/assets/models/mdm/corner_block/tq29/tq29x29v050cxv.glb",
    bboxDimsMm: [500, 290, 290],
    source: "FEG_MDM_GLB_ready_for_constructor_v0_3"
  },
  {
    id: "MDM_TQ29X29V100CXV",
    title: "TQ29x29V100CXV",
    kind: "straight_truss",
    series: "TQ29",
    lengthM: 1,
    compatibilityGroup: "MDM_C2_29Q",
    assetPath: "/assets/models/mdm/corner_block/tq29/tq29x29v100cxv.glb",
    bboxDimsMm: [1000, 290, 290],
    source: "FEG_MDM_GLB_ready_for_constructor_v0_3"
  },
  {
    id: "MDM_TQ29X29V150CXV",
    title: "TQ29x29V150CXV",
    kind: "straight_truss",
    series: "TQ29",
    lengthM: 1.5,
    compatibilityGroup: "MDM_C2_29Q",
    assetPath: "/assets/models/mdm/corner_block/tq29/tq29x29v150cxv.glb",
    bboxDimsMm: [1500, 290, 290],
    source: "FEG_MDM_GLB_ready_for_constructor_v0_3"
  },
  {
    id: "MDM_TQ29X29V200CXV",
    title: "TQ29x29V200CXV",
    kind: "straight_truss",
    series: "TQ29",
    lengthM: 2,
    compatibilityGroup: "MDM_C2_29Q",
    assetPath: "/assets/models/mdm/corner_block/tq29/tq29x29v200cxv.glb",
    bboxDimsMm: [2000, 290, 290],
    source: "FEG_MDM_GLB_ready_for_constructor_v0_3"
  },
  {
    id: "MDM_TQ29X29V250CXV",
    title: "TQ29x29V250CXV",
    kind: "straight_truss",
    series: "TQ29",
    lengthM: 2.5,
    compatibilityGroup: "MDM_C2_29Q",
    assetPath: "/assets/models/mdm/corner_block/tq29/tq29x29v250cxv.glb",
    bboxDimsMm: [2499.9, 290, 290],
    source: "FEG_MDM_GLB_ready_for_constructor_v0_3"
  },
  {
    id: "MDM_TQ29X29V300CXV",
    title: "TQ29x29V300CXV",
    kind: "straight_truss",
    series: "TQ29",
    lengthM: 3,
    compatibilityGroup: "MDM_C2_29Q",
    assetPath: "/assets/models/mdm/corner_block/tq29/tq29x29v300cxv.glb",
    bboxDimsMm: [3000, 290, 290],
    source: "FEG_MDM_GLB_ready_for_constructor_v0_3"
  }
];

export const MDM_CD29_CORNER_90: MdmTrussCatalogItem = {
  id: "MDM_CD29U003FCXV90GRAD",
  title: "CD29U003FCXV90GRAD",
  kind: "corner_block",
  series: "CD29",
  angleDeg: 90,
  compatibilityGroup: "MDM_C2_29Q",
  assetPath: "/assets/models/mdm/corner_block/cd29/cd29u003fcxv90grad.glb",
  bboxDimsMm: [499.9985656738281, 49.99955749511719, 499.9985656738281],
  source: "FEG_MDM_GLB_ready_for_constructor_v0_3"
};

export const MDM_BASE_B_29X29_OB380: MdmTrussCatalogItem = {
  id: "MDM_PLOSCHADKA_OPORNAYA_B_29X29_OB380",
  title: "Ploschadka opornaya B-29x29-OB380",
  kind: "base_plate",
  series: "B29",
  compatibilityGroup: "MDM_ACCESSORY_29",
  assetPath: "/assets/models/mdm/base_or_screw_plate/opornye_i_vintovye_ploschadki/ploschadka_opornaya_b_29x29_ob380.glb",
  bboxDimsMm: [380, 395.59120178222656, 395.5912094116211],
  source: "FEG_MDM_GLB_ready_for_constructor_v0_3"
};

export const MDM_TQ29_ALLOWED_LENGTHS = MDM_TQ29_STRAIGHT_TRUSS.map((item) => item.lengthM!).sort(
  (left, right) => right - left
);

export const findTq29ByLength = (lengthM: number) =>
  MDM_TQ29_STRAIGHT_TRUSS.find((item) => item.lengthM === lengthM);
