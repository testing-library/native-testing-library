import { getQueriesForElement } from './get-queries-for-element';
import * as queries from './queries';
import * as queryHelpers from './query-helpers';

export * from './config';
export * from './to-json';
export * from './queries';
export * from './wait';
export * from './wait-for-element';
export * from './wait-for-element-to-be-removed';
export { getDefaultNormalizer } from './matches';
export * from './get-node-text';
export * from './events';
export * from './get-queries-for-element';
export * from './query-helpers';
export * from './pretty-print';

export {
  getQueriesForElement as within,
  // export query utils under a namespace for convenience:
  queries,
  queryHelpers,
};
