import { NativeTestInstance } from './query-helpers';

export function prettyPrint(
  element: NativeTestInstance | string,
  maxLength?: number,
  options?: {
    debug: {
      omitProps: string[];
    };
  },
): string | false;
