import { ReactElement, ComponentType } from 'react'
import { ReactTestInstance, ReactTestRenderer, act } from 'react-test-renderer'
import { OptionsReceived } from 'pretty-format'
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
} from 'react-native'

// EVENTS
// ------

type EventInit<T> = Partial<NativeSyntheticEvent<T>> & { validTargets?: string[] }

export declare class NativeEvent {
  constructor(type: 'focus', init?: EventInit<TextInputFocusEventData>)
  constructor(type: 'blur', init?: EventInit<TextInputFocusEventData>)
  constructor(type: 'change', init?: EventInit<TextInputChangeEventData>)
  constructor(type: 'changeText', value: string)
  constructor(type: 'contentSizeChange', init?: EventInit<TextInputContentSizeChangeEventData>)
  constructor(type: 'endEditing', init?: EventInit<TextInputEndEditingEventData>)
  constructor(type: 'keyPress', init?: EventInit<TextInputKeyPressEventData>)
  constructor(type: 'submitEditing', init?: EventInit<TextInputSubmitEditingEventData>)
  constructor(type: 'layout', init?: EventInit<LayoutChangeEvent['nativeEvent']>)
  constructor(type: 'selectionChange', init?: EventInit<TextInputSelectionChangeEventData>)
  constructor(type: 'longPress', init?: EventInit<GestureResponderEvent>)
  constructor(type: 'press', init?: EventInit<GestureResponderEvent>)
  constructor(type: 'pressIn', init?: EventInit<GestureResponderEvent>)
  constructor(type: 'pressOut', init?: EventInit<GestureResponderEvent>)
  constructor(type: 'momentumScrollBegin', init?: EventInit<ScrollResponderEvent>)
  constructor(type: 'momentumScrollEnd', init?: EventInit<ScrollResponderEvent>)
  constructor(type: 'scroll', init?: EventInit<ScrollResponderEvent>)
  constructor(type: 'scrollBeginDrag', init?: EventInit<ScrollResponderEvent>)
  constructor(type: 'scrollEndDrag', init?: EventInit<ScrollResponderEvent>)
  constructor(type: 'load', init?: EventInit<ImageLoadEventData>)
  constructor(type: 'error', init?: EventInit<ImageErrorEventData>)
  constructor(type: 'progress', init?: EventInit<ImageProgressEventDataIOS>)
}

export declare function getEventHandlerName(key: string): string

export interface FireEventFn {
  (element: NativeTestInstance, event: NativeEvent): any
  focus(element: NativeTestInstance, init?: EventInit<TextInputFocusEventData>): any
  blur(element: NativeTestInstance, init?: EventInit<TextInputFocusEventData>): any
  change(element: NativeTestInstance, init?: EventInit<TextInputChangeEventData>): any
  changeText(element: NativeTestInstance, value: string): any
  contentSizeChange(element: NativeTestInstance, init?: EventInit<TextInputContentSizeChangeEventData>): any
  endEditing(element: NativeTestInstance, init?: EventInit<TextInputEndEditingEventData>): any
  keyPress(element: NativeTestInstance, init?: EventInit<TextInputKeyPressEventData>): any
  submitEditing(element: NativeTestInstance, init?: EventInit<TextInputSubmitEditingEventData>): any
  layout(element: NativeTestInstance, init?: EventInit<LayoutChangeEvent['nativeEvent']>): any
  selectionChange(element: NativeTestInstance, init?: EventInit<TextInputSelectionChangeEventData>): any
  longPress(element: NativeTestInstance, init?: EventInit<GestureResponderEvent>): any
  press(element: NativeTestInstance, init?: EventInit<GestureResponderEvent>): any
  pressIn(element: NativeTestInstance, init?: EventInit<GestureResponderEvent>): any
  pressOut(element: NativeTestInstance, init?: EventInit<GestureResponderEvent>): any
  momentumScrollBegin(element: NativeTestInstance, init?: EventInit<ScrollResponderEvent>): any
  momentumScrollEnd(element: NativeTestInstance, init?: EventInit<ScrollResponderEvent>): any
  scroll(element: NativeTestInstance, init?: EventInit<ScrollResponderEvent>): any
  scrollBeginDrag(element: NativeTestInstance, init?: EventInit<ScrollResponderEvent>): any
  scrollEndDrag(element: NativeTestInstance, init?: EventInit<ScrollResponderEvent>): any
  load(element: NativeTestInstance, init?: EventInit<ImageLoadEventData>): any
  error(element: NativeTestInstance, init?: EventInit<ImageErrorEventData>): any
  progress(element: NativeTestInstance, init?: EventInit<ImageProgressEventDataIOS>): any
}

export declare const fireEvent: FireEventFn

// GET NODE TEXT
// -------------

export declare function getNodeText(node: NativeTestInstance): string

// GET QUERIES FOR ELEMENT
// -----------------------

export declare function getQueriesForElement<T = Queries>(element: ReactElement, queries?: T): BoundQueries<T>
export declare function within<T = Queries>(element: ReactElement, queries?: T): BoundQueries<T>

// PREETY PRINT
// ------------

export declare function prettyPrint(element: ReactTestRenderer | NativeTestInstance | string, maxLength?: number, options?: OptionsReceived): string

// QUERIES
// -------

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Bound<T> = T extends (arg: any, ...rest: infer U) => infer V ? (...args: U) => V : never
type BoundQueries<T> = { [P in keyof T]: Bound<T[P]> }

export type NativeTestInstance = Omit<ReactTestInstance, 'find' | 'findAllByProps' | 'findAllByType' | 'findByProps' | 'findByType' | 'instance'>

export type TextMatch = string | RegExp | ((value: string) => boolean)
export type FilterFn = (value: string, index: number) => boolean
export type NormalizerFn = (input: string) => string

export interface NormalizerOptions {
  exact?: boolean,
  trim?: boolean,
  collapseWhitespace?: boolean,
  filter?: FilterFn,
  normalizer?: NormalizerFn,
}

export interface TextNormalizerOptions extends NormalizerOptions {
  types?: string[]
}

export declare function getByA11yHint(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance
export declare function getByA11yLabel(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance
export declare function getByA11yRole(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance
export declare function getByA11yStates(container: NativeTestInstance, match: string[], options?: NormalizerOptions): NativeTestInstance
export declare function getByA11yTraits(container: NativeTestInstance, match: string[], options?: NormalizerOptions): NativeTestInstance
export declare function getByPlaceholder(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance
export declare function getByText(container: NativeTestInstance, match: TextMatch, options?: TextNormalizerOptions): NativeTestInstance
export declare function getByValue(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance
export declare function getByTestId(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance

export declare function getAllByA11yHint(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance[]
export declare function getAllByA11yLabel(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance[]
export declare function getAllByA11yRole(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance[]
export declare function getAllByA11yStates(container: NativeTestInstance, match: string[], options?: NormalizerOptions): NativeTestInstance[]
export declare function getAllByA11yTraits(container: NativeTestInstance, match: string[], options?: NormalizerOptions): NativeTestInstance[]
export declare function getAllByPlaceholder(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance[]
export declare function getAllByText(container: NativeTestInstance, match: TextMatch, options?: TextNormalizerOptions): NativeTestInstance[]
export declare function getAllByValue(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance[]
export declare function getAllByTestId(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance[]

export declare function queryByA11yHint(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance | null
export declare function queryByA11yLabel(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance | null
export declare function queryByA11yRole(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance | null
export declare function queryByA11yStates(container: NativeTestInstance, match: string[], options?: NormalizerOptions): NativeTestInstance | null
export declare function queryByA11yTraits(container: NativeTestInstance, match: string[], options?: NormalizerOptions): NativeTestInstance | null
export declare function queryByPlaceholder(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance | null
export declare function queryByText(container: NativeTestInstance, match: TextMatch, options?: TextNormalizerOptions): NativeTestInstance | null
export declare function queryByValue(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance | null
export declare function queryByTestId(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): NativeTestInstance | null

export declare function findByA11yHint(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): Promise<NativeTestInstance>
export declare function findByA11yLabel(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): Promise<NativeTestInstance>
export declare function findByA11yRole(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): Promise<NativeTestInstance>
export declare function findByA11yStates(container: NativeTestInstance, match: string[], options?: NormalizerOptions): Promise<NativeTestInstance>
export declare function findByA11yTraits(container: NativeTestInstance, match: string[], options?: NormalizerOptions): Promise<NativeTestInstance>
export declare function findByPlaceholder(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): Promise<NativeTestInstance>
export declare function findByText(container: NativeTestInstance, match: TextMatch, options?: TextNormalizerOptions): Promise<NativeTestInstance>
export declare function findByValue(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): Promise<NativeTestInstance>
export declare function findByTestId(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): Promise<NativeTestInstance>

export declare function findAllByA11yHint(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): Promise<NativeTestInstance[]>
export declare function findAllByA11yLabel(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): Promise<NativeTestInstance[]>
export declare function findAllByA11yRole(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): Promise<NativeTestInstance[]>
export declare function findAllByA11yStates(container: NativeTestInstance, match: string[], options?: NormalizerOptions): Promise<NativeTestInstance[]>
export declare function findAllByA11yTraits(container: NativeTestInstance, match: string[], options?: NormalizerOptions): Promise<NativeTestInstance[]>
export declare function findAllByPlaceholder(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): Promise<NativeTestInstance[]>
export declare function findAllByText(container: NativeTestInstance, match: TextMatch, options?: TextNormalizerOptions): Promise<NativeTestInstance[]>
export declare function findAllByValue(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): Promise<NativeTestInstance[]>
export declare function findAllByTestId(container: NativeTestInstance, match: TextMatch, options?: NormalizerOptions): Promise<NativeTestInstance[]>

export interface Queries {
  getByA11yHint: typeof getByA11yHint
  getByA11yLabel: typeof getByA11yLabel
  getByA11yRole: typeof getByA11yRole
  getByA11yStates: typeof getByA11yStates
  getByA11yTraits: typeof getByA11yTraits
  getByPlaceholder: typeof getByPlaceholder
  getByText: typeof getByText
  getByValue: typeof getByA11yHint
  getByTestId: typeof getByTestId

  getAllByA11yHint: typeof getAllByA11yHint
  getAllByA11yLabel: typeof getAllByA11yLabel
  getAllByA11yRole: typeof getAllByA11yRole
  getAllByA11yStates: typeof getAllByA11yStates
  getAllByA11yTraits: typeof getAllByA11yTraits
  getAllByPlaceholder: typeof getAllByPlaceholder
  getAllByText: typeof getAllByText
  getAllByValue: typeof getAllByA11yHint
  getAllByTestId: typeof getAllByTestId

  queryByA11yHint: typeof queryByA11yHint
  queryByA11yLabel: typeof queryByA11yLabel
  queryByA11yRole: typeof queryByA11yRole
  queryByA11yStates: typeof queryByA11yStates
  queryByA11yTraits: typeof queryByA11yTraits
  queryByPlaceholder: typeof queryByPlaceholder
  queryByText: typeof queryByText
  queryByValue: typeof queryByA11yHint
  queryByTestId: typeof queryByTestId

  findByA11yHint: typeof findByA11yHint
  findByA11yLabel: typeof findByA11yLabel
  findByA11yRole: typeof findByA11yRole
  findByA11yStates: typeof findByA11yStates
  findByA11yTraits: typeof findByA11yTraits
  findByPlaceholder: typeof findByPlaceholder
  findByText: typeof findByText
  findByValue: typeof findByA11yHint
  findByTestId: typeof findByTestId

  findAllByA11yHint: typeof findAllByA11yHint
  findAllByA11yLabel: typeof findAllByA11yLabel
  findAllByA11yRole: typeof findAllByA11yRole
  findAllByA11yStates: typeof findAllByA11yStates
  findAllByA11yTraits: typeof findAllByA11yTraits
  findAllByPlaceholder: typeof findAllByPlaceholder
  findAllByText: typeof findAllByText
  findAllByValue: typeof findAllByA11yHint
  findAllByTestId: typeof findAllByTestId
}

// QUERY HELPERS
// -------------

export declare function defaultFilter(node: NativeTestInstance): boolean
export declare function getBaseElement(container: ReactTestRenderer | ReactTestInstance): ReactTestInstance
export declare function getElementError(message: string, container: ReactTestRenderer): Error
export declare function firstResultOrNull<T extends any[], U>(query: (...args: T) => U[], ...args: T): U | null
export declare function filterNodeByType(node: NativeTestInstance, type: string): boolean
export declare function queryAllByProp(
  attribute: string,
  container: ReactTestRenderer,
  match: TextMatch,
  options?: NormalizerOptions,
): NativeTestInstance[]
export declare function queryByProp(
  attribute: string,
  container: ReactTestRenderer,
  match: TextMatch,
  options?: NormalizerOptions,
): NativeTestInstance | null
export function removeBadProperties(node: ReactTestInstance): NativeTestInstance

// WAIT
// ----

export interface WaitOptions {
  timeout?: number
  interval?: number
}
export declare function wait(callback?: () => void, options?: WaitOptions): Promise<void>

// WAIT FOR ELEMENT
// ----------------

export interface WaitOptions {
  timeout?: number
  interval?: number
}
export declare function waitForElement<T>(callback: () => T, options?: WaitOptions): Promise<T>

// WAIT FOR ELEMENT TO BE REMOVED
// ------------------------------

export interface WaitOptions {
  timeout?: number
  interval?: number
}
export declare function waitForElementToBeRemoved(callback: () => any, options?: WaitOptions): Promise<null>

// MATCHES
// -------

export interface DefaultNormalizerOptions {
  trim?: boolean,
  collapseWhitespace?: boolean,
}
export declare function getDefaultNormalizer(options: DefaultNormalizerOptions): NormalizerFn

// INDEX
// -----

export interface RenderOptions {
  wrapper?: ComponentType<{ children: ReactElement }>
}
export interface RenderOptionsWithQueries<T> extends RenderOptions {
  queries?: T
}

export declare function render(ui: ReactElement, options?: RenderOptions): RenderResult & BoundQueries<Queries>
export declare function render<T>(ui: ReactElement, options: RenderOptionsWithQueries<T>): RenderResult & BoundQueries<T>

export interface RenderResult {
  container: ReactTestRenderer
  baseElement: NativeTestInstance
  debug: () => void
  rerender: (ui: ReactElement) => void
  unmount: () => void
}

export interface RenderHookOptions<T> extends RenderOptions {
  initialProps?: T
}

export declare function renderHook<T, U>(callback: (props: T) => U, options?: RenderHookOptions<T>): RenderHookResult<T, U>

export interface RenderHookResult<T, U> {
  result: {
    current: U
  }
  error?: Error
  waitForNextUpdate: () => Promise<void>
  rerender: (newProps?: T) => void
  unmount: () => void
}

export { act }
