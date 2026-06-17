import type {
  BomGroup,
  BomRow,
  CalculationWarning,
  DrawingElement,
  PriceSummary,
  PriceRow,
  SummaryMetric
} from "../shared/contracts";
import type { LedCabinetId, LedCabinetSpec, LedConstructionInput, LedInput, LedResult } from "./contracts";

export const LED_CALCULATION_ENGINE_VERSION = "led-core-0.1.0";

const SOURCE_CATALOG_VERSION = "led-placeholder-catalog-0.1.0";
const POWER_CABLE_CAPACITY_W = 3400;

const cabinetCatalog: Record<LedCabinetId, LedCabinetSpec> = {
  "generic-640": {
    id: "generic-640",
    name: "LED cabinet 640 x 640 mm",
    widthMm: 640,
    heightMm: 640,
    weightKg: 14,
    powerW: 320,
    inrushW: 600,
    pixelsX: 160,
    pixelsY: 160,
    pixelPitchMm: 4
  }
};

const money = (value: number) => Number(value.toFixed(2));

const isFiniteNumber = (value: number) => Number.isFinite(value);

const safeNonNegative = (value: number | undefined) => (isFiniteNumber(value ?? 0) ? Math.max(0, value ?? 0) : 0);

const warning = (
  code: string,
  severity: CalculationWarning["severity"],
  title: string,
  message: string,
  options?: Pick<CalculationWarning, "fieldPath" | "blocksExport" | "relatedBomRowIds">
): CalculationWarning => ({
  id: `led-${code}`,
  code,
  severity,
  title,
  message,
  ...options
});

const validateInput = (input: LedInput): CalculationWarning[] => {
  const warnings: CalculationWarning[] = [];

  if (!cabinetCatalog[input.cabinetId]) {
    warnings.push(
      warning("missing-cabinet", "danger", "Missing LED cabinet", "Select a supported LED cabinet.", {
        fieldPath: "cabinetId",
        blocksExport: true
      })
    );
  }

  if (input.constructions.length === 0) {
    warnings.push(
      warning("no-constructions", "danger", "No LED construction", "Add at least one LED construction.", {
        fieldPath: "constructions",
        blocksExport: true
      })
    );
  }

  input.constructions.forEach((construction, index) => {
    if (!isFiniteNumber(construction.widthM) || construction.widthM <= 0) {
      warnings.push(
        warning("invalid-width", "danger", "Invalid LED width", "LED width must be greater than zero.", {
          fieldPath: `constructions.${index}.widthM`,
          blocksExport: true
        })
      );
    }

    if (!isFiniteNumber(construction.heightM) || construction.heightM <= 0) {
      warnings.push(
        warning("invalid-height", "danger", "Invalid LED height", "LED height must be greater than zero.", {
          fieldPath: `constructions.${index}.heightM`,
          blocksExport: true
        })
      );
    }

    if (!construction.mountMode.hanging && !construction.mountMode.standing) {
      warnings.push(
        warning("no-mount-mode", "warning", "No mount mode selected", "Choose hanging, standing or both before export.", {
          fieldPath: `constructions.${index}.mountMode`
        })
      );
    }

    if (construction.mountMode.standing && !construction.legType) {
      warnings.push(
        warning("missing-leg-type", "warning", "Standing leg type missing", "Standing LED constructions should specify leg type.", {
          fieldPath: `constructions.${index}.legType`
        })
      );
    }

    if (
      construction.mountMode.standing &&
      (!isFiniteNumber(construction.floorClearanceM ?? 0) || (construction.floorClearanceM ?? 0) < 0)
    ) {
      warnings.push(
        warning("invalid-floor-clearance", "danger", "Invalid LED floor clearance", "Floor clearance must be zero or greater.", {
          fieldPath: `constructions.${index}.floorClearanceM`,
          blocksExport: true
        })
      );
    }

    if (construction.mountMode.standing && (!isFiniteNumber(construction.legCount ?? 2) || (construction.legCount ?? 2) < 1)) {
      warnings.push(
        warning("invalid-leg-count", "danger", "Invalid LED leg count", "Standing LED constructions need at least one leg.", {
          fieldPath: `constructions.${index}.legCount`,
          blocksExport: true
        })
      );
    }
  });

  Object.entries(input.pricing).forEach(([field, value]) => {
    if (typeof value === "number" && value < 0) {
      warnings.push(
        warning("negative-price", "danger", "Invalid price input", `${field} cannot be negative.`, {
          fieldPath: `pricing.${field}`,
          blocksExport: true
        })
      );
    }
  });

  return warnings;
};

const plannedConstruction = (construction: LedConstructionInput, cabinet: LedCabinetSpec, index: number): LedResult["led"]["constructions"][number] => {
  const cabinetWidthM = cabinet.widthMm / 1000;
  const cabinetHeightM = cabinet.heightMm / 1000;
  const columns = Math.max(1, Math.ceil(construction.widthM / cabinetWidthM));
  const rows = Math.max(1, Math.ceil(construction.heightM / cabinetHeightM));
  const maxLegCount = Math.max(0, columns - 1);
  const requestedLegCount = Math.round(construction.legCount ?? maxLegCount);
  const legCount =
    construction.mountMode.standing && maxLegCount > 0 ? Math.min(Math.max(requestedLegCount, 1), maxLegCount) : 0;

  return {
    id: construction.id,
    name: construction.name || `LED ${index + 1}`,
    requested: {
      widthM: construction.widthM,
      heightM: construction.heightM
    },
    built: {
      widthM: Number((columns * cabinetWidthM).toFixed(3)),
      heightM: Number((rows * cabinetHeightM).toFixed(3)),
      columns,
      rows,
      cabinetCount: columns * rows
    },
    mountMode: { ...construction.mountMode },
    floorClearanceM: construction.mountMode.standing ? Math.max(0, construction.floorClearanceM ?? 0.35) : 0,
    legCount,
    legType: construction.legType
  };
};

const createGridWarnings = (constructions: LedResult["led"]["constructions"]): CalculationWarning[] =>
  constructions.flatMap((construction, index) => {
    const warnings: CalculationWarning[] = [];

    if (Math.abs(construction.requested.widthM - construction.built.widthM) > 0.001) {
      warnings.push(
        warning(
          `width-rounded-${construction.id}`,
          "warning",
          "LED width rounded to cabinet grid",
          `${construction.name} width ${construction.requested.widthM} m was rounded to ${construction.built.widthM} m for 640 mm cabinets.`,
          { fieldPath: `constructions.${index}.widthM` }
        )
      );
    }

    if (Math.abs(construction.requested.heightM - construction.built.heightM) > 0.001) {
      warnings.push(
        warning(
          `height-rounded-${construction.id}`,
          "warning",
          "LED height rounded to cabinet grid",
          `${construction.name} height ${construction.requested.heightM} m was rounded to ${construction.built.heightM} m for 640 mm cabinets.`,
          { fieldPath: `constructions.${index}.heightM` }
        )
      );
    }

    return warnings;
  });

const createBom = (cabinet: LedCabinetSpec, constructions: LedResult["led"]["constructions"], totals: LedResult["led"]["totals"]): BomGroup[] => {
  const cabinetRows: BomRow[] = [
    {
      id: "led-cabinets",
      category: "cabinets",
      name: cabinet.name,
      sku: cabinet.id,
      unit: "pcs",
      quantity: totals.cabinetCount,
      unitWeightKg: cabinet.weightKg,
      totalWeightKg: totals.weightKg,
      source: "led",
      notes: ["Default LED cabinet placeholder; verify manufacturer source before production use."]
    }
  ];
  const hangingRows: BomRow[] =
    totals.hangingBars > 0
      ? [
          {
            id: "led-hanging-bars",
            category: "hanging",
            name: "LED hanging bar",
            unit: "pcs",
            quantity: totals.hangingBars,
            source: "led",
            notes: ["Placeholder rule: one hanging bar per top cabinet column."]
          }
        ]
      : [];
  const standingRows: BomRow[] =
    totals.legs > 0
      ? [
          {
            id: "led-standing-legs",
            category: "standing",
            name: "LED standing leg",
            unit: "pcs",
            quantity: totals.legs,
            source: "led",
            notes: ["Leg count is user-defined and distributed across internal vertical cabinet seams."]
          }
        ]
      : [];
  const powerRows: BomRow[] = [
    {
      id: "led-power-cables",
      category: "power",
      name: "PowerCON-Schuko cable",
      unit: "pcs",
      quantity: totals.powerCables,
      source: "led",
      notes: [`Placeholder rule: ceil(total power / ${POWER_CABLE_CAPACITY_W} W).`]
    }
  ];

  return [
    { id: "led-bom-cabinets", title: "Cabinets", rows: cabinetRows },
    { id: "led-bom-hanging", title: "Hanging", rows: hangingRows },
    { id: "led-bom-standing", title: "Standing supports", rows: standingRows },
    { id: "led-bom-power", title: "Power", rows: powerRows }
  ].filter((group) => group.rows.length > 0);
};

const createPrice = (input: LedInput, totals: LedResult["led"]["totals"]): PriceSummary => {
  const rental = money(totals.cabinetCount * safeNonNegative(input.pricing.cabinetRentalPrice));
  const mounting = money(safeNonNegative(input.pricing.mountingPrice));
  const delivery = money(safeNonNegative(input.pricing.deliveryPrice));
  const extras = money(totals.hangingBars * safeNonNegative(input.pricing.hangingBarPrice) + totals.legs * safeNonNegative(input.pricing.legPrice));
  const rows: PriceRow[] = [
    { id: "led-price-cabinets", label: "LED cabinet rental", amount: rental, category: "rental" },
    { id: "led-price-mounting", label: "Mounting", amount: mounting, category: "mounting" },
    { id: "led-price-delivery", label: "Delivery", amount: delivery, category: "delivery" },
    { id: "led-price-extras", label: "Hanging/standing extras", amount: extras, category: "extra" }
  ];
  const subtotal = money(rental + mounting + delivery + extras);

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

const createDrawing = (constructions: LedResult["led"]["constructions"]) => {
  const construction = constructions[0];
  const boundsWidth = construction?.built.widthM ?? 1;
  const boundsHeight = construction?.built.heightM ?? 1;
  const elements: DrawingElement[] = [];

  if (construction) {
    const cabinetWidth = construction.built.widthM / construction.built.columns;
    const cabinetHeight = construction.built.heightM / construction.built.rows;

    for (let row = 0; row < construction.built.rows; row += 1) {
      for (let column = 0; column < construction.built.columns; column += 1) {
        elements.push({
          id: `led-cabinet-${column + 1}-${row + 1}`,
          type: "rect",
          x: column * cabinetWidth,
          y: row * cabinetHeight,
          width: cabinetWidth,
          height: cabinetHeight,
          tone: (row + column) % 2 === 0 ? "accent" : "default"
        });
      }
    }
  }

  return {
    kind: "led" as const,
    units: "m" as const,
    view: "front" as const,
    bounds: {
      width: Math.max(boundsWidth, 0.64),
      height: Math.max(boundsHeight, 0.64)
    },
    elements,
    dimensions: construction
      ? [
          {
            id: "led-width",
            from: { x: 0, y: construction.built.heightM + 0.2 },
            to: { x: construction.built.widthM, y: construction.built.heightM + 0.2 },
            label: `${construction.built.widthM} m`
          },
          {
            id: "led-height",
            from: { x: construction.built.widthM + 0.2, y: 0 },
            to: { x: construction.built.widthM + 0.2, y: construction.built.heightM },
            label: `${construction.built.heightM} m`
          }
        ]
      : [],
    labels: construction
      ? [
          {
            id: "led-count",
            x: construction.built.widthM,
            y: -0.2,
            text: `${construction.built.columns} x ${construction.built.rows} cabinets`
          }
        ]
      : []
  };
};

export const calculateLed = (input: LedInput, createdAt = new Date().toISOString()): LedResult => {
  const inputWarnings = validateInput(input);
  const cabinet = cabinetCatalog[input.cabinetId] ?? cabinetCatalog["generic-640"];
  const constructions = input.constructions.map((construction, index) => plannedConstruction(construction, cabinet, index));
  const gridWarnings = createGridWarnings(constructions);
  const cabinetCount = constructions.reduce((sum, construction) => sum + construction.built.cabinetCount, 0);
  const hangingBars = constructions.reduce(
    (sum, construction) => sum + (construction.mountMode.hanging ? construction.built.columns : 0),
    0
  );
  const legs = constructions.reduce((sum, construction) => sum + (construction.mountMode.standing ? construction.legCount : 0), 0);
  const powerW = cabinetCount * cabinet.powerW;
  const inrushW = cabinetCount * (cabinet.inrushW ?? cabinet.powerW);
  const totals = {
    cabinetCount,
    weightKg: money(cabinetCount * cabinet.weightKg),
    powerW,
    inrushW,
    hangingBars,
    legs,
    powerCables: Math.max(1, Math.ceil(powerW / POWER_CABLE_CAPACITY_W))
  };
  const warnings = [
    ...inputWarnings,
    ...gridWarnings,
    ...(totals.powerW > 10000
      ? [warning("high-power", "warning", "High LED power", "Check power distribution before export.", { relatedBomRowIds: ["led-power-cables"] })]
      : [])
  ];
  const bom = createBom(cabinet, constructions, totals);
  const price = createPrice(input, totals);
  const summary: SummaryMetric[] = [
    { id: "led-size", label: "Size", value: constructions[0] ? `${constructions[0].built.widthM} x ${constructions[0].built.heightM}` : "0 x 0", unit: "m" },
    { id: "led-cabinets", label: "Cabinets", value: totals.cabinetCount, unit: "pcs", tone: "accent" },
    { id: "led-weight", label: "Weight", value: totals.weightKg, unit: "kg" },
    { id: "led-power", label: "Power", value: money(totals.powerW / 1000), unit: "kW", tone: totals.powerW > 10000 ? "warning" : "default" }
  ];

  return {
    kind: "led",
    title: input.calculationName ?? "LED calculation",
    calculationEngineVersion: LED_CALCULATION_ENGINE_VERSION,
    createdAt,
    updatedAt: createdAt,
    summary,
    bom,
    price,
    warnings,
    drawingModel: createDrawing(constructions),
    meta: {
      sourceCatalogVersion: SOURCE_CATALOG_VERSION,
      priceProfileId: input.priceProfileId,
      hasBlockingErrors: warnings.some((item) => item.blocksExport),
      hasWarnings: warnings.length > 0,
      totalWeightKg: totals.weightKg
    },
    led: {
      cabinet,
      constructions,
      totals
    }
  };
};
