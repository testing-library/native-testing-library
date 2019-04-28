export function waitForElementToBeRemoved<T>(
  callback: () => T,
  options?: {
    timeout?: number;
    interval?: number;
  },
): Promise<T>;
