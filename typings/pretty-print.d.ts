import { NativeTestInstance } from './query-helpers';
import { DebugOptions } from '.';

export function prettyPrint(
  element: NativeTestInstance | string,
  maxLength?: number,
  options?: {
    debug: DebugOptions;
  },
): string | false;
