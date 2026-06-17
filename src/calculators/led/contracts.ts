import type { BaseCalculationInput, BaseCalculationResult } from "../shared/contracts";

export type LedCabinetId = "generic-640";

export type LedLegType = "3m" | "2_5m" | "2m";

export type LedConstructionInput = {
  id: string;
  name: string;
  widthM: number;
  heightM: number;
  mountMode: {
    hanging: boolean;
    standing: boolean;
  };
  floorClearanceM?: number;
  legCount?: number;
  legType?: LedLegType;
};

export type LedPricingInput = {
  cabinetRentalPrice: number;
  mountingPrice: number;
  deliveryPrice: number;
  hangingBarPrice?: number;
  legPrice?: number;
};

export type LedInput = BaseCalculationInput & {
  cabinetId: LedCabinetId;
  constructions: LedConstructionInput[];
  activeConstructionId?: string;
  pricing: LedPricingInput;
};

export type LedCabinetSpec = {
  id: LedCabinetId;
  name: string;
  widthMm: number;
  heightMm: number;
  weightKg: number;
  powerW: number;
  inrushW?: number;
  pixelsX?: number;
  pixelsY?: number;
  pixelPitchMm?: number;
};

export type LedResult = BaseCalculationResult & {
  kind: "led";
  led: {
    cabinet: LedCabinetSpec;
    constructions: Array<{
      id: string;
      name: string;
      requested: {
        widthM: number;
        heightM: number;
      };
      built: {
        widthM: number;
        heightM: number;
        columns: number;
        rows: number;
        cabinetCount: number;
      };
      mountMode: {
        hanging: boolean;
        standing: boolean;
      };
      floorClearanceM: number;
      legCount: number;
      legType?: LedLegType;
    }>;
    totals: {
      cabinetCount: number;
      weightKg: number;
      powerW: number;
      inrushW: number;
      hangingBars: number;
      legs: number;
      powerCables: number;
    };
  };
};
