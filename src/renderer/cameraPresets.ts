import type { CameraMode, CameraPreset, CameraState, SceneModel, SceneObject, Vec3 } from "../scene/contracts";

const target = { x: 0, y: 0, z: 0 };

export const BUILT_IN_CAMERA_PRESETS: Record<CameraMode, CameraPreset> = {
  perspective: {
    id: "perspective",
    name: "Perspective",
    projection: "perspective",
    state: {
      mode: "perspective",
      target,
      position: { x: 4, y: 4, z: 5 },
      zoom: 1
    }
  },
  isometric: {
    id: "isometric",
    name: "Iso",
    projection: "perspective",
    state: {
      mode: "isometric",
      target,
      position: { x: 6, y: 6, z: 6 },
      zoom: 1
    }
  },
  top: {
    id: "top",
    name: "Top",
    projection: "perspective",
    state: {
      mode: "top",
      target,
      position: { x: 0, y: 10, z: 0.01 },
      zoom: 1.1
    }
  },
  front: {
    id: "front",
    name: "Front",
    projection: "perspective",
    state: {
      mode: "front",
      target,
      position: { x: 0, y: 3, z: 10 },
      zoom: 1.05
    }
  },
  side: {
    id: "side",
    name: "Side",
    projection: "perspective",
    state: {
      mode: "side",
      target,
      position: { x: 10, y: 3, z: 0 },
      zoom: 1.05
    }
  }
};

type SceneBounds = {
  center: Vec3;
  size: Vec3;
  radius: number;
};

const defaultBounds: SceneBounds = {
  center: target,
  size: { x: 4, y: 3, z: 4 },
  radius: 3
};

const objectBounds = (object: SceneObject) => {
  const dimensions = object.dimensions ?? { width: 1, height: 1, depth: 1 };
  const scale = object.transform.scale;
  const halfWidth = Math.abs(dimensions.width * scale.x) / 2;
  const halfHeight = Math.abs(dimensions.height * scale.y) / 2;
  const halfDepth = Math.abs(dimensions.depth * scale.z) / 2;
  const position = object.transform.position;

  return {
    minX: position.x - halfWidth,
    maxX: position.x + halfWidth,
    minY: position.y - halfHeight,
    maxY: position.y + halfHeight,
    minZ: position.z - halfDepth,
    maxZ: position.z + halfDepth
  };
};

export const calculateVisibleSceneBounds = (scene?: SceneModel): SceneBounds => {
  if (!scene || scene.objects.length === 0) {
    return defaultBounds;
  }

  const visibleObjectIds = new Set(scene.layers.flatMap((layer) => (layer.visible ? layer.objectIds : [])));
  const visibleObjects = scene.objects.filter((object) => visibleObjectIds.has(object.id));

  if (visibleObjects.length === 0) {
    return defaultBounds;
  }

  const bounds = visibleObjects.reduce(
    (accumulator, object) => {
      const next = objectBounds(object);
      return {
        minX: Math.min(accumulator.minX, next.minX),
        maxX: Math.max(accumulator.maxX, next.maxX),
        minY: Math.min(accumulator.minY, next.minY),
        maxY: Math.max(accumulator.maxY, next.maxY),
        minZ: Math.min(accumulator.minZ, next.minZ),
        maxZ: Math.max(accumulator.maxZ, next.maxZ)
      };
    },
    {
      minX: Number.POSITIVE_INFINITY,
      maxX: Number.NEGATIVE_INFINITY,
      minY: Number.POSITIVE_INFINITY,
      maxY: Number.NEGATIVE_INFINITY,
      minZ: Number.POSITIVE_INFINITY,
      maxZ: Number.NEGATIVE_INFINITY
    }
  );

  const size = {
    x: Math.max(bounds.maxX - bounds.minX, 1),
    y: Math.max(bounds.maxY - bounds.minY, 1),
    z: Math.max(bounds.maxZ - bounds.minZ, 1)
  };
  const center = {
    x: (bounds.minX + bounds.maxX) / 2,
    y: (bounds.minY + bounds.maxY) / 2,
    z: (bounds.minZ + bounds.maxZ) / 2
  };

  return {
    center,
    size,
    radius: Math.max(Math.hypot(size.x, size.y, size.z) / 2, 1.6)
  };
};

const fitDistance = (bounds: SceneBounds, presetId: CameraMode) => {
  const projectedSize =
    presetId === "top"
      ? Math.hypot(bounds.size.x, bounds.size.z)
      : presetId === "front"
        ? Math.hypot(bounds.size.x, bounds.size.y)
        : presetId === "side"
          ? Math.hypot(bounds.size.z, bounds.size.y)
          : bounds.radius * 2;

  return Math.max(projectedSize * 2.6, bounds.radius * 3.2, 4);
};

const createFitCameraState = (presetId: CameraMode, scene?: SceneModel): CameraState => {
  const preset = BUILT_IN_CAMERA_PRESETS[presetId];
  const bounds = calculateVisibleSceneBounds(scene);
  const distance = fitDistance(bounds, presetId);
  const target = { ...bounds.center };

  if (presetId === "top") {
    return {
      mode: preset.state.mode,
      target,
      position: { x: target.x, y: target.y + distance, z: target.z + 0.01 },
      zoom: 1
    };
  }

  if (presetId === "front") {
    return {
      mode: preset.state.mode,
      target,
      position: { x: target.x, y: target.y, z: target.z + distance },
      zoom: 1
    };
  }

  if (presetId === "side") {
    return {
      mode: preset.state.mode,
      target,
      position: { x: target.x + distance, y: target.y, z: target.z },
      zoom: 1
    };
  }

  if (presetId === "isometric") {
    const offset = distance / Math.sqrt(3);
    return {
      mode: preset.state.mode,
      target,
      position: { x: target.x + offset, y: target.y + offset, z: target.z + offset },
      zoom: 1
    };
  }

  const perspectiveOffset = distance / Math.hypot(4, 3, 5);
  return {
    mode: preset.state.mode,
    target,
    position: {
      x: target.x + 4 * perspectiveOffset,
      y: target.y + 3 * perspectiveOffset,
      z: target.z + 5 * perspectiveOffset
    },
    zoom: 1
  };
};

export const createCameraStateFromPreset = (presetId: CameraMode, scene?: SceneModel): CameraState => {
  const preset = BUILT_IN_CAMERA_PRESETS[presetId];

  if (scene) {
    return createFitCameraState(presetId, scene);
  }

  return {
    mode: preset.state.mode,
    target: { ...preset.state.target },
    position: { ...preset.state.position },
    zoom: preset.state.zoom
  };
};
