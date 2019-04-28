export interface WaitForElementOptions {
  timeout?: number;
  interval?: number;
}

export function waitForElement<T>(callback: () => T, options?: WaitForElementOptions): Promise<T>;
