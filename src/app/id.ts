let fallbackCounter = 0;

const randomHex = () => {
  const cryptoApi = globalThis.crypto;

  if (cryptoApi?.getRandomValues) {
    const values = new Uint32Array(2);
    cryptoApi.getRandomValues(values);
    return Array.from(values, (value) => value.toString(16).padStart(8, "0")).join("");
  }

  fallbackCounter += 1;
  return `${Date.now().toString(16)}${fallbackCounter.toString(16)}${Math.random().toString(16).slice(2)}`;
};

export const createId = (prefix: string) => {
  const cryptoApi = globalThis.crypto;
  const uuid = typeof cryptoApi?.randomUUID === "function" ? cryptoApi.randomUUID() : randomHex();

  return `${prefix}-${uuid}`;
};
