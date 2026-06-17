import { Eye, EyeOff, Lock, Unlock } from "lucide-react";
import type { ProjectAction } from "../actions/actionSystem";
import type { SceneLayer } from "../scene/contracts";
import { BottomSheet } from "./BottomSheet";

type LayerSheetProps = {
  open: boolean;
  layers: SceneLayer[];
  onClose: () => void;
  onAction: (action: ProjectAction) => void;
};

export const LayerSheet = ({ open, layers, onClose, onAction }: LayerSheetProps) => (
  <BottomSheet title="Layers" open={open} onClose={onClose}>
    <div className="layerPanel">
      {layers.map((layer) => (
        <div className="layerControlRow" key={layer.id}>
          <button
            className="layerRow"
            type="button"
            aria-pressed={layer.visible}
            onClick={() =>
              onAction({
                type: "scene/setLayerVisible",
                layerId: layer.id,
                visible: !layer.visible
              })
            }
          >
            <span>
              <strong>{layer.name}</strong>
              <small>{layer.objectIds.length} objects</small>
            </span>
            <span className="layerRowActions">
              {layer.visible ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>
          </button>
          <button
            className="layerLockButton"
            type="button"
            aria-label={`${layer.locked ? "Unlock" : "Lock"} ${layer.name} layer`}
            aria-pressed={layer.locked}
            onClick={() =>
              onAction({
                type: "scene/setLayerLocked",
                layerId: layer.id,
                locked: !layer.locked
              })
            }
          >
            {layer.locked ? <Lock size={17} /> : <Unlock size={17} />}
          </button>
        </div>
      ))}
    </div>
  </BottomSheet>
);
