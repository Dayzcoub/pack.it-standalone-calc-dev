import { describe, expect, it } from "vitest";
import { createCameraStateFromPreset, calculateVisibleSceneBounds } from "../renderer/cameraPresets";
import type { SceneModel, SceneObject } from "../scene/contracts";

const object = (id: string, x: number, z: number, width = 1, depth = 1): SceneObject => ({
  id,
  name: id,
  type: "generic3d",
  dimensions: { width, height: 1, depth },
  transform: {
    position: { x, y: 0.5, z },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 }
  },
  bomMode: "visualOnly",
  capabilities: {
    transformRules: { canMove: true, canRotate: false, canScale: false }
  },
  meta: {},
  warnings: []
});

const scene = (objects: SceneObject[], visibleIds = objects.map((item) => item.id)): SceneModel => ({
  id: "scene-test",
  units: "m",
  origin: { x: 0, y: 0, z: 0 },
  objects,
  groups: [],
  layers: [
    {
      id: "layer-test",
      name: "Test",
      visible: true,
      locked: false,
      objectIds: visibleIds
    },
    {
      id: "layer-hidden",
      name: "Hidden",
      visible: false,
      locked: false,
      objectIds: objects.filter((item) => !visibleIds.includes(item.id)).map((item) => item.id)
    }
  ],
  selection: {
    selectedObjectIds: [],
    mode: "none"
  },
  camera: createCameraStateFromPreset("perspective"),
  environment: {
    gridVisible: true,
    connectionPortsVisible: true,
    background: "dark"
  }
});

describe("camera presets", () => {
  it("fits top view around all visible objects", () => {
    const state = createCameraStateFromPreset("top", scene([object("left", -5, -2, 2), object("right", 7, 4, 3)]));

    expect(state.mode).toBe("top");
    expect(state.target.x).toBeCloseTo(1.25);
    expect(state.target.z).toBeCloseTo(1);
    expect(state.position.y - state.target.y).toBeGreaterThan(10);
  });

  it("ignores hidden objects when calculating camera bounds", () => {
    const bounds = calculateVisibleSceneBounds(scene([object("visible", 0, 0), object("hidden", 100, 100)], ["visible"]));

    expect(bounds.center.x).toBeCloseTo(0);
    expect(bounds.center.z).toBeCloseTo(0);
    expect(bounds.radius).toBeLessThan(3);
  });
});
