import { describe, expect, it } from "vitest";
import { createInitialProject } from "../app/createInitialProject";
import {
  createProjectFileEnvelope,
  validateProjectFileEnvelope
} from "../project/projectFileEnvelope";

describe("project file envelope safety", () => {
  it("creates and validates a versioned project file envelope", () => {
    const project = createInitialProject("Exportable project");
    const envelope = createProjectFileEnvelope(project, "2026-01-01T00:00:00.000Z");
    const result = validateProjectFileEnvelope(JSON.stringify(envelope));

    expect(envelope.kind).toBe("packit.project");
    expect(envelope.exportedAt).toBe("2026-01-01T00:00:00.000Z");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.envelope.project.id).toBe(project.id);
    }
  });

  it("rejects invalid or unsupported project file envelopes without executing content", () => {
    expect(validateProjectFileEnvelope("{").ok).toBe(false);
    expect(validateProjectFileEnvelope(JSON.stringify({ kind: "other.project" }))).toMatchObject({
      ok: false,
      reason: "unsupported-kind"
    });
    expect(
      validateProjectFileEnvelope(
        JSON.stringify({
          kind: "packit.project",
          schemaVersion: "future.schema",
          project: {}
        })
      )
    ).toMatchObject({
      ok: false,
      reason: "unsupported-schema"
    });
    expect(
      validateProjectFileEnvelope(
        JSON.stringify({
          kind: "packit.project",
          schemaVersion: createInitialProject().schemaVersion
        })
      )
    ).toMatchObject({
      ok: false,
      reason: "missing-project"
    });
  });
});
