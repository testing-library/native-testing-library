import { ReactTestInstance } from 'react-test-renderer';

import { Matcher, MatcherOptions } from './matches';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type SelectorMatcherOptions = Omit<MatcherOptions, 'selector'> & {
  selector?: string;
};

type ReactTestInstanceExtended = ReactTestInstance & {
  getProp: (name: string) => NativeTestInstance;
  parentNode: NativeTestInstance;
};

export type NativeTestInstance = Omit<
  ReactTestInstanceExtended,
  'findAllByProps' | 'findAllByType' | 'findByProps' | 'findByType' | 'instance'
>;

export type QueryByProp = (
  attribute: string,
  container: NativeTestInstance,
  id: Matcher,
  options?: MatcherOptions,
) => NativeTestInstance | null;

export type AllByProp = (
  attribute: string,
  container: HTMLElement,
  id: Matcher,
  options?: MatcherOptions,
) => NativeTestInstance[];

// TODO: finish types of the rest of the helpers
export const getElementError: (message: string, container: NativeTestInstance) => Error;
export const queryAllByProp: AllByProp;
export const queryByProp: QueryByProp;
export const proxyElement: (node: ReactTestInstance) => NativeTestInstance;
