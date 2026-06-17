import type { SceneObjectType } from "../scene/contracts";

export type BomContributionSource = "catalog" | "generated-placeholder" | "group-generated" | "visual-only";

export type BomContributionConfidence = "catalog-linked" | "placeholder";

export type BomContribution = {
  id: string;
  objectIds: string[];
  catalogRef?: string;
  name: string;
  objectType: SceneObjectType;
  quantity: number;
  unit: "pcs" | "m" | "m2" | "kg" | "set";
  source: BomContributionSource;
  confidence: BomContributionConfidence;
  notes: string[];
};

export type BomSummary = {
  engineVersion: "bom-scene-placeholder-0.1.0";
  generatedAt: string;
  contributions: BomContribution[];
  totalQuantity: number;
};
