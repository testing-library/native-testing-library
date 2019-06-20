import { ReactTestRenderer } from 'react-test-renderer';

import * as queries from './queries';
import { NativeTestInstance } from './query-helpers';

export type BoundFunction<T> = T extends (
  attribute: string,
  element: ReactTestRenderer,
  text: infer P,
  options: infer Q,
) => infer R
  ? (text: P, options?: Q) => R
  : T extends (a1: any, text: infer P, options: infer Q) => infer R
  ? (text: P, options?: Q) => R
  : never;
export type BoundFunctions<T> = { [P in keyof T]: BoundFunction<T[P]> };

interface Query extends Function {
  (testRenderer: ReactTestRenderer, ...args: any[]):
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

export function getQueriesForElement<T extends Queries = typeof queries>(
  element: ReactTestRenderer,
  queriesToBind?: T,
): BoundFunctions<T>;
