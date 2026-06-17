import type {
  BomGroup,
  BomRow,
  CalculationWarning,
  DrawingElement,
  PriceRow,
  PriceSummary,
  SummaryMetric
} from "../shared/contracts";
import type { StageInput, StageResult, StageSystemId } from "./contracts";

export const STAGE_CALCULATION_ENGINE_VERSION = "stage-core-0.1.0";
const STAGE_MODULE_WIDTH_M = 1.2;
const STAGE_MODULE_DEPTH_M = 1.2;
const LARGE_STAGE_AREA_M2 = 80;
const SOURCE_CATALOG_VERSION = "stage-placeholder-catalog-0.1.0";

type StageSystemProfile = {
  id: StageSystemId;
  label: string;
  deckName: string;
  deckSku: string;
  legRule: "shared-grid" | "per-module";
  extraRows: (columns: number, rows: number, modules: number) => BomRow[];
};

const roundUpModules = (value: number, moduleSize: number) => Math.max(1, Math.ceil(value / moduleSize));

const money = (value: number) => Number(value.toFixed(2));

const isFiniteNumber = (value: number) => Number.isFinite(value);

const safeNonNegative = (value: number | undefined) => (isFiniteNumber(value ?? 0) ? Math.max(0, value ?? 0) : 0);

const profiles: Record<StageSystemId, StageSystemProfile> = {
  "imlight-copy": {
    id: "imlight-copy",
    label: "Imlight Copy",
    deckName: "Imlight Copy deck 1.2 x 1.2 m",
    deckSku: "IMC-DECK-1200",
    legRule: "shared-grid",
    extraRows: (columns, rows) => [
      {
        id: "imlight-crossbars",
        category: "frames",
        name: "Imlight Copy perimeter/cross bar",
        sku: "IMC-CROSSBAR-PLACEHOLDER",
        unit: "pcs",
        quantity: columns * (rows + 1) + rows * (columns + 1),
        notes: ["Placeholder extraction row; verify against source system."],
        source: "stage"
      }
    ]
  },
  "pkc-ship-paz": {
    id: "pkc-ship-paz",
    label: "PKC SHIP-PAZ",
    deckName: "PKC SS-PS module 1.2 x 1.2 m",
    deckSku: "PKC-SS-PS-1200",
    legRule: "shared-grid",
    extraRows: (columns, rows) => [
      {
        id: "pkc-ship-paz-connectors",
        category: "connectors",
        name: "PKC SHIP-PAZ connector set",
        sku: "PKC-PS-CONNECTOR-SET",
        unit: "set",
        quantity: columns * rows,
        notes: ["Connector set is grouped until passport-level BOM is verified."],
        source: "stage"
      }
    ]
  },
  "pkc-paz-paz": {
    id: "pkc-paz-paz",
    label: "PKC PAZ-PAZ",
    deckName: "PKC SS-PP module 1.2 x 1.2 m",
    deckSku: "PKC-SS-PP-1200",
    legRule: "per-module",
    extraRows: (columns, rows, modules) => [
      {
        id: "pkc-sd-lm-t",
        category: "connectors",
        name: "SD-LM-T connector",
        sku: "SD-LM-T",
        unit: "pcs",
        quantity: 2 * (columns + rows),
        source: "stage"
      },
      {
        id: "pkc-sd-lm-x",
        category: "connectors",
        name: "SD-LM-X connector",
        sku: "SD-LM-X",
        unit: "pcs",
        quantity: Math.max(0, (columns - 1) * (rows - 1)),
        source: "stage"
      },
      {
        id: "pkc-sd-lm-ss",
        category: "connectors",
        name: "SD-LM-SS connector",
        sku: "SD-LM-SS",
        unit: "pcs",
        quantity: modules * 4,
        source: "stage"
      }
    ]
  }
};

const createWarning = (
  code: string,
  severity: CalculationWarning["severity"],
  title: string,
  message: string,
  options?: Pick<CalculationWarning, "fieldPath" | "blocksExport" | "relatedBomRowIds">
): CalculationWarning => ({
  id: `stage-${code}`,
  code,
  severity,
  title,
  message,
  ...options
});

const validateInput = (input: StageInput): CalculationWarning[] => {
  const warnings: CalculationWarning[] = [];

  if (!profiles[input.system]) {
    warnings.push(
      createWarning("invalid-system", "danger", "Invalid stage system", "Select a supported stage system.", {
        fieldPath: "system",
        blocksExport: true
      })
    );
  }

  [
    ["widthM", input.widthM],
    ["depthM", input.depthM],
    ["heightM", input.heightM]
  ].forEach(([field, value]) => {
    if (!isFiniteNumber(value as number) || (value as number) <= 0) {
      warnings.push(
        createWarning(`invalid-${field}`, "danger", "Invalid stage dimension", `${field} must be greater than zero.`, {
          fieldPath: field as string,
          blocksExport: true
        })
      );
    }
  });

  Object.entries(input.pricing).forEach(([field, value]) => {
    if (typeof value === "number" && value < 0) {
      warnings.push(
        createWarning(`negative-price-${field}`, "danger", "Invalid price input", `${field} cannot be negative.`, {
          fieldPath: `pricing.${field}`,
          blocksExport: true
        })
      );
    }
  });

  if (input.stairs.enabled && input.stairs.count <= 0) {
    warnings.push(
      createWarning("stairs-count", "warning", "Stairs count is missing", "Enabled stairs should have count greater than zero.", {
        fieldPath: "stairs.count"
      })
    );
  }

  if (input.closure.enabled && !input.closure.type) {
    warnings.push(
      createWarning("closure-type", "warning", "Closure type is missing", "Choose fabric or banner closure before export.", {
        fieldPath: "closure.type"
      })
    );
  }

  return warnings;
};

const createBom = (input: StageInput, columns: number, rows: number, moduleCount: number): BomGroup[] => {
  const profile = profiles[input.system] ?? profiles["imlight-copy"];
  const legCount = profile.legRule === "shared-grid" ? (columns + 1) * (rows + 1) : moduleCount * 4;
  const closureSides = input.closure.sides?.length ? input.closure.sides : (["front"] as const);
  const closureLength = input.closure.enabled
    ? closureSides.reduce((total, side) => total + (side === "front" || side === "back" ? columns * STAGE_MODULE_WIDTH_M : rows * STAGE_MODULE_DEPTH_M), 0)
    : 0;

  const deckRows: BomRow[] = [
    {
      id: "stage-decks",
      category: "deck",
      name: profile.deckName,
      sku: profile.deckSku,
      unit: "pcs",
      quantity: moduleCount,
      notes: ["1.2 m module grid; dimensions round up to full modules."],
      source: "stage"
    }
  ];
  const supportRows: BomRow[] = [
    {
      id: "stage-legs",
      category: "supports",
      name: `${profile.label} support leg/post`,
      sku: `${profile.id.toUpperCase()}-LEG-PLACEHOLDER`,
      unit: "pcs",
      quantity: legCount,
      notes: [profile.legRule === "shared-grid" ? "Shared grid leg rule." : "Four legs per module rule."],
      source: "stage"
    }
  ];
  const connectorRows = profile.extraRows(columns, rows, moduleCount).filter((row) => row.quantity > 0);
  const stairsRows: BomRow[] =
    input.stairs.enabled && input.stairs.count > 0
      ? [
          {
            id: "stage-stairs",
            category: "stairs",
            name: `Stage stairs ${input.stairs.widthM ?? 1} m`,
            unit: "pcs",
            quantity: input.stairs.count,
            source: "stage"
          }
        ]
      : [];
  const closureRows: BomRow[] =
    input.closure.enabled && closureLength > 0
      ? [
          {
            id: "stage-closure",
            category: "closure",
            name: `Stage closure ${input.closure.type ?? "unspecified"}`,
            unit: "m",
            quantity: money(closureLength),
            notes: ["Closure length is calculated from selected stage sides."],
            source: "stage"
          }
        ]
      : [];

  return [
    { id: "stage-deck-group", title: "Deck", rows: deckRows },
    { id: "stage-support-group", title: "Legs / supports", rows: supportRows },
    { id: "stage-connector-group", title: "Frames / connectors", rows: connectorRows },
    { id: "stage-stairs-group", title: "Stairs", rows: stairsRows },
    { id: "stage-closure-group", title: "Closure / skirt", rows: closureRows }
  ];
};

const createPrice = (input: StageInput, moduleCount: number, closureMeters: number): PriceSummary => {
  const rental = money(safeNonNegative(input.pricing.moduleRentalPrice) * moduleCount);
  const mounting = money(safeNonNegative(input.pricing.mountingPrice));
  const delivery = money(safeNonNegative(input.pricing.deliveryPrice));
  const stairs = input.stairs.enabled ? money(safeNonNegative(input.pricing.stairsPrice) * Math.max(0, input.stairs.count)) : 0;
  const closure = input.closure.enabled ? money(safeNonNegative(input.pricing.skirtPricePerMeter) * closureMeters) : 0;
  const extras = money(stairs + closure);
  const subtotal = money(rental + mounting + delivery + extras);
  const rows: PriceRow[] = [
    { id: "stage-rental", label: "Module rental", amount: rental, category: "rental" },
    { id: "stage-mounting", label: "Mounting", amount: mounting, category: "mounting" },
    { id: "stage-delivery", label: "Delivery", amount: delivery, category: "delivery" }
  ];

  if (stairs > 0) {
    rows.push({ id: "stage-stairs-price", label: "Stairs", amount: stairs, category: "extra" });
  }

  if (closure > 0) {
    rows.push({ id: "stage-closure-price", label: "Closure", amount: closure, category: "extra" });
  }

  return {
    currency: input.currency,
    rental,
    mounting,
    delivery,
    extras,
    discount: 0,
    subtotal,
    total: subtotal,
    rows
  };
};

const createDrawingElements = (columns: number, rows: number): DrawingElement[] => {
  const elements: DrawingElement[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      elements.push({
        id: `deck-${column + 1}-${row + 1}`,
        type: "rect",
        x: column * STAGE_MODULE_WIDTH_M,
        y: row * STAGE_MODULE_DEPTH_M,
        width: STAGE_MODULE_WIDTH_M,
        height: STAGE_MODULE_DEPTH_M,
        label: `${column + 1}.${row + 1}`,
        tone: "default"
      });
    }
  }

  return elements;
};

const createSummary = (
  input: StageInput,
  builtWidthM: number,
  builtDepthM: number,
  moduleCount: number,
  total: number
): SummaryMetric[] => [
  { id: "stage-size", label: "Size", value: `${builtWidthM} x ${builtDepthM}`, unit: "m", tone: "accent" },
  { id: "stage-height", label: "Height", value: input.heightM, unit: "m" },
  { id: "stage-modules", label: "Modules", value: moduleCount, unit: "pcs" },
  { id: "stage-total", label: "Total", value: total, unit: input.currency, tone: "success" }
];

export const calculateStage = (input: StageInput, createdAt = new Date().toISOString()): StageResult => {
  const warnings = validateInput(input);
  const safeWidth = isFiniteNumber(input.widthM) && input.widthM > 0 ? input.widthM : STAGE_MODULE_WIDTH_M;
  const safeDepth = isFiniteNumber(input.depthM) && input.depthM > 0 ? input.depthM : STAGE_MODULE_DEPTH_M;
  const safeHeight = isFiniteNumber(input.heightM) && input.heightM > 0 ? input.heightM : 0.2;
  const columns = roundUpModules(safeWidth, STAGE_MODULE_WIDTH_M);
  const rows = roundUpModules(safeDepth, STAGE_MODULE_DEPTH_M);
  const moduleCount = columns * rows;
  const builtWidthM = money(columns * STAGE_MODULE_WIDTH_M);
  const builtDepthM = money(rows * STAGE_MODULE_DEPTH_M);
  const areaM2 = builtWidthM * builtDepthM;
  const closureSides = input.closure.sides?.length ? input.closure.sides : (["front"] as const);
  const closureMeters = input.closure.enabled
    ? money(closureSides.reduce((total, side) => total + (side === "front" || side === "back" ? builtWidthM : builtDepthM), 0))
    : 0;

  if (Math.abs(builtWidthM - safeWidth) > 0.001 || Math.abs(builtDepthM - safeDepth) > 0.001) {
    warnings.push(
      createWarning(
        "module-grid-rounding",
        "warning",
        "Dimensions rounded to module grid",
        `Requested ${safeWidth} x ${safeDepth} m, built ${builtWidthM} x ${builtDepthM} m.`
      )
    );
  }

  if (areaM2 > LARGE_STAGE_AREA_M2) {
    warnings.push(
      createWarning("large-stage-area", "warning", "Large stage area", "Review supports, access and site constraints before export.")
    );
  }

  warnings.push(
    createWarning(
      "stage-source-needs-verification",
      "info",
      "Stage catalog data needs verification",
      "BOM names and connector rows are deterministic placeholders until source passports are extracted."
    )
  );

  const bom = createBom(input, columns, rows, moduleCount);
  const price = createPrice(input, moduleCount, closureMeters);
  const hasBlockingErrors = warnings.some((warning) => warning.blocksExport);

  return {
    kind: "stage",
    title: input.calculationName ?? `Stage ${builtWidthM} x ${builtDepthM} m`,
    calculationEngineVersion: STAGE_CALCULATION_ENGINE_VERSION,
    createdAt,
    summary: createSummary(input, builtWidthM, builtDepthM, moduleCount, price.total),
    bom,
    price,
    warnings,
    drawingModel: {
      kind: "stage",
      units: "m",
      view: "top",
      bounds: {
        width: builtWidthM,
        height: builtDepthM
      },
      elements: createDrawingElements(columns, rows),
      dimensions: [
        { id: "stage-width", from: { x: 0, y: -0.35 }, to: { x: builtWidthM, y: -0.35 }, label: `${builtWidthM} m` },
        { id: "stage-depth", from: { x: -0.35, y: 0 }, to: { x: -0.35, y: builtDepthM }, label: `${builtDepthM} m` }
      ],
      labels: [
        { id: "stage-system", x: 0, y: builtDepthM + 0.35, text: profiles[input.system]?.label ?? input.system },
        { id: "stage-height", x: builtWidthM, y: builtDepthM + 0.35, text: `H ${safeHeight} m` }
      ]
    },
    meta: {
      sourceCatalogVersion: SOURCE_CATALOG_VERSION,
      priceProfileId: input.priceProfileId,
      hasBlockingErrors,
      hasWarnings: warnings.some((warning) => warning.severity === "warning" || warning.severity === "danger")
    },
    stage: {
      system: input.system,
      requested: {
        widthM: input.widthM,
        depthM: input.depthM,
        heightM: input.heightM
      },
      built: {
        widthM: builtWidthM,
        depthM: builtDepthM,
        heightM: safeHeight,
        columns,
        rows,
        moduleWidthM: STAGE_MODULE_WIDTH_M,
        moduleDepthM: STAGE_MODULE_DEPTH_M,
        moduleCount
      }
    }
  };
};

export const defaultStageInput = (): StageInput => ({
  calculationName: "Stage calculation",
  priceProfileId: "default-local",
  locale: "en-US",
  currency: "USD",
  system: "imlight-copy",
  widthM: 7.2,
  depthM: 4.8,
  heightM: 0.8,
  deckType: "standard",
  stairs: {
    enabled: false,
    count: 0,
    widthM: 1
  },
  closure: {
    enabled: false,
    sides: ["front"]
  },
  pricing: {
    moduleRentalPrice: 25,
    mountingPrice: 120,
    deliveryPrice: 80,
    skirtPricePerMeter: 5,
    stairsPrice: 30
  }
});
