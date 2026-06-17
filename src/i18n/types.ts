import type { LocaleSettings, UnitsSettings } from "../project/contracts";

export type LocaleCode = LocaleSettings["locale"];

export type I18nKey =
  | "app.title"
  | "action.addStage"
  | "action.addTruss"
  | "action.addLed"
  | "action.assetLibrary"
  | "action.saveProject"
  | "inspector.object"
  | "inspector.group"
  | "inspector.scene"
  | "inspector.selected"
  | "inspector.selectedGroup"
  | "inspector.snapNearest"
  | "inspector.snapGroup"
  | "inspector.hidePorts"
  | "inspector.showPorts"
  | "inspector.duplicate"
  | "inspector.delete"
  | "health.title";

export type I18nDictionary = Record<I18nKey, string>;

export type UnitFormatOptions = {
  locale: LocaleSettings;
  units: UnitsSettings;
};
