import { calculateStage } from "../../calculators/stage/calculateStage";
import type { StageSystemId } from "../../calculators/stage/contracts";
import { createId } from "../../app/id";
import type { SceneGroup, SceneObject } from "../../scene/contracts";

export type StageBuilderInput = {
  system: StageSystemId;
  widthM: number;
  depthM: number;
  heightM: number;
  deckType: "generic-deck";
  stairsEnabled: boolean;
  closureEnabled: boolean;
};

export type StageBuilderOutput = {
  group: SceneGroup;
  objects: SceneObject[];
};

export const defaultStageBuilderInput = (): StageBuilderInput => ({
  system: "imlight-copy",
  widthM: 4,
  depthM: 3,
  heightM: 0.8,
  deckType: "generic-deck",
  stairsEnabled: false,
  closureEnabled: false
});

export const createStageGroup = (input: StageBuilderInput): StageBuilderOutput => {
  const stageResult = calculateStage({
    calculationName: "Stage builder result",
    priceProfileId: "default-local",
    locale: "en-US",
    currency: "USD",
    system: input.system,
    widthM: input.widthM,
    depthM: input.depthM,
    heightM: input.heightM,
    deckType: input.deckType,
    stairs: {
      enabled: input.stairsEnabled,
      count: input.stairsEnabled ? 1 : 0,
      widthM: 1
    },
    closure: {
      enabled: input.closureEnabled,
      type: input.closureEnabled ? "fabric" : undefined,
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
  const safeWidth = stageResult.stage.built.widthM;
  const safeDepth = stageResult.stage.built.depthM;
  const safeHeight = stageResult.stage.built.heightM;
  const columns = stageResult.stage.built.columns;
  const rows = stageResult.stage.built.rows;
  const deckWidth = stageResult.stage.built.moduleWidthM;
  const deckDepth = stageResult.stage.built.moduleDepthM;
  const deckBomRow = stageResult.bom.flatMap((group) => group.rows).find((row) => row.id === "stage-decks");
  const groupId = createId("stage-group");

  const objects: SceneObject[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const objectId = createId("stage-deck");
      objects.push({
        id: objectId,
        type: "stage",
        name: deckBomRow?.name ?? `Stage deck ${column + 1}-${row + 1}`,
        transform: {
          position: {
            x: column * deckWidth - safeWidth / 2 + deckWidth / 2,
            y: safeHeight,
            z: row * deckDepth - safeDepth / 2 + deckDepth / 2
          },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 }
        },
        dimensions: {
          width: deckWidth,
          height: 0.18,
          depth: deckDepth
        },
        catalogRef: deckBomRow?.sku,
        bomMode: "none",
        capabilities: {
          canStandOnFloor: true,
          contributesToBom: false,
          contributesToPdf: true,
          transformRules: {
            canMove: true,
            canRotate: true,
            canScale: false,
            lockY: true
          }
        },
        meta: {
          groupId,
          builder: "stage",
          builderVersion: "stage-core-0.1.0",
          calculationEngineVersion: stageResult.calculationEngineVersion,
          stageSystem: input.system,
          deckColumn: column + 1,
          deckRow: row + 1,
          taskScope: "stage-core-visual"
        },
        warnings: []
      });
    }
  }

  return {
    group: {
      id: groupId,
      type: "StageGroup",
      name: `Stage ${safeWidth} x ${safeDepth} m`,
      objectIds: objects.map((object) => object.id),
      visible: true,
      locked: false,
      builderRef: {
        builderType: "stage",
        builderVersion: "stage-core-0.1.0",
        parameters: {
          system: input.system,
          requestedWidthM: input.widthM,
          requestedDepthM: input.depthM,
          requestedHeightM: input.heightM,
          widthM: safeWidth,
          depthM: safeDepth,
          heightM: safeHeight,
          deckType: input.deckType,
          stairsEnabled: input.stairsEnabled,
          closureEnabled: input.closureEnabled
        }
      },
      meta: {
        taskScope: "Task 004 Stage UI connected to core",
        calculationEngineVersion: stageResult.calculationEngineVersion,
        stageSystem: input.system,
        moduleGrid: stageResult.stage.built,
        generatedBomGroups: stageResult.bom,
        generatedPrice: stageResult.price,
        generatedWarnings: stageResult.warnings
      }
    },
    objects
  };
};
