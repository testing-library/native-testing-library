import { ReactTestRenderer } from 'react-test-renderer';

import { NativeTestInstance } from './query-helpers';

export function prettyPrint(
  element: ReactTestRenderer | NativeTestInstance | string,
  maxLength?: number,
): string | false;
