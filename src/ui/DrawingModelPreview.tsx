import type { DrawingModel } from "../calculators/shared/contracts";

type DrawingModelPreviewProps = {
  drawingModel: DrawingModel;
  title: string;
};

const PADDING = 0.8;

export const DrawingModelPreview = ({ drawingModel, title }: DrawingModelPreviewProps) => {
  const viewBox = [
    -PADDING,
    -PADDING,
    drawingModel.bounds.width + PADDING * 2,
    drawingModel.bounds.height + PADDING * 2
  ].join(" ");

  return (
    <figure className="drawingPreview">
      <svg viewBox={viewBox} role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
        <rect
          className="drawingBounds"
          x={0}
          y={0}
          width={drawingModel.bounds.width}
          height={drawingModel.bounds.height}
          rx={0.05}
        />
        {drawingModel.elements.map((element) =>
          element.type === "rect" ? (
            <g key={element.id}>
              <rect
                className={`drawingElement drawingElement-${element.tone ?? "default"}`}
                x={element.x}
                y={element.y}
                width={element.width ?? 0}
                height={element.height ?? 0}
                rx={0.035}
              />
              {element.label ? (
                <text className="drawingElementLabel" x={element.x + (element.width ?? 0) / 2} y={element.y + (element.height ?? 0) / 2}>
                  {element.label}
                </text>
              ) : null}
            </g>
          ) : null
        )}
        {drawingModel.dimensions.map((dimension) => (
          <g className="drawingDimension" key={dimension.id}>
            <line x1={dimension.from.x} y1={dimension.from.y} x2={dimension.to.x} y2={dimension.to.y} />
            <circle cx={dimension.from.x} cy={dimension.from.y} r={0.035} />
            <circle cx={dimension.to.x} cy={dimension.to.y} r={0.035} />
            <text x={(dimension.from.x + dimension.to.x) / 2} y={(dimension.from.y + dimension.to.y) / 2 - 0.08}>
              {dimension.label}
            </text>
          </g>
        ))}
        {drawingModel.labels.map((label) => (
          <text className="drawingLabel" x={label.x} y={label.y} key={label.id}>
            {label.text}
          </text>
        ))}
      </svg>
    </figure>
  );
};
