import { NativeTestInstance } from './query-helpers';

export type EventType =
  | 'focus'
  | 'blur'
  | 'change'
  | 'changeText'
  | 'valueChange'
  | 'contentSizeChange'
  | 'endEditing'
  | 'keyPress'
  | 'submitEditing'
  | 'layout'
  | 'selectionChange'
  | 'longPress'
  | 'press'
  | 'pressIn'
  | 'pressOut'
  | 'momentumScrollBegin'
  | 'momentumScrollEnd'
  | 'scroll'
  | 'scrollBeginDrag'
  | 'scrollEndDrag'
  | 'load'
  | 'error'
  | 'progress'
  | 'custom';

export declare class NativeTestEvent {
  constructor(typeArg: string, ...params: any[]);
}

export type FireFunction = (element: NativeTestInstance, event: NativeTestEvent) => boolean;
export type FireObject = {
  [K in EventType]: (element: NativeTestInstance, options?: {}) => boolean
};

export const getEventHandlerName: (key: string) => string;
export const fireEvent: FireFunction & FireObject;
