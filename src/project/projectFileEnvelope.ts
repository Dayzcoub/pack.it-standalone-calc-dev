import { PRODUCT_VERSION, PROJECT_SCHEMA_VERSION } from "../app/constants";
import type { ProjectFileEnvelope, ProjectModel, RecoveryDraftEnvelope } from "./contracts";

export type ProjectFileValidationResult =
  | {
      ok: true;
      envelope: ProjectFileEnvelope;
    }
  | {
      ok: false;
      reason: "invalid-json" | "unsupported-kind" | "unsupported-schema" | "missing-project";
      message: string;
    };

export const createProjectFileEnvelope = (project: ProjectModel, exportedAt = new Date().toISOString()): ProjectFileEnvelope => ({
  kind: "packit.project",
  schemaVersion: PROJECT_SCHEMA_VERSION,
  productVersion: PRODUCT_VERSION,
  exportedAt,
  project
});

export const createRecoveryDraftEnvelope = (
  project: ProjectModel,
  reason: RecoveryDraftEnvelope["reason"],
  savedAt = new Date().toISOString()
): RecoveryDraftEnvelope => ({
  kind: "packit.recovery-draft",
  schemaVersion: PROJECT_SCHEMA_VERSION,
  productVersion: PRODUCT_VERSION,
  savedAt,
  reason,
  project
});

export const validateProjectFileEnvelope = (raw: string): ProjectFileValidationResult => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return {
      ok: false,
      reason: "invalid-json",
      message: "Project file is not valid JSON."
    };
  }

  const envelope = parsed as Partial<ProjectFileEnvelope>;

  if (envelope.kind !== "packit.project") {
    return {
      ok: false,
      reason: "unsupported-kind",
      message: "Unsupported project file kind."
    };
  }

  if (envelope.schemaVersion !== PROJECT_SCHEMA_VERSION) {
    return {
      ok: false,
      reason: "unsupported-schema",
      message: `Unsupported schema version ${String(envelope.schemaVersion)}.`
    };
  }

  if (!envelope.project || typeof envelope.project !== "object") {
    return {
      ok: false,
      reason: "missing-project",
      message: "Project file is missing ProjectModel data."
    };
  }

  return {
    ok: true,
    envelope: envelope as ProjectFileEnvelope
  };
};

export const assertProjectFileEnvelope = (raw: string): ProjectFileEnvelope => {
  const result = validateProjectFileEnvelope(raw);

  if (!result.ok) {
    throw new Error(result.message);
  }

  return result.envelope;
};
