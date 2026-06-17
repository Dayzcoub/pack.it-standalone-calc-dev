import { afterEach, describe, expect, it } from "vitest";
import { LocalStorageAdapter } from "../storage/localStorageAdapter";

const originalLocalStorage = globalThis.localStorage;

const installMockLocalStorage = (values: Record<string, string>) => {
  const keys = Object.keys(values);
  const storage = {
    get length() {
      return keys.length;
    },
    key(index: number) {
      return keys[index] ?? null;
    },
    getItem(key: string) {
      return values[key] ?? null;
    },
    setItem(key: string, value: string) {
      if (!(key in values)) {
        keys.push(key);
      }
      values[key] = value;
    },
    removeItem(key: string) {
      const index = keys.indexOf(key);
      if (index >= 0) {
        keys.splice(index, 1);
      }
      delete values[key];
    },
    clear() {
      keys.splice(0, keys.length);
      Object.keys(values).forEach((key) => delete values[key]);
    }
  } satisfies Storage;

  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: storage
  });
};

const installThrowingLocalStorage = () => {
  const storage: Storage = {
    get length(): number {
      throw new Error("localStorage unavailable");
    },
    key(): string | null {
      throw new Error("localStorage unavailable");
    },
    getItem(): string | null {
      throw new Error("localStorage unavailable");
    },
    setItem(): void {
      throw new Error("localStorage unavailable");
    },
    removeItem(): void {
      throw new Error("localStorage unavailable");
    },
    clear(): void {
      throw new Error("localStorage unavailable");
    }
  };

  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: storage
  });
};

afterEach(() => {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: originalLocalStorage
  });
});

describe("LocalStorageAdapter", () => {
  it("lists keys through the Storage key API for mobile WebView compatibility", async () => {
    installMockLocalStorage({
      "packit.project.one": "one",
      "packit.project.two": "two",
      "packit.other": "other"
    });

    const adapter = new LocalStorageAdapter();

    await expect(adapter.listKeys("packit.project.")).resolves.toEqual(["packit.project.one", "packit.project.two"]);
  });

  it("keeps values in memory when persistent localStorage is unavailable", async () => {
    installThrowingLocalStorage();

    const adapter = new LocalStorageAdapter();

    await expect(adapter.setItem("packit.project.private", "project")).resolves.toBeUndefined();
    await expect(adapter.getItem("packit.project.private")).resolves.toBe("project");
    await expect(adapter.listKeys("packit.project.")).resolves.toEqual(["packit.project.private"]);

    await adapter.removeItem("packit.project.private");

    await expect(adapter.getItem("packit.project.private")).resolves.toBeNull();
  });
});
