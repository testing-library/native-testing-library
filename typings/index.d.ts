import { ReactElement, ComponentType } from 'react';
import { ReactTestRenderer } from 'react-test-renderer';

import { getQueriesForElement, BoundFunction } from './get-queries-for-element';
import * as queries from './queries';
import * as queryHelpers from './query-helpers';
import { NativeTestInstance } from './query-helpers';

declare const within: typeof getQueriesForElement;

interface Query extends Function {
  (container: ReactTestRenderer, ...args: any[]):
    | Error
    | Promise<HTMLElement[]>
    | Promise<HTMLElement>
    | HTMLElement[]
    | HTMLElement
    | null;
}

interface Queries {
  [T: string]: Query;
}

export type RenderResult<Q extends Queries = typeof queries> = {
  container: ReactTestRenderer;
  baseElement: NativeTestInstance;
  debug: () => void;
  rerender: (ui: ReactElement) => void;
  unmount: () => void;
} & { [P in keyof Q]: BoundFunction<Q[P]> };

export interface RenderOptions<Q extends Queries = typeof queries> {
  queries?: Q;
  wrapper?: ComponentType;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function render(
  ui: ReactElement<any>,
  options?: Omit<RenderOptions, 'queries'>,
): RenderResult;
export function render<Q extends Queries>(
  ui: ReactElement<any>,
  options: RenderOptions<Q>,
): RenderResult<Q>;

export const act: (callback: () => void) => void;

export { queries, queryHelpers, within };
export * from './config';
export * from './events';
export * from './get-node-text';
export * from './get-queries-for-element';
export * from './matches';
export * from './pretty-print';
export * from './queries';
export * from './query-helpers';
export * from './wait';
export * from './wait-for-element';
