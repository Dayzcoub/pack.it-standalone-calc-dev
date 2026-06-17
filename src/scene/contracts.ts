export type Vec3 = {
  x: number;
  y: number;
  z: number;
};

export type Transform3D = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
};

export type Dimensions3D = {
  width: number;
  height: number;
  depth: number;
};

export type SceneObjectType =
  | "stage"
  | "truss"
  | "led"
  | "audio"
  | "light"
  | "power"
  | "rigging"
  | "decor"
  | "generic3d";

export type BomMode = "none" | "visualOnly" | "catalogLinked" | "generated";

export type CapabilityKey =
  | "hasWeight"
  | "hasPower"
  | "canStandOnFloor"
  | "canBeSuspended"
  | "hasAttachmentPoints"
  | "contributesToBom"
  | "contributesToPrice"
  | "contributesToPdf"
  | "has3dAsset";

export type CapabilityMetadata = Partial<Record<CapabilityKey, boolean>> & {
  transformRules?: TransformRules;
};

export type TransformRules = {
  canMove: boolean;
  canRotate: boolean;
  canScale: boolean;
  lockY?: boolean;
};

export type SceneObject = {
  id: string;
  type: SceneObjectType;
  name: string;
  transform: Transform3D;
  dimensions?: Dimensions3D;
  assetRef?: string;
  catalogRef?: string;
  connectionPorts?: ConnectionPort[];
  bomMode: BomMode;
  children?: string[];
  capabilities: CapabilityMetadata;
  meta?: Record<string, unknown>;
  warnings: ValidationIssue[];
};

export type SceneGroupType = "StageGroup" | "TrussGroup" | "LedGroup" | "ImportedModelGroup";

export type SceneGroup = {
  id: string;
  type: SceneGroupType;
  name: string;
  objectIds: string[];
  parentGroupId?: string;
  builderRef?: BuilderReference;
  visible: boolean;
  locked: boolean;
  meta?: Record<string, unknown>;
};

export type BuilderReference = {
  builderType: "stage" | "truss" | "led" | "asset-library";
  builderVersion: string;
  parameters: Record<string, unknown>;
};

export type SceneLayer = {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  objectIds: string[];
};

export type SelectionMode = "none" | "object" | "group" | "multi";

export type SelectionState = {
  selectedObjectIds: string[];
  selectedGroupId?: string;
  activeInspectorTargetId?: string;
  mode: SelectionMode;
};

export type CameraMode = "perspective" | "isometric" | "top" | "front" | "side";

export type CameraState = {
  mode: CameraMode;
  target: Vec3;
  position: Vec3;
  zoom: number;
};

export type CameraPreset = {
  id: CameraMode;
  name: string;
  projection: "perspective";
  state: CameraState;
};

export type SceneEnvironment = {
  gridVisible: boolean;
  connectionPortsVisible: boolean;
  background: "dark" | "light";
};

export type SceneModel = {
  id: string;
  units: "m";
  origin: Vec3;
  objects: SceneObject[];
  groups: SceneGroup[];
  layers: SceneLayer[];
  selection: SelectionState;
  camera: CameraState;
  environment: SceneEnvironment;
};

export type ValidationIssue = {
  id: string;
  severity: "info" | "warning" | "error";
  source: string;
  message: string;
};

export type AttachmentPoint = {
  id: string;
  objectId: string;
  position: Vec3;
  normal: Vec3;
  compatibleTags: string[];
};

export type ConnectionPortRole = "end" | "corner-face" | "support" | "floor";

export type ConnectionPortStatus = "placeholder" | "from-manifest" | "verified";

export type ConnectionPort = {
  id: string;
  label: string;
  role: ConnectionPortRole;
  localPosition: Vec3;
  localNormal: Vec3;
  compatibleTags: string[];
  status: ConnectionPortStatus;
};

export type ConstraintDefinition = {
  id: string;
  name: string;
  enabled: boolean;
};

export type SnapSettings = {
  enabled: boolean;
  gridSize: number;
};

export type MeasurementSettings = {
  storedUnit: "m";
  displayUnit: "m" | "cm" | "mm";
  precision: number;
};
