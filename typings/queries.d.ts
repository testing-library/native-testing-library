import { Matcher, MatcherOptions } from './matches';
import { WaitForElementOptions } from './wait-for-element';
import { NativeTestInstance, SelectorMatcherOptions } from './query-helpers';

export type QueryByBoundProp = (
  container: NativeTestInstance,
  id: Matcher,
  options?: MatcherOptions,
) => NativeTestInstance | null;

export type AllByBoundProp = (
  container: NativeTestInstance,
  id: Matcher,
  options?: MatcherOptions,
) => NativeTestInstance[];

export type FindAllByBoundProp = (
  container: NativeTestInstance,
  id: Matcher,
  options?: MatcherOptions,
) => Promise<NativeTestInstance[]>;

export type GetByBoundProp = (
  container: NativeTestInstance,
  id: Matcher,
  options?: MatcherOptions,
) => NativeTestInstance;

export type FindByBoundProp = (
  container: NativeTestInstance,
  id: Matcher,
  options?: MatcherOptions,
  waitForElementOptions?: WaitForElementOptions,
) => Promise<NativeTestInstance>;

export type QueryByText = (
  container: NativeTestInstance,
  id: Matcher,
  options?: SelectorMatcherOptions,
) => NativeTestInstance | null;

export type AllByText = (
  container: NativeTestInstance,
  id: Matcher,
  options?: SelectorMatcherOptions,
) => NativeTestInstance[];

export type FindAllByText = (
  container: NativeTestInstance,
  id: Matcher,
  options?: MatcherOptions,
  waitForElementOptions?: WaitForElementOptions,
) => Promise<NativeTestInstance[]>;

export type GetByText = (
  container: NativeTestInstance,
  id: Matcher,
  options?: MatcherOptions,
) => NativeTestInstance;

export type FindByText = (
  container: NativeTestInstance,
  id: Matcher,
  options?: MatcherOptions,
  waitForElementOptions?: WaitForElementOptions,
) => Promise<NativeTestInstance>;

export const getByDisplayValue: GetByBoundProp;
export const getByHintText: GetByBoundProp;
export const getByLabelText: GetByBoundProp;
export const getByRole: GetByBoundProp;
export const getByPlaceholderText: GetByBoundProp;
export const getByTestId: GetByBoundProp;
export const getByText: GetByText;
export const getByTitle: GetByBoundProp;

export const getAllByDisplayValue: AllByBoundProp;
export const getAllByHintText: AllByBoundProp;
export const getAllByLabelText: AllByBoundProp;
export const getAllByRole: AllByBoundProp;
export const getAllByPlaceholderText: AllByBoundProp;
export const getAllByTestId: AllByBoundProp;
export const getAllByText: AllByText;
export const getAllByTitle: AllByBoundProp;

export const queryByDisplayValue: QueryByBoundProp;
export const queryByHintText: QueryByBoundProp;
export const queryByLabelText: QueryByBoundProp;
export const queryByRole: QueryByBoundProp;
export const queryByPlaceholderText: QueryByBoundProp;
export const queryByTestId: QueryByBoundProp;
export const queryByText: QueryByText;
export const queryByTitle: QueryByBoundProp;

export const queryAllByDisplayValue: AllByBoundProp;
export const queryAllByHintText: AllByBoundProp;
export const queryAllByLabelText: AllByBoundProp;
export const queryAllByRole: AllByBoundProp;
export const queryAllByPlaceholderText: AllByBoundProp;
export const queryAllByTestId: AllByBoundProp;
export const queryAllByText: AllByText;
export const queryAllByTitle: AllByBoundProp;

export const findByDisplayValue: FindByBoundProp;
export const findByHintText: FindByBoundProp;
export const findByLabelText: FindByBoundProp;
export const findByRole: FindByBoundProp;
export const findByPlaceholderText: FindByBoundProp;
export const findByTestId: FindByBoundProp;
export const findByText: FindByText;
export const findByTitle: FindByBoundProp;

export const findAllByDisplayValue: FindAllByBoundProp;
export const findAllByHintText: FindAllByBoundProp;
export const findAllByLabelText: FindAllByBoundProp;
export const findAllByRole: FindAllByBoundProp;
export const findAllByPlaceholderText: FindAllByBoundProp;
export const findAllByTestId: FindAllByBoundProp;
export const findAllByText: FindAllByText;
export const findAllByTitle: FindAllByBoundProp;
