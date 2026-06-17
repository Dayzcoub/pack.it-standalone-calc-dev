export type CalculatorKind = "stage" | "truss" | "led";

export type CalculationCurrency = "RUB" | "EUR" | "USD";

export type BaseCalculationInput = {
  calculationName?: string;
  priceProfileId: string;
  locale: "ru-RU" | "en-US";
  currency: CalculationCurrency;
};

export type SummaryMetric = {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
  tone?: "default" | "accent" | "success" | "warning" | "danger";
};

export type BomGroup = {
  id: string;
  title: string;
  rows: BomRow[];
};

export type BomRow = {
  id: string;
  category: string;
  name: string;
  sku?: string;
  unit: "pcs" | "m" | "m2" | "kg" | "set";
  quantity: number;
  unitWeightKg?: number;
  totalWeightKg?: number;
  unitPrice?: number;
  totalPrice?: number;
  notes?: string[];
  source?: CalculatorKind | "shared";
};

export type PriceSummary = {
  currency: CalculationCurrency;
  rental: number;
  mounting: number;
  delivery: number;
  extras: number;
  discount: number;
  subtotal: number;
  total: number;
  rows: PriceRow[];
};

export type PriceRow = {
  id: string;
  label: string;
  amount: number;
  category: "rental" | "mounting" | "delivery" | "extra" | "discount";
  notes?: string[];
};

export type CalculationWarning = {
  id: string;
  code: string;
  severity: "info" | "success" | "warning" | "danger";
  title: string;
  message: string;
  fieldPath?: string;
  relatedBomRowIds?: string[];
  blocksExport?: boolean;
};

export type DrawingElement = {
  id: string;
  type: "rect" | "line" | "marker";
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotationDeg?: number;
  label?: string;
  tone?: "default" | "accent" | "muted" | "warning";
};

export type DrawingDimension = {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  label: string;
};

export type DrawingLabel = {
  id: string;
  x: number;
  y: number;
  text: string;
};

export type DrawingModel = {
  kind: CalculatorKind;
  units: "m" | "mm";
  view: "top" | "front" | "side" | "iso";
  bounds: {
    width: number;
    height: number;
  };
  elements: DrawingElement[];
  dimensions: DrawingDimension[];
  labels: DrawingLabel[];
};

export type CalculationMeta = {
  inputHash?: string;
  sourceCatalogVersion: string;
  priceProfileId: string;
  hasBlockingErrors: boolean;
  hasWarnings: boolean;
  totalWeightKg?: number;
};

export type BaseCalculationResult = {
  id?: string;
  kind: CalculatorKind;
  title: string;
  calculationEngineVersion: string;
  createdAt?: string;
  updatedAt?: string;
  summary: SummaryMetric[];
  bom: BomGroup[];
  price: PriceSummary;
  warnings: CalculationWarning[];
  drawingModel: DrawingModel;
  meta: CalculationMeta;
};
