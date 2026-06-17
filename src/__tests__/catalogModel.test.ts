import { describe, expect, it } from "vitest";
import { createInitialProject } from "../app/createInitialProject";
import { createSceneObjectFromCatalogItem } from "../catalog/createSceneObjectFromCatalogItem";
import { createLocalMdmCatalogModel } from "../catalog/localMdmCatalog";
import { PROJECT_SCHEMA_VERSION } from "../app/constants";

describe("local MDM CatalogModel", () => {
  it("creates a local offline catalog with MDM truss items and connection ports", () => {
    const catalog = createLocalMdmCatalogModel(PROJECT_SCHEMA_VERSION);
    const straight = catalog.items.find((item) => item.id === "MDM_TQ29X29V300CXV");
    const corner = catalog.items.find((item) => item.id === "MDM_CD29U003FCXV90GRAD");
    const base = catalog.items.find((item) => item.id === "MDM_PLOSCHADKA_OPORNAYA_B_29X29_OB380");

    expect(catalog.source.sourceSystem).toBe("local");
    expect(catalog.source.sourceStatus).toBe("needs-check");
    expect(straight?.assetRef).toContain("/assets/models/mdm/");
    expect(straight?.connectionPorts?.map((port) => port.id)).toEqual(["end-a", "end-b"]);
    expect(corner?.connectionPorts?.some((port) => port.role === "corner-face")).toBe(true);
    expect(base?.connectionPorts?.map((port) => port.role)).toEqual(["support", "floor"]);
  });

  it("stores the local MDM catalog snapshot in a new ProjectModel", () => {
    const project = createInitialProject();

    expect(project.catalog.catalogVersion).toBe("mdm-local-placeholder-0.1.0");
    expect(project.catalog.items.some((item) => item.id === "MDM_TQ29X29V300CXV")).toBe(true);
  });

  it("creates a catalog-linked SceneObject from a CatalogItem", () => {
    const catalog = createLocalMdmCatalogModel(PROJECT_SCHEMA_VERSION);
    const item = catalog.items.find((candidate) => candidate.id === "MDM_TQ29X29V300CXV")!;
    const object = createSceneObjectFromCatalogItem(item);

    expect(object.type).toBe("truss");
    expect(object.bomMode).toBe("catalogLinked");
    expect(object.catalogRef).toBe(item.id);
    expect(object.assetRef).toBe(item.assetRef);
    expect(object.connectionPorts?.map((port) => port.id)).toEqual(["end-a", "end-b"]);
    expect(object.capabilities.transformRules?.canMove).toBe(true);
  });
});
