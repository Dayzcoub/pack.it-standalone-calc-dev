import type { CapabilityMetadata, ConnectionPort, Dimensions3D, SceneObjectType } from "../scene/contracts";

export type CatalogSourceStatus = "verified" | "estimated" | "needs-check" | "user-defined";

export type CatalogSourceMetadata = {
  sourceSystem: "local" | "crm-warehouse" | "user";
  sourceId?: string;
  sourceStatus: CatalogSourceStatus;
  syncedAt?: string;
  conflictStatus?: "none" | "stale" | "missing" | "conflict";
};

export type CatalogItem = {
  id: string;
  type: SceneObjectType;
  manufacturer?: string;
  model?: string;
  displayName: string;
  dimensions?: Dimensions3D;
  weightKg?: number;
  powerW?: number;
  rentalPrice?: number;
  assetRef?: string;
  connectionPorts?: ConnectionPort[];
  compatibilityTags: string[];
  capabilities: CapabilityMetadata;
  source: CatalogSourceMetadata;
};

export type CatalogModel = {
  schemaVersion: string;
  catalogVersion: string;
  items: CatalogItem[];
  source: CatalogSourceMetadata;
};

export const createEmptyCatalogModel = (schemaVersion: string): CatalogModel => ({
  schemaVersion,
  catalogVersion: "local-placeholder-0.1.0",
  items: [],
  source: {
    sourceSystem: "local",
    sourceStatus: "needs-check",
    conflictStatus: "none"
  }
});
