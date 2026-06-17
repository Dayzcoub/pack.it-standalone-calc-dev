import type { SceneModel, SceneObject } from "../scene/contracts";
import type { BomContribution, BomContributionConfidence, BomContributionSource, BomSummary } from "./contracts";

const ENGINE_VERSION = "bom-scene-placeholder-0.1.0" as const;

type GeneratedBomRow = {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
  sku?: string;
  notes?: unknown[];
};

type GeneratedBomGroup = {
  rows: GeneratedBomRow[];
};

const sourceForObject = (object: SceneObject): BomContributionSource | undefined => {
  if (object.bomMode === "none") {
    return undefined;
  }

  if (object.bomMode === "catalogLinked") {
    return "catalog";
  }

  if (object.bomMode === "generated") {
    return "generated-placeholder";
  }

  return "visual-only";
};

const confidenceForSource = (source: BomContributionSource): BomContributionConfidence =>
  source === "catalog" ? "catalog-linked" : "placeholder";

const notesForSource = (source: BomContributionSource): string[] => {
  if (source === "catalog") {
    return ["Catalog-linked scene object; final pricing and warehouse checks are pending."];
  }

  if (source === "generated-placeholder") {
    return ["Generated builder placeholder; final calculation rules are pending."];
  }

  if (source === "group-generated") {
    return ["Generated from a saved builder calculation result."];
  }

  return ["Visual scene placeholder; not linked to a verified catalog item."];
};

const contributionKey = (object: SceneObject, source: BomContributionSource) => {
  if (object.catalogRef) {
    return [source, object.catalogRef].join(":");
  }

  return [source, object.type, object.name].join(":");
};

export const createBomSummary = (scene: SceneModel, generatedAt = new Date().toISOString()): BomSummary => {
  const contributions = new Map<string, BomContribution>();

  scene.objects.forEach((object) => {
    const source = sourceForObject(object);

    if (!source) {
      return;
    }

    const key = contributionKey(object, source);
    const existing = contributions.get(key);

    if (existing) {
      existing.objectIds.push(object.id);
      existing.quantity += 1;
      return;
    }

    contributions.set(key, {
      id: `bom-${key}`,
      objectIds: [object.id],
      catalogRef: object.catalogRef,
      name: object.name,
      objectType: object.type,
      quantity: 1,
      unit: "pcs",
      source,
      confidence: confidenceForSource(source),
      notes: notesForSource(source)
    });
  });

  scene.groups.forEach((group) => {
    const generatedBomGroups = group.meta?.generatedBomGroups;

    if (!Array.isArray(generatedBomGroups)) {
      return;
    }

    generatedBomGroups.forEach((bomGroup: unknown) => {
      if (!bomGroup || typeof bomGroup !== "object" || !("rows" in bomGroup) || !Array.isArray(bomGroup.rows)) {
        return;
      }

      const generatedBomGroup = bomGroup as GeneratedBomGroup;

      generatedBomGroup.rows.forEach((row: GeneratedBomRow) => {
        if (!row || typeof row !== "object" || typeof row.id !== "string" || typeof row.name !== "string") {
          return;
        }

        if (typeof row.quantity !== "number" || row.quantity <= 0) {
          return;
        }

        const unit = typeof row.unit === "string" ? row.unit : "pcs";
        const key = ["group-generated", group.id, row.sku ?? "", row.id].join(":");

        contributions.set(key, {
          id: `bom-${key}`,
          objectIds: group.objectIds,
          catalogRef: typeof row.sku === "string" ? row.sku : undefined,
          name: row.name,
          objectType: group.type === "StageGroup" ? "stage" : group.type === "TrussGroup" ? "truss" : "generic3d",
          quantity: row.quantity,
          unit: unit === "m" || unit === "m2" || unit === "kg" || unit === "set" ? unit : "pcs",
          source: "group-generated",
          confidence: "placeholder",
          notes: Array.isArray(row.notes)
            ? row.notes.filter((note): note is string => typeof note === "string")
            : notesForSource("group-generated")
        });
      });
    });
  });

  const rows = Array.from(contributions.values()).sort((left, right) => {
    const sourceDelta = left.source.localeCompare(right.source);
    return sourceDelta || left.name.localeCompare(right.name);
  });

  return {
    engineVersion: ENGINE_VERSION,
    generatedAt,
    contributions: rows,
    totalQuantity: rows.reduce((total, contribution) => total + contribution.quantity, 0)
  };
};
