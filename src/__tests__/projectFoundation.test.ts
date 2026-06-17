import { describe, expect, it } from "vitest";
import { createInitialProject } from "../app/createInitialProject";

describe("ProjectModel foundation contracts", () => {
  it("keeps Task 001 extension placeholders serializable and disabled by default", () => {
    const project = createInitialProject();
    const serialized = JSON.parse(JSON.stringify(project)) as typeof project;

    expect(serialized.foundation.venue.coordinateSystem).toBe("scene-origin-meters-y-up");
    expect(serialized.foundation.constraints).toMatchObject({
      status: "contracts-only",
      enabled: false
    });
    expect(serialized.foundation.collisionClearance.enabled).toBe(false);
    expect(serialized.foundation.measurements).toMatchObject({
      storedUnit: "m",
      accuracyPolicy: "stored-values-are-authoritative"
    });
    expect(serialized.foundation.power.circuits).toEqual([]);
    expect(serialized.foundation.rigging.points).toEqual([]);
    expect(serialized.foundation.domainRules.registeredDomains).toEqual(["stage", "truss", "led"]);
    expect(serialized.foundation.importExportSafety).toMatchObject({
      projectFileKind: "packit.project",
      externalImportEnabled: false
    });
    expect(serialized.foundation.assetLicenses.entries).toEqual([]);
  });
});
