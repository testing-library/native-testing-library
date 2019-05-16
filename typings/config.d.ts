export interface Config {
  asyncWrapper<T>(cb: Function): Promise<T>;
}

export const getConfig: () => Config;
