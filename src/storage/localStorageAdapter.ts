import type { StorageAdapter } from "./storageAdapter";

export class LocalStorageAdapter implements StorageAdapter {
  private readonly memoryFallback = new Map<string, string>();

  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key) ?? this.memoryFallback.get(key) ?? null;
    } catch {
      return this.memoryFallback.get(key) ?? null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    this.memoryFallback.set(key, value);

    try {
      localStorage.setItem(key, value);
    } catch {
      // Safari private mode and some embedded WebViews can reject localStorage writes.
      // Keep the project available for the current app session instead of blocking creation.
    }
  }

  async removeItem(key: string): Promise<void> {
    this.memoryFallback.delete(key);

    try {
      localStorage.removeItem(key);
    } catch {
      // Keep deletion effective for the current session even if persistent storage is unavailable.
    }
  }

  async listKeys(prefix: string): Promise<string[]> {
    const keys = new Set<string>();

    this.memoryFallback.forEach((_, key) => {
      if (key.startsWith(prefix)) {
        keys.add(key);
      }
    });

    try {
      for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);

        if (key?.startsWith(prefix)) {
          keys.add(key);
        }
      }
    } catch {
      return [...keys];
    }

    return [...keys];
  }
}
