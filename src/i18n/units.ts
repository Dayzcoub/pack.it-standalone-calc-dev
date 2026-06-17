import type { UnitFormatOptions } from "./types";

const localeForNumberFormat = {
  en: "en-US",
  ru: "ru-RU"
} as const;

const unitFactor = {
  m: 1,
  cm: 100,
  mm: 1000
} as const;

export const metersToDisplayUnit = (meters: number, displayUnit: keyof typeof unitFactor): number =>
  meters * unitFactor[displayUnit];

export const displayUnitToMeters = (value: number, displayUnit: keyof typeof unitFactor): number =>
  value / unitFactor[displayUnit];

export const formatLength = (meters: number, options: UnitFormatOptions): string => {
  const unit = options.units.displayUnit;
  const value = metersToDisplayUnit(meters, unit);
  const fractionDigits = unit === "m" ? options.units.precision : 0;
  const formatter = new Intl.NumberFormat(localeForNumberFormat[options.locale.locale], {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits
  });

  return `${formatter.format(value)} ${unit}`;
};
