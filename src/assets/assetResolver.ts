export type AssetResolutionStatus = "none" | "local-runtime-candidate" | "external-blocked" | "unsupported";

export type AssetResolution = {
  status: AssetResolutionStatus;
  assetRef?: string;
  runtimePath?: string;
  format?: "glb" | "gltf";
  reason: string;
};

const supportedFormats = new Set(["glb", "gltf"]);

export const resolveAssetRef = (assetRef?: string): AssetResolution => {
  if (!assetRef) {
    return {
      status: "none",
      reason: "No assetRef is assigned."
    };
  }

  if (/^https?:\/\//i.test(assetRef)) {
    return {
      status: "external-blocked",
      assetRef,
      reason: "External assets are blocked in offline-first mode."
    };
  }

  const extension = assetRef.split("?")[0].split(".").pop()?.toLowerCase();
  if (!extension || !supportedFormats.has(extension)) {
    return {
      status: "unsupported",
      assetRef,
      reason: "Only GLB/GLTF asset references are supported by the future runtime loader."
    };
  }

  if (!assetRef.startsWith("/assets/")) {
    return {
      status: "unsupported",
      assetRef,
      format: extension as "glb" | "gltf",
      reason: "Runtime assets must live under /assets/ for offline packaging."
    };
  }

  return {
    status: "local-runtime-candidate",
    assetRef,
    runtimePath: assetRef,
    format: extension as "glb" | "gltf",
    reason: "Local assetRef is ready for a future GLTFLoader boundary."
  };
};
