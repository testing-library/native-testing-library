import { NativeTestInstance } from './query-helpers';

export interface NativeTestInstanceJSON {
  type: string;
  props: { [propName: string]: any };
  children: null | Array<NativeTestInstanceJSON>;
  $$typeof?: Symbol;
}

export const toJSON: (node: NativeTestInstance) => NativeTestInstanceJSON;
