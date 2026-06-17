import { describe, expect, it } from "vitest";
import { dictionaries, t } from "../i18n";
import { displayUnitToMeters, formatLength, metersToDisplayUnit } from "../i18n/units";
import type { LocaleSettings, UnitsSettings } from "../project/contracts";

const enLocale: LocaleSettings = {
  locale: "en",
  measurementSystem: "metric",
  currency: "USD"
};

const ruLocale: LocaleSettings = {
  locale: "ru",
  measurementSystem: "metric",
  currency: "RUB"
};

const metricMeters: UnitsSettings = {
  sceneUnit: "m",
  displayUnit: "m",
  precision: 2
};

describe("i18n and units foundation", () => {
  it("keeps RU and EN dictionaries on the same keys", () => {
    expect(Object.keys(dictionaries.ru).sort()).toEqual(Object.keys(dictionaries.en).sort());
    expect(t("en", "action.addTruss")).toBe("Truss");
    expect(t("ru", "action.addTruss")).toBe("Фермы");
  });

  it("formats scene meters by locale without changing stored units", () => {
    expect(formatLength(7.2, { locale: enLocale, units: metricMeters })).toBe("7.20 m");
    expect(formatLength(7.2, { locale: ruLocale, units: metricMeters })).toBe("7,20 m");
  });

  it("converts meters to millimeters and back through adapters", () => {
    expect(metersToDisplayUnit(1.25, "mm")).toBe(1250);
    expect(displayUnitToMeters(1250, "mm")).toBe(1.25);
    expect(
      formatLength(1.25, {
        locale: enLocale,
        units: {
          ...metricMeters,
          displayUnit: "mm"
        }
      })
    ).toBe("1,250 mm");
  });
});
