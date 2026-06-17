import type { BaseCalculationInput, BaseCalculationResult } from "../shared/contracts";

export type StageSystemId = "imlight-copy" | "pkc-ship-paz" | "pkc-paz-paz";

export type StageClosureSide = "front" | "back" | "left" | "right";

export type StagePricingInput = {
  moduleRentalPrice: number;
  mountingPrice: number;
  deliveryPrice: number;
  skirtPricePerMeter?: number;
  stairsPrice?: number;
};

export type StageInput = BaseCalculationInput & {
  system: StageSystemId;
  widthM: number;
  depthM: number;
  heightM: number;
  deckType: string;
  postType?: string;
  railType?: string;
  stairs: {
    enabled: boolean;
    count: number;
    widthM?: number;
  };
  closure: {
    enabled: boolean;
    type?: "fabric" | "banner";
    sides?: StageClosureSide[];
  };
  pricing: StagePricingInput;
};

export type StageResult = BaseCalculationResult & {
  kind: "stage";
  stage: {
    system: StageSystemId;
    requested: {
      widthM: number;
      depthM: number;
      heightM: number;
    };
    built: {
      widthM: number;
      depthM: number;
      heightM: number;
      columns: number;
      rows: number;
      moduleWidthM: number;
      moduleDepthM: number;
      moduleCount: number;
    };
  };
};
