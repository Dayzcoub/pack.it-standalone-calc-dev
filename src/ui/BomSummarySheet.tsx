import type { BomSummary } from "../bom/contracts";
import { BottomSheet } from "./BottomSheet";

type BomSummarySheetProps = {
  open: boolean;
  summary: BomSummary;
  onClose: () => void;
};

const sourceLabel = (source: BomSummary["contributions"][number]["source"]) => {
  if (source === "catalog") {
    return "Catalog";
  }

  if (source === "generated-placeholder") {
    return "Generated";
  }

  return "Visual";
};

export const BomSummarySheet = ({ open, summary, onClose }: BomSummarySheetProps) => (
  <BottomSheet title="BOM" open={open} onClose={onClose}>
    <div className="bomPanel">
      <div className="bomSummaryGrid" aria-label="BOM summary">
        <span>
          <strong>{summary.contributions.length}</strong>
          Rows
        </span>
        <span>
          <strong>{summary.totalQuantity}</strong>
          Items
        </span>
        <span>
          <strong>{summary.engineVersion.replace("bom-scene-placeholder-", "")}</strong>
          Engine
        </span>
      </div>

      {summary.contributions.length > 0 ? (
        <div className="bomList" aria-label="BOM rows">
          {summary.contributions.map((contribution) => (
            <article className="bomRow" key={contribution.id}>
              <div>
                <strong>{contribution.name}</strong>
                <small>
                  {contribution.catalogRef ?? contribution.objectType} · {sourceLabel(contribution.source)}
                </small>
                <em>{contribution.notes[0]}</em>
              </div>
              <span>
                {contribution.quantity} {contribution.unit}
              </span>
            </article>
          ))}
        </div>
      ) : (
        <div className="emptyInspector">
          <p>No BOM rows for this scene.</p>
        </div>
      )}
    </div>
  </BottomSheet>
);
