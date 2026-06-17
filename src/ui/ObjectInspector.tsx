import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Copy, Eye, EyeOff, Magnet, Save, Settings2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { ProjectAction } from "../actions/actionSystem";
import { createId } from "../app/id";
import { resolveAssetRef } from "../assets/assetResolver";
import { t } from "../i18n";
import { formatLength } from "../i18n/units";
import type { LocaleSettings, UnitsSettings } from "../project/contracts";
import type { BuilderReference, SceneGroup, SceneObject } from "../scene/contracts";
import { BottomSheet } from "./BottomSheet";

type ObjectInspectorProps = {
  object?: SceneObject;
  group?: SceneGroup;
  groupObjects?: SceneObject[];
  lockedObjectIds?: string[];
  connectionPortsVisible: boolean;
  locale: LocaleSettings;
  units: UnitsSettings;
  onAction: (action: ProjectAction) => void;
  onEditTemplate?: (group: SceneGroup) => void;
  onSave: () => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
};

const step = 0.25;

const centerOfObjects = (objects: SceneObject[]) => {
  if (objects.length === 0) {
    return { x: 0, y: 0, z: 0 };
  }

  return objects.reduce(
    (accumulator, object) => ({
      x: accumulator.x + object.transform.position.x / objects.length,
      y: accumulator.y + object.transform.position.y / objects.length,
      z: accumulator.z + object.transform.position.z / objects.length
    }),
    { x: 0, y: 0, z: 0 }
  );
};

const templateLabel = (builderType?: BuilderReference["builderType"]) => {
  if (builderType === "stage") {
    return "Stage template";
  }
  if (builderType === "truss") {
    return "Truss template";
  }
  if (builderType === "led") {
    return "LED template";
  }

  return "Group";
};

export const ObjectInspector = ({
  object,
  group,
  groupObjects = [],
  lockedObjectIds = [],
  connectionPortsVisible,
  locale,
  units,
  onAction,
  onEditTemplate,
  onSave,
  collapsed,
  onToggleCollapsed
}: ObjectInspectorProps) => {
  const [draftName, setDraftName] = useState(object?.name ?? "");
  const [draftGroupName, setDraftGroupName] = useState(group?.name ?? "");
  const groupCenter = centerOfObjects(groupObjects);
  const canSnapGroup = groupObjects.some((groupObject) => groupObject.connectionPorts?.length);
  const canSnapObject = Boolean(object?.connectionPorts?.length);
  const lockedObjectIdSet = new Set(lockedObjectIds);
  const objectLocked = object ? lockedObjectIdSet.has(object.id) : false;
  const groupLocked = groupObjects.some((groupObject) => lockedObjectIdSet.has(groupObject.id));
  const canEditTemplate =
    group?.builderRef?.builderType === "stage" ||
    group?.builderRef?.builderType === "truss" ||
    group?.builderRef?.builderType === "led";
  const builderType = group?.builderRef?.builderType;
  const builderVersion = group?.builderRef?.builderVersion;
  const objectSourceStatus = typeof object?.meta?.sourceStatus === "string" ? object.meta.sourceStatus : "unknown";
  const assetResolution = resolveAssetRef(object?.assetRef);
  const copy = (key: Parameters<typeof t>[1]) => t(locale.locale, key);
  const length = (meters: number) => formatLength(meters, { locale, units });

  useEffect(() => {
    setDraftName(object?.name ?? "");
  }, [object?.id, object?.name]);

  useEffect(() => {
    setDraftGroupName(group?.name ?? "");
  }, [group?.id, group?.name]);

  if (group) {
    return (
      <BottomSheet
        title={canEditTemplate ? templateLabel(builderType) : copy("inspector.group")}
        open
        className="inspectorSheet"
        headerAction={
          canEditTemplate ? (
            <button
              className="iconButton"
              type="button"
              aria-label="Edit parameters"
              title="Edit parameters"
              disabled={groupLocked}
              onClick={() => onEditTemplate?.(group)}
            >
              <Settings2 size={18} />
            </button>
          ) : undefined
        }
        collapsed={collapsed}
        onToggleCollapsed={onToggleCollapsed}
      >
        <div className="inspectorGrid">
          <label className="fieldStack">
            <span className="metaLabel">{copy("inspector.selectedGroup")}</span>
            <input
              value={draftGroupName}
              onChange={(event) => setDraftGroupName(event.target.value)}
              onBlur={() => onAction({ type: "scene/renameGroup", groupId: group.id, name: draftGroupName })}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.currentTarget.blur();
                }
              }}
            />
            <span className="muted">
              {group.type} · {group.objectIds.length} objects
            </span>
          </label>
          {canEditTemplate ? (
            <div className="templateReadout" aria-label="Template metadata">
              <span>
                <strong>{templateLabel(builderType)}</strong>
                <small>{builderVersion}</small>
              </span>
              <span>
                <strong>{group.objectIds.length}</strong>
                <small>objects</small>
              </span>
            </div>
          ) : null}
          <div className="positionReadout">
            <span>X {length(groupCenter.x)}</span>
            <span>Y {length(groupCenter.y)}</span>
            <span>Z {length(groupCenter.z)}</span>
          </div>
          <div className="movePad" aria-label="Move selected group">
            <button
              type="button"
              aria-label="Move group forward"
              disabled={groupLocked}
              onClick={() => onAction({ type: "scene/moveGroup", groupId: group.id, delta: { x: 0, y: 0, z: -step } })}
            >
              <ArrowUp size={18} />
            </button>
            <button
              type="button"
              aria-label="Move group left"
              disabled={groupLocked}
              onClick={() => onAction({ type: "scene/moveGroup", groupId: group.id, delta: { x: -step, y: 0, z: 0 } })}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Move group back"
              disabled={groupLocked}
              onClick={() => onAction({ type: "scene/moveGroup", groupId: group.id, delta: { x: 0, y: 0, z: step } })}
            >
              <ArrowDown size={18} />
            </button>
            <button
              type="button"
              aria-label="Move group right"
              disabled={groupLocked}
              onClick={() => onAction({ type: "scene/moveGroup", groupId: group.id, delta: { x: step, y: 0, z: 0 } })}
            >
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="inlineActions">
            {canEditTemplate ? (
              <button
                className="ghostButton fullWidthButton"
                type="button"
                disabled={groupLocked}
                onClick={() => onEditTemplate?.(group)}
              >
                <Settings2 size={17} />
                Edit parameters
              </button>
            ) : null}
            {canSnapGroup ? (
              <button
                className="ghostButton fullWidthButton"
                type="button"
                disabled={groupLocked}
                onClick={() =>
                  onAction({
                    type: "scene/snapGroupToNearestCompatiblePort",
                    groupId: group.id
                  })
                }
              >
                <Magnet size={17} />
                {copy("inspector.snapGroup")}
              </button>
            ) : null}
            {canSnapGroup ? (
              <button
                className="ghostButton fullWidthButton"
                type="button"
                onClick={() =>
                  onAction({
                    type: "scene/setConnectionPortsVisible",
                    visible: !connectionPortsVisible
                  })
                }
              >
                {connectionPortsVisible ? <EyeOff size={17} /> : <Eye size={17} />}
                {connectionPortsVisible ? copy("inspector.hidePorts") : copy("inspector.showPorts")}
              </button>
            ) : null}
            <button
              className="ghostButton"
              type="button"
              onClick={() =>
                onAction({
                  type: "scene/duplicateGroup",
                  groupId: group.id,
                  newGroupId: createId("group"),
                  newObjectIds: group.objectIds.map(() => createId("object"))
                })
              }
            >
              <Copy size={17} />
              {copy("inspector.duplicate")}
            </button>
            <button
              className="dangerButton"
              type="button"
              onClick={() => onAction({ type: "scene/deleteGroup", groupId: group.id })}
            >
              <Trash2 size={17} />
              {copy("inspector.delete")}
            </button>
          </div>
          <button className="primaryButton" type="button" onClick={onSave}>
            <Save size={18} />
            {copy("action.saveProject")}
          </button>
        </div>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet
      title={object ? copy("inspector.object") : copy("inspector.scene")}
      open
      className="inspectorSheet"
      collapsed={collapsed}
      onToggleCollapsed={onToggleCollapsed}
    >
      {object ? (
        <div className="inspectorGrid">
          <label className="fieldStack">
            <span className="metaLabel">{copy("inspector.selected")}</span>
            <input
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              onBlur={() => onAction({ type: "scene/renameObject", objectId: object.id, name: draftName })}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.currentTarget.blur();
                }
              }}
            />
            <span className="muted">
              {object.type} · {object.bomMode}
            </span>
          </label>
          <div className="positionReadout">
            <span>X {length(object.transform.position.x)}</span>
            <span>Y {length(object.transform.position.y)}</span>
            <span>Z {length(object.transform.position.z)}</span>
          </div>
          {(object.catalogRef || object.assetRef || object.connectionPorts?.length) ? (
            <div className="catalogReadout" aria-label="Catalog metadata">
              <span>
                <strong>Catalog</strong>
                <small>{object.catalogRef ?? "none"}</small>
              </span>
              <span>
                <strong>Asset</strong>
                <small>{object.assetRef ?? "none"}</small>
              </span>
              <span>
                <strong>Source</strong>
                <small>{objectSourceStatus}</small>
              </span>
              <span>
                <strong>Ports</strong>
                <small>{object.connectionPorts?.length ?? 0}</small>
              </span>
              <span className="wideReadout">
                <strong>Asset status</strong>
                <small>{assetResolution.status}</small>
              </span>
              <span className="wideReadout">
                <strong>Asset note</strong>
                <small>{assetResolution.reason}</small>
              </span>
            </div>
          ) : null}
          <div className="movePad" aria-label="Move selected object">
            <button
              type="button"
              aria-label="Move forward"
              disabled={objectLocked}
              onClick={() => onAction({ type: "scene/moveObject", objectId: object.id, delta: { x: 0, y: 0, z: -step } })}
            >
              <ArrowUp size={18} />
            </button>
            <button
              type="button"
              aria-label="Move left"
              disabled={objectLocked}
              onClick={() => onAction({ type: "scene/moveObject", objectId: object.id, delta: { x: -step, y: 0, z: 0 } })}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Move back"
              disabled={objectLocked}
              onClick={() => onAction({ type: "scene/moveObject", objectId: object.id, delta: { x: 0, y: 0, z: step } })}
            >
              <ArrowDown size={18} />
            </button>
            <button
              type="button"
              aria-label="Move right"
              disabled={objectLocked}
              onClick={() => onAction({ type: "scene/moveObject", objectId: object.id, delta: { x: step, y: 0, z: 0 } })}
            >
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="inlineActions">
            {canSnapObject ? (
              <button
                className="ghostButton fullWidthButton"
                type="button"
                disabled={objectLocked}
                onClick={() =>
                  onAction({
                    type: "scene/snapObjectToNearestCompatiblePort",
                    objectId: object.id
                  })
                }
              >
                <Magnet size={17} />
                {copy("inspector.snapNearest")}
              </button>
            ) : null}
            {canSnapObject ? (
              <button
                className="ghostButton fullWidthButton"
                type="button"
                onClick={() =>
                  onAction({
                    type: "scene/setConnectionPortsVisible",
                    visible: !connectionPortsVisible
                  })
                }
              >
                {connectionPortsVisible ? <EyeOff size={17} /> : <Eye size={17} />}
                {connectionPortsVisible ? copy("inspector.hidePorts") : copy("inspector.showPorts")}
              </button>
            ) : null}
            <button
              className="ghostButton"
              type="button"
              onClick={() =>
                onAction({
                  type: "scene/duplicateObject",
                  objectId: object.id,
                  newObjectId: createId("object")
                })
              }
            >
              <Copy size={17} />
              {copy("inspector.duplicate")}
            </button>
            <button
              className="dangerButton"
              type="button"
              onClick={() => onAction({ type: "scene/deleteObject", objectId: object.id })}
            >
              <Trash2 size={17} />
              {copy("inspector.delete")}
            </button>
          </div>
          <button className="primaryButton" type="button" onClick={onSave}>
            <Save size={18} />
            {copy("action.saveProject")}
          </button>
        </div>
      ) : (
        <div className="emptyInspector">
          <p>Select the test cube to inspect and move it through the ActionSystem.</p>
          <button className="primaryButton" type="button" onClick={onSave}>
            <Save size={18} />
            {copy("action.saveProject")}
          </button>
        </div>
      )}
    </BottomSheet>
  );
};
