import { Box, Construction, Layers3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { defaultLedBuilderInput, type LedBuilderInput } from "../builders/led/createLedGroup";
import { defaultStageBuilderInput, type StageBuilderInput } from "../builders/stage/createStageGroup";
import { defaultTrussBuilderInput, type TrussBuilderInput, type TrussBuilderMode } from "../builders/truss/createTrussGroup";
import { calculateLed } from "../calculators/led/calculateLed";
import { calculateStage } from "../calculators/stage/calculateStage";
import { BottomSheet } from "./BottomSheet";
import { DrawingModelPreview } from "./DrawingModelPreview";

type BuilderSheetProps = {
  builder?: "stage" | "truss" | "led";
  mode?: "create" | "edit";
  initialGroupName?: string;
  initialStageInput?: StageBuilderInput;
  initialTrussInput?: TrussBuilderInput;
  initialLedInput?: LedBuilderInput;
  onClose: () => void;
  onCreateStage: (input: StageBuilderInput, name?: string) => void;
  onCreateTruss: (input: TrussBuilderInput, name?: string) => void;
  onCreateLed: (input: LedBuilderInput, name?: string) => void;
};

const labels = {
  stage: {
    title: "Add Stage",
    text: "StageGroup builder placeholder. Final stage formulas are outside Task 001.",
    icon: Box
  },
  truss: {
    title: "Add Truss",
    text: "TrussGroup builder placeholder. Final truss formulas are outside Task 001.",
    icon: Construction
  },
  led: {
    title: "Add LED",
    text: "LedGroup builder placeholder. Final LED formulas are outside Task 001.",
    icon: Layers3
  }
};

const stageSystems: { id: StageBuilderInput["system"]; label: string }[] = [
  { id: "imlight-copy", label: "Imlight Copy" },
  { id: "pkc-ship-paz", label: "PKC SHIP-PAZ" },
  { id: "pkc-paz-paz", label: "PKC PAZ-PAZ" }
];

const roundToHalfMeter = (value: number) => Math.max(0.5, Math.round(value * 2) / 2);

export const BuilderSheet = ({
  builder,
  mode = "create",
  initialGroupName,
  initialStageInput,
  initialTrussInput,
  initialLedInput,
  onClose,
  onCreateStage,
  onCreateTruss,
  onCreateLed
}: BuilderSheetProps) => {
  const [stageInput, setStageInput] = useState(defaultStageBuilderInput);
  const [trussInput, setTrussInput] = useState(defaultTrussBuilderInput);
  const [ledInput, setLedInput] = useState(defaultLedBuilderInput);
  const [groupName, setGroupName] = useState("");
  const [groupNameTouched, setGroupNameTouched] = useState(false);
  const isEditing = mode === "edit";

  useEffect(() => {
    setGroupName(initialGroupName ?? "");
    setGroupNameTouched(false);
    if (builder === "stage") {
      setStageInput(initialStageInput ?? defaultStageBuilderInput());
    }
    if (builder === "truss") {
      setTrussInput(initialTrussInput ?? defaultTrussBuilderInput());
    }
    if (builder === "led") {
      setLedInput(initialLedInput ?? defaultLedBuilderInput());
    }
  }, [builder, initialGroupName, initialLedInput, initialStageInput, initialTrussInput]);

  const stageResult = useMemo(
    () =>
      calculateStage({
        calculationName: "Stage builder preview",
        priceProfileId: "default-local",
        locale: "en-US",
        currency: "USD",
        system: stageInput.system,
        widthM: stageInput.widthM,
        depthM: stageInput.depthM,
        heightM: stageInput.heightM,
        deckType: stageInput.deckType,
        stairs: {
          enabled: stageInput.stairsEnabled,
          count: stageInput.stairsEnabled ? 1 : 0,
          widthM: 1
        },
        closure: {
          enabled: stageInput.closureEnabled,
          type: stageInput.closureEnabled ? "fabric" : undefined,
          sides: ["front"]
        },
        pricing: {
          moduleRentalPrice: 25,
          mountingPrice: 120,
          deliveryPrice: 80,
          skirtPricePerMeter: 5,
          stairsPrice: 30
        }
      }),
    [stageInput]
  );
  const ledResult = useMemo(
    () =>
      calculateLed({
        calculationName: "LED builder preview",
        priceProfileId: "default-local",
        locale: "en-US",
        currency: "USD",
        cabinetId: ledInput.cabinetId,
        constructions: [
          {
            id: "led-main",
            name: "Main LED wall",
            widthM: ledInput.widthM,
            heightM: ledInput.heightM,
            mountMode: {
              hanging: ledInput.hangingEnabled,
              standing: ledInput.standingEnabled
            },
            floorClearanceM: ledInput.floorClearanceM,
            legCount: ledInput.legCount,
            legType: ledInput.standingEnabled ? ledInput.legType : undefined
          }
        ],
        pricing: {
          cabinetRentalPrice: 18,
          mountingPrice: 160,
          deliveryPrice: 90,
          hangingBarPrice: 8,
          legPrice: 12
        }
      }),
    [ledInput]
  );

  if (!builder) {
    return null;
  }

  const label = labels[builder];
  const Icon = label.icon;
  const title = isEditing ? label.title.replace("Add", "Edit") : label.title;
  const submittedGroupName = () => {
    const trimmedName = groupName.trim();
    if (!trimmedName) {
      return undefined;
    }

    return isEditing ? (groupNameTouched ? trimmedName : undefined) : trimmedName;
  };
  const displayName = (generatedName: string) => groupName.trim() || generatedName;
  const stageGeneratedName = `Stage ${stageResult.stage.built.widthM} x ${stageResult.stage.built.depthM} m`;
  const trussGeneratedName = `MDM TQ29 ${trussInput.mode} ${roundToHalfMeter(trussInput.widthM)} m`;
  const ledConstruction = ledResult.led.constructions[0];
  const ledGeneratedName = `LED ${ledConstruction.built.widthM} x ${ledConstruction.built.heightM} m`;

  if (builder === "stage") {
    return (
      <BottomSheet title={title} open onClose={onClose}>
        <div className="builderForm">
          <label className="fieldStack fullWidthField">
            <span className="metaLabel">Name</span>
            <input
              placeholder="Auto name from template"
              value={groupName}
              onChange={(event) => {
                setGroupNameTouched(true);
                setGroupName(event.target.value);
              }}
            />
          </label>
          <div className="builderIdentity fullWidthField" aria-label="Stage template preview">
            <span>
              <strong>{displayName(stageGeneratedName)}</strong>
              <small>Name</small>
            </span>
            <span>
              <strong>
                {stageResult.stage.built.widthM} x {stageResult.stage.built.depthM} m
              </strong>
              <small>Built size</small>
            </span>
          </div>
          <label className="fieldStack fullWidthField">
            <span className="metaLabel">System</span>
            <select
              value={stageInput.system}
              onChange={(event) =>
                setStageInput((current) => ({ ...current, system: event.target.value as StageBuilderInput["system"] }))
              }
            >
              {stageSystems.map((system) => (
                <option value={system.id} key={system.id}>
                  {system.label}
                </option>
              ))}
            </select>
          </label>
          <label className="fieldStack">
            <span className="metaLabel">Width, m</span>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={stageInput.widthM}
              onChange={(event) =>
                setStageInput((current) => ({ ...current, widthM: Number(event.target.value) }))
              }
            />
          </label>
          <label className="fieldStack">
            <span className="metaLabel">Depth, m</span>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={stageInput.depthM}
              onChange={(event) =>
                setStageInput((current) => ({ ...current, depthM: Number(event.target.value) }))
              }
            />
          </label>
          <label className="fieldStack">
            <span className="metaLabel">Height, m</span>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={stageInput.heightM}
              onChange={(event) =>
                setStageInput((current) => ({ ...current, heightM: Number(event.target.value) }))
              }
            />
          </label>
          <label className="checkRow">
            <input
              type="checkbox"
              checked={stageInput.stairsEnabled}
              onChange={(event) =>
                setStageInput((current) => ({ ...current, stairsEnabled: event.target.checked }))
              }
            />
            Stairs placeholder
          </label>
          <label className="checkRow">
            <input
              type="checkbox"
              checked={stageInput.closureEnabled}
              onChange={(event) =>
                setStageInput((current) => ({ ...current, closureEnabled: event.target.checked }))
              }
            />
            Closure placeholder
          </label>
          <div className="builderPreview fullWidthField" aria-label="Stage calculation preview">
            <DrawingModelPreview drawingModel={stageResult.drawingModel} title="Stage scheme preview" />
            <div className="builderSummaryGrid">
              {stageResult.summary.map((metric) => (
                <span key={metric.id}>
                  <strong>
                    {metric.value}
                    {metric.unit ? ` ${metric.unit}` : ""}
                  </strong>
                  {metric.label}
                </span>
              ))}
            </div>
            <div className="builderBomPreview" aria-label="Stage BOM preview">
              {stageResult.bom
                .flatMap((group) => group.rows.map((row) => ({ ...row, groupTitle: group.title })))
                .slice(0, 5)
                .map((row) => (
                  <div className="builderBomRow" key={row.id}>
                    <span>
                      <strong>{row.name}</strong>
                      <small>{row.groupTitle}</small>
                    </span>
                    <em>
                      {row.quantity} {row.unit}
                    </em>
                  </div>
                ))}
            </div>
            {stageResult.warnings.length > 0 ? (
              <div className="builderWarningList" aria-label="Stage calculation warnings">
                {stageResult.warnings.slice(0, 2).map((warning) => (
                  <p key={warning.id}>{warning.message}</p>
                ))}
              </div>
            ) : null}
          </div>
          <button
            className="primaryButton fullWidthButton"
            type="button"
            onClick={() => {
              onCreateStage(stageInput, submittedGroupName());
              onClose();
            }}
          >
            <Box size={18} />
            {isEditing ? "Update StageGroup" : "Create StageGroup"}
          </button>
        </div>
      </BottomSheet>
    );
  }

  if (builder === "truss") {
    return (
      <BottomSheet title={title} open onClose={onClose}>
        <div className="builderForm">
          <label className="fieldStack fullWidthField">
            <span className="metaLabel">Name</span>
            <input
              placeholder="Auto name from template"
              value={groupName}
              onChange={(event) => {
                setGroupNameTouched(true);
                setGroupName(event.target.value);
              }}
            />
          </label>
          <div className="builderIdentity fullWidthField" aria-label="Truss template preview">
            <span>
              <strong>{displayName(trussGeneratedName)}</strong>
              <small>Name</small>
            </span>
            <span>
              <strong>
                {roundToHalfMeter(trussInput.widthM)} x {roundToHalfMeter(trussInput.heightM)} m
              </strong>
              <small>Built span</small>
            </span>
          </div>
          <label className="fieldStack fullWidthField">
            <span className="metaLabel">Mode</span>
            <select
              value={trussInput.mode}
              onChange={(event) =>
                setTrussInput((current) => ({
                  ...current,
                  mode: event.target.value as TrussBuilderMode
                }))
              }
            >
              <option value="portal">Portal</option>
              <option value="frame">Frame</option>
              <option value="stool">Stool</option>
            </select>
          </label>
          <label className="fieldStack">
            <span className="metaLabel">Width, m</span>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={trussInput.widthM}
              onChange={(event) =>
                setTrussInput((current) => ({ ...current, widthM: Number(event.target.value) }))
              }
            />
          </label>
          <label className="fieldStack">
            <span className="metaLabel">Height, m</span>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={trussInput.heightM}
              onChange={(event) =>
                setTrussInput((current) => ({ ...current, heightM: Number(event.target.value) }))
              }
            />
          </label>
          <label className="fieldStack">
            <span className="metaLabel">Depth, m</span>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={trussInput.depthM}
              onChange={(event) =>
                setTrussInput((current) => ({ ...current, depthM: Number(event.target.value) }))
              }
            />
          </label>
          <p className="muted">
            Uses MDM TQ29 C2 catalog sections and 90 degree CD29 corner blocks. Snap points, load
            data, bases and fasteners still need verified rules.
          </p>
          <button
            className="primaryButton fullWidthButton"
            type="button"
            onClick={() => {
              onCreateTruss(trussInput, submittedGroupName());
              onClose();
            }}
          >
            <Construction size={18} />
            {isEditing ? "Update TrussGroup" : "Create TrussGroup"}
          </button>
        </div>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet title={title} open onClose={onClose}>
      <div className="builderForm">
        <label className="fieldStack fullWidthField">
          <span className="metaLabel">Name</span>
          <input
            placeholder="Auto name from template"
            value={groupName}
            onChange={(event) => {
              setGroupNameTouched(true);
              setGroupName(event.target.value);
            }}
          />
        </label>
        <div className="builderIdentity fullWidthField" aria-label="LED template preview">
          <span>
            <strong>{displayName(ledGeneratedName)}</strong>
            <small>Name</small>
          </span>
          <span>
            <strong>
              {ledConstruction.built.widthM} x {ledConstruction.built.heightM} m
            </strong>
            <small>Built size</small>
          </span>
        </div>
        <label className="fieldStack fullWidthField">
          <span className="metaLabel">Cabinet</span>
          <select
            value={ledInput.cabinetId}
            onChange={(event) =>
              setLedInput((current) => ({ ...current, cabinetId: event.target.value as LedBuilderInput["cabinetId"] }))
            }
          >
            <option value="generic-640">LED cabinet 640 x 640 mm</option>
          </select>
        </label>
        <label className="fieldStack">
          <span className="metaLabel">Width, m</span>
          <input
            type="number"
            min="0.64"
            step="0.64"
            value={ledInput.widthM}
            onChange={(event) => setLedInput((current) => ({ ...current, widthM: Number(event.target.value) }))}
          />
        </label>
        <label className="fieldStack">
          <span className="metaLabel">Height, m</span>
          <input
            type="number"
            min="0.64"
            step="0.64"
            value={ledInput.heightM}
            onChange={(event) => setLedInput((current) => ({ ...current, heightM: Number(event.target.value) }))}
          />
        </label>
        <label className="fieldStack">
          <span className="metaLabel">Leg type</span>
          <select
            value={ledInput.legType}
            disabled={!ledInput.standingEnabled}
            onChange={(event) => setLedInput((current) => ({ ...current, legType: event.target.value as LedBuilderInput["legType"] }))}
          >
            <option value="3m">3 m</option>
            <option value="2_5m">2.5 m</option>
            <option value="2m">2 m</option>
          </select>
        </label>
        <label className="fieldStack">
          <span className="metaLabel">Leg count</span>
          <input
            type="number"
            min="2"
            step="1"
            disabled={!ledInput.standingEnabled}
            value={ledInput.legCount}
            onChange={(event) => setLedInput((current) => ({ ...current, legCount: Number(event.target.value) }))}
          />
        </label>
        <label className="checkRow">
          <input
            type="checkbox"
            checked={ledInput.hangingEnabled}
            onChange={(event) => setLedInput((current) => ({ ...current, hangingEnabled: event.target.checked }))}
          />
          Hanging
        </label>
        <label className="checkRow">
          <input
            type="checkbox"
            checked={ledInput.standingEnabled}
            onChange={(event) => setLedInput((current) => ({ ...current, standingEnabled: event.target.checked }))}
          />
            Standing
        </label>
        <label className="fieldStack fullWidthField">
          <span className="metaLabel">Floor clearance, m</span>
          <input
            type="number"
            min="0"
            step="0.05"
            disabled={!ledInput.standingEnabled}
            value={ledInput.floorClearanceM}
            onChange={(event) => setLedInput((current) => ({ ...current, floorClearanceM: Number(event.target.value) }))}
          />
        </label>
        <div className="builderPreview fullWidthField" aria-label="LED calculation preview">
          <DrawingModelPreview drawingModel={ledResult.drawingModel} title="LED scheme preview" />
          <div className="builderSummaryGrid">
            {ledResult.summary.map((metric) => (
              <span key={metric.id}>
                <strong>
                  {metric.value}
                  {metric.unit ? ` ${metric.unit}` : ""}
                </strong>
                {metric.label}
              </span>
            ))}
          </div>
          <div className="builderBomPreview" aria-label="LED BOM preview">
            {ledResult.bom
              .flatMap((group) => group.rows.map((row) => ({ ...row, groupTitle: group.title })))
              .slice(0, 5)
              .map((row) => (
                <div className="builderBomRow" key={row.id}>
                  <span>
                    <strong>{row.name}</strong>
                    <small>{row.groupTitle}</small>
                  </span>
                  <em>
                    {row.quantity} {row.unit}
                  </em>
                </div>
              ))}
          </div>
          {ledResult.warnings.length > 0 ? (
            <div className="builderWarningList" aria-label="LED calculation warnings">
              {ledResult.warnings.slice(0, 2).map((warning) => (
                <p key={warning.id}>{warning.message}</p>
              ))}
            </div>
          ) : null}
        </div>
        <button
          className="primaryButton fullWidthButton"
          type="button"
          onClick={() => {
            onCreateLed(ledInput, submittedGroupName());
            onClose();
          }}
        >
          <Icon size={18} />
          {isEditing ? "Update LedGroup" : "Create LedGroup"}
        </button>
      </div>
    </BottomSheet>
  );
};
