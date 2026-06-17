import { Camera } from "lucide-react";
import { BUILT_IN_CAMERA_PRESETS } from "../renderer/cameraPresets";
import type { CameraMode } from "../scene/contracts";

type CameraPresetRailProps = {
  activeMode: CameraMode;
  onSelectPreset: (presetId: CameraMode) => void;
};

const visiblePresets: CameraMode[] = ["isometric", "top", "front", "side"];

export const CameraPresetRail = ({ activeMode, onSelectPreset }: CameraPresetRailProps) => (
  <div className="cameraPresetRail" aria-label="Camera presets">
    <Camera size={16} aria-hidden="true" />
    {visiblePresets.map((presetId) => (
      <button
        className={activeMode === presetId ? "active" : undefined}
        type="button"
        key={presetId}
        aria-pressed={activeMode === presetId}
        onClick={() => onSelectPreset(presetId)}
      >
        {BUILT_IN_CAMERA_PRESETS[presetId].name}
      </button>
    ))}
  </div>
);
