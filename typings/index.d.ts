import { ReactElement, ComponentType } from 'react';
import { act as reactAct } from 'react-test-renderer';

import * as queries from './queries';
import * as queryHelpers from './query-helpers';
import { NativeTestInstance } from './query-helpers';
import { NativeTestInstanceJSON } from './to-json';
import { getQueriesForElement, BoundFunction } from './get-queries-for-element';

declare const within: typeof getQueriesForElement;

interface Query extends Function {
  (container: NativeTestInstance, ...args: any[]):
    | Error
    | Promise<NativeTestInstance[]>
    | Promise<NativeTestInstance>
    | NativeTestInstance[]
    | NativeTestInstance
    | null;
}

interface Queries {
  [T: string]: Query;
}

export type RenderResult<Q extends Queries = typeof queries> = {
  baseElement: NativeTestInstance;
  container: NativeTestInstance;
  debug: (element?: NativeTestInstance) => void;
  rerender: (ui: ReactElement) => void;
  unmount: () => void;
  asJSON: () => NativeTestInstanceJSON;
} & { [P in keyof Q]: BoundFunction<Q[P]> };

export interface RenderOptions<Q extends Queries = typeof queries> {
  queries?: Q;
  wrapper?: ComponentType;
  options?: {
    debug?: DebugOptions;
  };
}

export interface DebugOptions {
  omitProps: string[];
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

export const cleanup: () => void;

export const act: typeof reactAct extends undefined
  ? (callback: () => void) => void
  : typeof reactAct;

export { queries, queryHelpers, within };
export * from './to-json';
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
export * from './wait-for-element-to-be-removed';
