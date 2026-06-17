import { Boxes, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { CatalogItem } from "../catalog/contracts";
import { BottomSheet } from "./BottomSheet";

type AssetLibrarySheetProps = {
  open: boolean;
  catalogItems: CatalogItem[];
  onClose: () => void;
  onAddTestCube: () => void;
  onAddCatalogItem: (item: CatalogItem) => void;
};

type AssetFilter = "all" | "straight_truss" | "corner_block" | "base_plate";

const filterOptions: { id: AssetFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "straight_truss", label: "Straight" },
  { id: "corner_block", label: "Corners" },
  { id: "base_plate", label: "Bases" }
];

const matchesFilter = (item: CatalogItem, filter: AssetFilter) =>
  filter === "all" || item.compatibilityTags.includes(filter);

export const AssetLibrarySheet = ({
  open,
  catalogItems,
  onClose,
  onAddTestCube,
  onAddCatalogItem
}: AssetLibrarySheetProps) => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<AssetFilter>("all");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return catalogItems.filter((item) => {
      const searchText = [
        item.displayName,
        item.manufacturer,
        item.model,
        item.source.sourceStatus,
        ...item.compatibilityTags
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesFilter(item, activeFilter) && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [activeFilter, catalogItems, query]);

  return (
    <BottomSheet title="Asset Library" open={open} onClose={onClose}>
      <div className="assetLibraryPanel">
        <div className="placeholderPanel">
          <Boxes size={28} />
          <p>Local offline catalog. Choose an object to place it into the scene.</p>
        </div>
        <div className="assetLibrarySummary">
          <strong>{filteredItems.length} shown</strong>
          <span>{catalogItems.length} catalog objects</span>
        </div>
        <label className="assetSearch">
          <Search size={16} aria-hidden="true" />
          <input
            aria-label="Search catalog assets"
            value={query}
            placeholder="Search MDM catalog"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="assetFilterRail" aria-label="Asset type filters">
          {filterOptions.map((option) => (
            <button
              className={activeFilter === option.id ? "active" : undefined}
              type="button"
              key={option.id}
              aria-pressed={activeFilter === option.id}
              onClick={() => setActiveFilter(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="assetList" aria-label="Catalog assets">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button className="assetRow" type="button" key={item.id} onClick={() => onAddCatalogItem(item)}>
                <span>
                  <strong>{item.displayName}</strong>
                  <small>
                    {item.manufacturer ?? "Local"} · {item.compatibilityTags[1] ?? item.type} · {item.source.sourceStatus}
                  </small>
                </span>
                <em>Add</em>
              </button>
            ))
          ) : (
            <div className="assetEmptyState">No matching catalog objects.</div>
          )}
        </div>
        <button className="primaryButton fullWidthButton" type="button" onClick={onAddTestCube}>
          Add test cube
        </button>
      </div>
    </BottomSheet>
  );
};
