import { ReactTestRenderer } from 'react-test-renderer';

import { Matcher, MatcherOptions } from './matches';
import { WaitForElementOptions } from './wait-for-element';
import { NativeTestInstance, SelectorMatcherOptions } from './query-helpers';

export type QueryByBoundProp = (
  testRenderer: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
) => NativeTestInstance | null;

export type AllByBoundProp = (
  testRenderer: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
) => NativeTestInstance[];

export type FindAllByBoundProp = (
  testRenderer: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
) => Promise<NativeTestInstance[]>;

export type GetByBoundProp = (
  testRenderer: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
) => NativeTestInstance;

export type FindByBoundProp = (
  testRenderer: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
  waitForElementOptions?: WaitForElementOptions,
) => Promise<NativeTestInstance>;

export type QueryByText = (
  testRenderer: ReactTestRenderer,
  id: Matcher,
  options?: SelectorMatcherOptions,
) => NativeTestInstance | null;

export type AllByText = (
  testRenderer: ReactTestRenderer,
  id: Matcher,
  options?: SelectorMatcherOptions,
) => NativeTestInstance[];

export type FindAllByText = (
  testRenderer: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
  waitForElementOptions?: WaitForElementOptions,
) => Promise<NativeTestInstance[]>;

export type GetByText = (
  testRenderer: ReactTestRenderer,
  id: Matcher,
  options?: WaitForElementOptions,
) => NativeTestInstance;

export type FindByText = (
  testRenderer: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
  waitForElementOptions?: WaitForElementOptions,
) => Promise<NativeTestInstance>;

export const getByHintText: GetByBoundProp;
export const getByLabelText: GetByBoundProp;
export const getByRole: GetByBoundProp;
export const getByA11yStates: GetByBoundProp;
export const getByA11yTraits: GetByBoundProp;
export const getByPlaceholderText: GetByBoundProp;
export const getByTestId: GetByBoundProp;
export const getByText: GetByText;

export const getAllByHintText: AllByBoundProp;
export const getAllByLabelText: AllByBoundProp;
export const getAllByRole: AllByBoundProp;
export const getAllByA11yStates: AllByBoundProp;
export const getAllByA11yTraits: AllByBoundProp;
export const getAllByPlaceholderText: AllByBoundProp;
export const getAllByTestId: AllByBoundProp;
export const getAllByText: AllByText;

export const queryByHintText: QueryByBoundProp;
export const queryByLabelText: QueryByBoundProp;
export const queryByRole: QueryByBoundProp;
export const queryByA11yStates: QueryByBoundProp;
export const queryByA11yTraits: QueryByBoundProp;
export const queryByPlaceholderText: QueryByBoundProp;
export const queryByTestId: QueryByBoundProp;
export const queryByText: QueryByText;

export const queryAllByHintText: AllByBoundProp;
export const queryAllByLabelText: AllByBoundProp;
export const queryAllByRole: AllByBoundProp;
export const queryAllByA11yStates: AllByBoundProp;
export const queryAllByA11yTraits: AllByBoundProp;
export const queryAllByPlaceholderText: AllByBoundProp;
export const queryAllByTestId: AllByBoundProp;
export const queryAllByText: AllByText;

export const findByHintText: FindByBoundProp;
export const findByLabelText: FindByBoundProp;
export const findByRole: FindByBoundProp;
export const findByA11yStates: FindByBoundProp;
export const findByA11yTraits: FindByBoundProp;
export const findByPlaceholderText: FindByBoundProp;
export const findByTestId: FindByBoundProp;
export const findByText: FindByText;

export const findAllByHintText: FindAllByBoundProp;
export const findAllByLabelText: FindAllByBoundProp;
export const findAllByRole: FindAllByBoundProp;
export const findAllByA11yStates: FindAllByBoundProp;
export const findAllByA11yTraits: FindAllByBoundProp;
export const findAllByPlaceholderText: FindAllByBoundProp;
export const findAllByTestId: FindAllByBoundProp;
export const findAllByText: FindAllByText;
