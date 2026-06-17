import { afterEach, describe, expect, it } from "vitest";
import { createInitialProject } from "../app/createInitialProject";
import { createId } from "../app/id";

const originalCrypto = globalThis.crypto;

afterEach(() => {
  Object.defineProperty(globalThis, "crypto", {
    configurable: true,
    value: originalCrypto
  });
});

describe("createId", () => {
  it("falls back when crypto.randomUUID is unavailable in non-secure mobile browsers", () => {
    Object.defineProperty(globalThis, "crypto", {
      configurable: true,
      value: {
        getRandomValues(values: Uint32Array) {
          values[0] = 0x12345678;
          values[1] = 0x90abcdef;
          return values;
        }
      }
    });

    expect(createId("project")).toBe("project-1234567890abcdef");
    expect(createInitialProject("LAN project").id).toMatch(/^project-/);
  });
});
