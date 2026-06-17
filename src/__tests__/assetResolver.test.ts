import { describe, expect, it } from "vitest";
import { resolveAssetRef } from "../assets/assetResolver";

describe("asset resolver boundary", () => {
  it("accepts local GLB assets under /assets for future runtime loading", () => {
    const result = resolveAssetRef("/assets/models/mdm/corner_block/tq29/tq29x29v300cxv.glb");

    expect(result.status).toBe("local-runtime-candidate");
    expect(result.format).toBe("glb");
    expect(result.runtimePath).toBe("/assets/models/mdm/corner_block/tq29/tq29x29v300cxv.glb");
  });

  it("blocks external assets in offline-first mode", () => {
    const result = resolveAssetRef("https://example.com/model.glb");

    expect(result.status).toBe("external-blocked");
  });

  it("reports missing and unsupported asset references", () => {
    expect(resolveAssetRef().status).toBe("none");
    expect(resolveAssetRef("/assets/model.obj").status).toBe("unsupported");
    expect(resolveAssetRef("models/local.glb").status).toBe("unsupported");
  });
});
