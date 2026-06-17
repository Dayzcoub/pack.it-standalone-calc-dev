import { createId } from "../../app/id";
import { calculateLed } from "../../calculators/led/calculateLed";
import type { LedCabinetId, LedLegType } from "../../calculators/led/contracts";
import type { SceneGroup, SceneObject } from "../../scene/contracts";

export type LedBuilderInput = {
  cabinetId: LedCabinetId;
  widthM: number;
  heightM: number;
  hangingEnabled: boolean;
  standingEnabled: boolean;
  floorClearanceM: number;
  legCount: number;
  legType: LedLegType;
};

export type LedBuilderOutput = {
  group: SceneGroup;
  objects: SceneObject[];
};

export const defaultLedBuilderInput = (): LedBuilderInput => ({
  cabinetId: "generic-640",
  widthM: 5.12,
  heightM: 2.56,
  hangingEnabled: true,
  standingEnabled: false,
  floorClearanceM: 0.35,
  legCount: 2,
  legType: "3m"
});

export const selectLedLegSeamIndexes = (columns: number, legCount: number): number[] => {
  const safeColumns = Math.max(1, Math.round(columns));
  const firstInteriorSeam = 1;
  const lastInteriorSeam = safeColumns - 1;
  const availableInteriorSeams = Math.max(0, lastInteriorSeam - firstInteriorSeam + 1);

  if (availableInteriorSeams === 0) {
    return [];
  }

  const safeLegCount = Math.min(Math.max(1, Math.round(legCount)), availableInteriorSeams);

  if (safeLegCount === 1) {
    return [Math.round((firstInteriorSeam + lastInteriorSeam) / 2)];
  }

  if (safeLegCount >= availableInteriorSeams) {
    return Array.from({ length: availableInteriorSeams }, (_, index) => firstInteriorSeam + index);
  }

  return Array.from({ length: safeLegCount }, (_, index) =>
    Math.round(firstInteriorSeam + (index * (lastInteriorSeam - firstInteriorSeam)) / (safeLegCount - 1))
  );
};

export const createLedGroup = (input: LedBuilderInput): LedBuilderOutput => {
  const ledResult = calculateLed({
    calculationName: "LED builder result",
    priceProfileId: "default-local",
    locale: "en-US",
    currency: "USD",
    cabinetId: input.cabinetId,
    constructions: [
      {
        id: "led-main",
        name: "Main LED wall",
        widthM: input.widthM,
        heightM: input.heightM,
        mountMode: {
          hanging: input.hangingEnabled,
          standing: input.standingEnabled
        },
        floorClearanceM: input.floorClearanceM,
        legCount: input.legCount,
        legType: input.standingEnabled ? input.legType : undefined
      }
    ],
    pricing: {
      cabinetRentalPrice: 18,
      mountingPrice: 160,
      deliveryPrice: 90,
      hangingBarPrice: 8,
      legPrice: 12
    }
  });
  const construction = ledResult.led.constructions[0];
  const cabinetWidthM = ledResult.led.cabinet.widthMm / 1000;
  const cabinetHeightM = ledResult.led.cabinet.heightMm / 1000;
  const groupId = createId("led-group");
  const objects: SceneObject[] = [];
  const screenBottomY = construction.floorClearanceM;

  for (let row = 0; row < construction.built.rows; row += 1) {
    for (let column = 0; column < construction.built.columns; column += 1) {
      const objectId = createId("led-cabinet");
      objects.push({
        id: objectId,
        type: "led",
        name: `${ledResult.led.cabinet.name} ${column + 1}-${row + 1}`,
        transform: {
          position: {
            x: column * cabinetWidthM - construction.built.widthM / 2 + cabinetWidthM / 2,
            y: screenBottomY + (construction.built.rows - row - 1) * cabinetHeightM + cabinetHeightM / 2,
            z: -0.08
          },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 }
        },
        dimensions: {
          width: cabinetWidthM,
          height: cabinetHeightM,
          depth: 0.08
        },
        catalogRef: ledResult.led.cabinet.id,
        bomMode: "none",
        capabilities: {
          hasWeight: true,
          hasPower: true,
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
          builder: "led",
          builderVersion: "led-core-0.1.0",
          calculationEngineVersion: ledResult.calculationEngineVersion,
          cabinetColumn: column + 1,
          cabinetRow: row + 1,
          cabinetPowerW: ledResult.led.cabinet.powerW,
          cabinetWeightKg: ledResult.led.cabinet.weightKg
        },
        warnings: []
      });
    }
  }

  if (input.standingEnabled && construction.floorClearanceM > 0) {
    const legHeight = construction.floorClearanceM;
    const legSeamIndexes = selectLedLegSeamIndexes(construction.built.columns, construction.legCount);
    const legXs = legSeamIndexes.map((seamIndex) =>
      Number((-construction.built.widthM / 2 + seamIndex * cabinetWidthM).toFixed(3))
    );

    legXs.forEach((x, index) => {
      objects.push({
        id: createId("led-leg"),
        type: "rigging",
        name: `LED seam leg ${index + 1}`,
        transform: {
          position: { x, y: legHeight / 2, z: -0.1 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 }
        },
        dimensions: { width: 0.1, height: legHeight, depth: 0.1 },
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
          builder: "led",
          partRole: "standing-leg",
          seamIndex: legSeamIndexes[index],
          legType: input.legType
        },
        warnings: []
      });
    });
  }

  return {
    group: {
      id: groupId,
      type: "LedGroup",
      name: `LED ${construction.built.widthM} x ${construction.built.heightM} m`,
      objectIds: objects.map((object) => object.id),
      visible: true,
      locked: false,
      builderRef: {
        builderType: "led",
        builderVersion: "led-core-0.1.0",
        parameters: {
          cabinetId: input.cabinetId,
          requestedWidthM: input.widthM,
          requestedHeightM: input.heightM,
          widthM: construction.built.widthM,
          heightM: construction.built.heightM,
          hangingEnabled: input.hangingEnabled,
          standingEnabled: input.standingEnabled,
          floorClearanceM: construction.floorClearanceM,
          legCount: construction.legCount,
          legType: input.legType
        }
      },
      meta: {
        taskScope: "Task 005 LED builder connected to core",
        calculationEngineVersion: ledResult.calculationEngineVersion,
        cabinet: ledResult.led.cabinet,
        moduleGrid: construction.built,
        totals: ledResult.led.totals,
        generatedBomGroups: ledResult.bom,
        generatedPrice: ledResult.price,
        generatedWarnings: ledResult.warnings
      }
    },
    objects
  };
};
