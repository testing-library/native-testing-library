import { NativeTestInstance } from './query-helpers';

import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputChangeEventData,
  TextInputContentSizeChangeEventData,
  TextInputEndEditingEventData,
  TextInputKeyPressEventData,
  TextInputSubmitEditingEventData,
  LayoutChangeEvent,
  TextInputSelectionChangeEventData,
  GestureResponderEvent,
  ScrollResponderEvent,
  ImageLoadEventData,
  ImageErrorEventData,
  ImageProgressEventDataIOS,
} from 'react-native';

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

type EventInit<T> = Partial<NativeSyntheticEvent<T>> & { validTargets?: string[] };

export declare class NativeEvent {
  constructor(type: 'focus', init?: EventInit<TextInputFocusEventData>);
  constructor(type: 'blur', init?: EventInit<TextInputFocusEventData>);
  constructor(type: 'change', init?: EventInit<TextInputChangeEventData>);
  constructor(type: 'valueChange', value: string);
  constructor(type: 'changeText', value: string);
  constructor(type: 'contentSizeChange', init?: EventInit<TextInputContentSizeChangeEventData>);
  constructor(type: 'endEditing', init?: EventInit<TextInputEndEditingEventData>);
  constructor(type: 'keyPress', init?: EventInit<TextInputKeyPressEventData>);
  constructor(type: 'submitEditing', init?: EventInit<TextInputSubmitEditingEventData>);
  constructor(type: 'layout', init?: EventInit<LayoutChangeEvent['nativeEvent']>);
  constructor(type: 'selectionChange', init?: EventInit<TextInputSelectionChangeEventData>);
  constructor(type: 'longPress', init?: EventInit<GestureResponderEvent>);
  constructor(type: 'press', init?: EventInit<GestureResponderEvent>);
  constructor(type: 'pressIn', init?: EventInit<GestureResponderEvent>);
  constructor(type: 'pressOut', init?: EventInit<GestureResponderEvent>);
  constructor(type: 'momentumScrollBegin', init?: EventInit<ScrollResponderEvent>);
  constructor(type: 'momentumScrollEnd', init?: EventInit<ScrollResponderEvent>);
  constructor(type: 'scroll', init?: EventInit<ScrollResponderEvent>);
  constructor(type: 'scrollBeginDrag', init?: EventInit<ScrollResponderEvent>);
  constructor(type: 'scrollEndDrag', init?: EventInit<ScrollResponderEvent>);
  constructor(type: 'load', init?: EventInit<ImageLoadEventData>);
  constructor(type: 'error', init?: EventInit<ImageErrorEventData>);
  constructor(type: 'progress', init?: EventInit<ImageProgressEventDataIOS>);
}

export type FireFunction = (element: NativeTestInstance, event: NativeEvent) => boolean;
export type FireObject = {
  [K in EventType]: (element: NativeTestInstance, options?: {}) => boolean
};

export const getEventHandlerName: (key: string) => string;
export const fireEvent: FireFunction & FireObject;
