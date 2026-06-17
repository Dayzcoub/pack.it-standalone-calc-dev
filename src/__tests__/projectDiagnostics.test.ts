import { describe, expect, it } from "vitest";
import { createInitialProject } from "../app/createInitialProject";
import { createSceneObjectFromCatalogItem } from "../catalog/createSceneObjectFromCatalogItem";
import { collectProjectDiagnostics } from "../project/projectDiagnostics";

describe("project diagnostics", () => {
  it("summarizes catalog, asset and placeholder snap diagnostics", () => {
    const project = createInitialProject();
    const catalogItem = project.catalog.items.find((item) => item.id === "MDM_TQ29X29V300CXV")!;
    const object = createSceneObjectFromCatalogItem(catalogItem);
    const withObject = {
      ...project,
      scene: {
        ...project.scene,
        objects: [...project.scene.objects, object]
      }
    };

    const diagnostics = collectProjectDiagnostics(withObject);

    expect(diagnostics.warningCount).toBeGreaterThan(0);
    expect(diagnostics.infoCount).toBeGreaterThan(0);
    expect(diagnostics.issues.some((issue) => issue.message.includes("Runtime GLB loading is disabled"))).toBe(true);
    expect(diagnostics.issues.some((issue) => issue.message.includes("placeholder connection ports"))).toBe(true);
  });
});
