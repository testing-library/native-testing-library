import { ReactTestRenderer } from 'react-test-renderer';

import { Matcher, MatcherOptions } from './matches';
import { WaitForElementOptions } from './wait-for-element';
import { SelectorMatcherOptions } from './query-helpers';

export type QueryByBoundProp = (
  container: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
) => ReactTestRenderer | null;

export type AllByBoundProp = (
  container: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
) => ReactTestRenderer[];

export type FindAllByBoundProp = (
  container: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
) => Promise<ReactTestRenderer[]>;

export type GetByBoundProp = (
  container: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
) => ReactTestRenderer;

export type FindByBoundProp = (
  container: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
  waitForElementOptions?: WaitForElementOptions,
) => Promise<ReactTestRenderer>;

export type QueryByText = (
  container: ReactTestRenderer,
  id: Matcher,
  options?: SelectorMatcherOptions,
) => ReactTestRenderer | null;

export type AllByText = (
  container: ReactTestRenderer,
  id: Matcher,
  options?: SelectorMatcherOptions,
) => ReactTestRenderer[];

export type FindAllByText = (
  container: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
  waitForElementOptions?: WaitForElementOptions,
) => Promise<ReactTestRenderer[]>;

export type GetByText = (
  container: ReactTestRenderer,
  id: Matcher,
  options?: WaitForElementOptions,
) => ReactTestRenderer;

export type FindByText = (
  container: ReactTestRenderer,
  id: Matcher,
  options?: MatcherOptions,
  waitForElementOptions?: WaitForElementOptions,
) => Promise<ReactTestRenderer>;

export const getByA11yHint: GetByBoundProp;
export const getByA11yLabel: GetByBoundProp;
export const getByA11yRole: GetByBoundProp;
export const getByA11yStates: GetByBoundProp;
export const getByA11yTraits: GetByBoundProp;
export const getByPlaceholder: GetByBoundProp;
export const getByTestId: GetByBoundProp;
export const getByText: GetByText;

export const getAllByA11yHint: AllByBoundProp;
export const getAllByA11yLabel: AllByBoundProp;
export const getAllByA11yRole: AllByBoundProp;
export const getAllByA11yStates: AllByBoundProp;
export const getAllByA11yTraits: AllByBoundProp;
export const getAllByPlaceholder: AllByBoundProp;
export const getAllByTestId: AllByBoundProp;
export const getAllByText: AllByText;

export const queryByA11yHint: QueryByBoundProp;
export const queryByA11yLabel: QueryByBoundProp;
export const queryByA11yRole: QueryByBoundProp;
export const queryByA11yStates: QueryByBoundProp;
export const queryByA11yTraits: QueryByBoundProp;
export const queryByPlaceholder: QueryByBoundProp;
export const queryByTestId: QueryByBoundProp;
export const queryByText: QueryByText;

export const queryAllByA11yHint: AllByBoundProp;
export const queryAllByA11yLabel: AllByBoundProp;
export const queryAllByA11yRole: AllByBoundProp;
export const queryAllByA11yStates: AllByBoundProp;
export const queryAllByA11yTraits: AllByBoundProp;
export const queryAllByPlaceholder: AllByBoundProp;
export const queryAllByTestId: AllByBoundProp;
export const queryAllByText: AllByText;

export const findByA11yHint: FindByBoundProp;
export const findByA11yLabel: FindByBoundProp;
export const findByA11yRole: FindByBoundProp;
export const findByA11yStates: FindByBoundProp;
export const findByA11yTraits: FindByBoundProp;
export const findByPlaceholder: FindByBoundProp;
export const findByTestId: FindByBoundProp;
export const findByText: FindByText;

export const findAllByA11yHint: FindAllByBoundProp;
export const findAllByA11yLabel: FindAllByBoundProp;
export const findAllByA11yRole: FindAllByBoundProp;
export const findAllByA11yStates: FindAllByBoundProp;
export const findAllByA11yTraits: FindAllByBoundProp;
export const findAllByPlaceholder: FindAllByBoundProp;
export const findAllByTestId: FindAllByBoundProp;
export const findAllByText: FindAllByText;
