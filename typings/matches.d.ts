import { NativeTestInstance } from './query-helpers';

export type MatcherFunction = (content: string, element: HTMLElement) => boolean;
export type Matcher = boolean | string | RegExp | MatcherFunction;

export type NormalizerFn = (text: string) => string;
export type SelectorFn = (element: NativeTestInstance) => boolean;

export interface MatcherOptions {
  exact?: boolean;
  /** Use normalizer with getDefaultNormalizer instead */
  trim?: boolean;
  /** Use normalizer with getDefaultNormalizer instead */
  collapseWhitespace?: boolean;
  selector?: SelectorFn;
  normalizer?: NormalizerFn;
}

export type Match = (
  textToMatch: string,
  node: HTMLElement | null,
  matcher: Matcher,
  options?: MatcherOptions,
) => boolean;

export interface DefaultNormalizerOptions {
  trim?: boolean;
  collapseWhitespace?: boolean;
}

export declare function getDefaultNormalizer(options?: DefaultNormalizerOptions): NormalizerFn;

// N.B. Don't expose fuzzyMatches + matches here: they're not public API
