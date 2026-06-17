import type { ReactNode } from "react";

type BottomSheetProps = {
  title: string;
  open: boolean;
  onClose?: () => void;
  className?: string;
  headerAction?: ReactNode;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  children: ReactNode;
};

export const BottomSheet = ({
  title,
  open,
  onClose,
  className,
  headerAction,
  collapsed,
  onToggleCollapsed,
  children
}: BottomSheetProps) => {
  if (!open) {
    return null;
  }

  const classes = ["bottomSheet", className, collapsed ? "bottomSheet-collapsed" : undefined].filter(Boolean).join(" ");

  return (
    <section className={classes} aria-label={title}>
      {onToggleCollapsed ? (
        <button
          className="sheetHandleButton"
          type="button"
          aria-label={`${collapsed ? "Expand" : "Collapse"} ${title}`}
          onClick={onToggleCollapsed}
        >
          <span className="sheetHandle" />
        </button>
      ) : (
        <div className="sheetHandle" />
      )}
      <div className="sheetHeader">
        {onToggleCollapsed ? (
          <button className="sheetTitleButton" type="button" onClick={onToggleCollapsed}>
            <h2>{title}</h2>
          </button>
        ) : (
          <h2>{title}</h2>
        )}
        {headerAction}
        {onClose ? (
          <button className="ghostButton" type="button" onClick={onClose}>
            Close
          </button>
        ) : null}
      </div>
      <div className="sheetBody">{children}</div>
    </section>
  );
};
