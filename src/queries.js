import React from 'react';
import { Text, TextInput } from 'react-native';

import { getNodeText } from './get-node-text';
import { waitForElement } from './wait-for-element';
import { fuzzyMatches, makeNormalizer, matches } from './matches';
import {
  getElementError,
  firstResultOrNull,
  queryAllByProp,
  queryByProp,
  removeBadProperties,
} from './query-helpers';

/*
 |--------------------------------------------------------------------------
 | Get all by...
 |--------------------------------------------------------------------------
 */
function getAllByA11yHint(container, text, ...rest) {
  const els = queryAllByA11yHint(container, text, ...rest);
  if (!els.length) {
    throw getElementError(`Unable to find an element by accessibilityHint="${text}"`, container);
  }
  return els;
}

function getAllByA11yLabel(container, text, ...rest) {
  const els = queryAllByA11yLabel(container, text, ...rest);
  if (!els.length) {
    throw getElementError(`Unable to find an element by accessibilityLabel="${text}"`, container);
  }
  return els;
}

function getAllByA11yRole(container, value, ...rest) {
  const els = queryAllByA11yRole(container, value, ...rest);
  if (!els.length) {
    throw getElementError(`Unable to find an element by accessibilityRole="${value}".`, container);
  }
  return els;
}

function getAllByA11yStates(container, value, ...rest) {
  const els = queryAllByA11yStates(container, value, ...rest);
  if (!els.length) {
    throw getElementError(
      `Unable to find an element by accessibilityStates="${value}".`,
      container,
    );
  }
  return els;
}

function getAllByA11yTraits(container, value, ...rest) {
  const els = queryAllByA11yTraits(container, value, ...rest);
  if (!els.length) {
    throw getElementError(
      `Unable to find an element by accessibilityStates="${value}".`,
      container,
    );
  }
  return els;
}

function getAllByPlaceholder(container, text, ...rest) {
  const els = queryAllByPlaceholder(container, text, ...rest);
  if (!els.length) {
    throw getElementError(
      `Unable to find an element with the placeholder text of: ${text}`,
      container,
    );
  }
  return els;
}

function getAllByTestId(container, id, ...rest) {
  const els = queryAllByTestId(container, id, ...rest);
  if (!els.length) {
    throw getElementError(`Unable to find an element with the testID: ${id}`, container);
  }
  return els;
}

function getAllByText(container, text, ...rest) {
  const els = queryAllByText(container, text, ...rest);
  if (!els.length) {
    throw getElementError(
      `Unable to find an element with the text: ${text}. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.`,
      container,
    );
  }
  return els;
}

function getAllByValue(container, value, ...rest) {
  const els = queryAllByValue(container, value, ...rest);
  if (!els.length) {
    throw getElementError(`Unable to find an element with the value: ${value}.`, container);
  }
  return els;
}

/*
 |--------------------------------------------------------------------------
 | Get by...
 |--------------------------------------------------------------------------
 */
function getByA11yHint(...args) {
  return firstResultOrNull(getAllByA11yHint, ...args);
}

function getByA11yLabel(...args) {
  return firstResultOrNull(getAllByA11yLabel, ...args);
}

function getByPlaceholder(...args) {
  return firstResultOrNull(getAllByPlaceholder, ...args);
}

function getByA11yRole(...args) {
  return firstResultOrNull(getAllByA11yRole, ...args);
}

function getByA11yStates(...args) {
  return firstResultOrNull(getAllByA11yStates, ...args);
}

function getByA11yTraits(...args) {
  return firstResultOrNull(getAllByA11yTraits, ...args);
}

function getByTestId(...args) {
  return firstResultOrNull(getAllByTestId, ...args);
}

function getByText(...args) {
  return firstResultOrNull(getAllByText, ...args);
}

function getByValue(...args) {
  return firstResultOrNull(getAllByValue, ...args);
}

/*
 |--------------------------------------------------------------------------
 | Query by...
 |--------------------------------------------------------------------------
 */
const queryAllByA11yHint = queryAllByProp.bind(null, 'accessibilityHint');
const queryAllByA11yLabel = queryAllByProp.bind(null, 'accessibilityLabel');
const queryAllByA11yRole = queryAllByProp.bind(null, 'accessibilityRole');
const queryAllByA11yStates = queryAllByProp.bind(null, 'accessibilityStates');
const queryAllByA11yTraits = queryAllByProp.bind(null, 'accessibilityTraits');
const queryAllByPlaceholder = queryAllByProp.bind(null, 'placeholder');
const queryAllByTestId = queryAllByProp.bind(null, 'testID');
const queryAllByValue = queryAllByProp.bind(null, 'value');

/*
 |--------------------------------------------------------------------------
 | Query all by...
 |--------------------------------------------------------------------------
 */
const queryByA11yHint = queryByProp.bind(null, 'accessibilityHint');
const queryByA11yLabel = queryByProp.bind(null, 'accessibilityLabel');
const queryByA11yRole = queryByProp.bind(null, 'accessibilityRole');
const queryByA11yStates = queryByProp.bind(null, 'accessibilityStates');
const queryByA11yTraits = queryByProp.bind(null, 'accessibilityTraits');
const queryByPlaceholder = queryByProp.bind(null, 'placeholder');
const queryByTestId = queryByProp.bind(null, 'testID');
const queryByValue = queryByProp.bind(null, 'value');

function queryAllByText(
  container,
  text,
  { types = ['Text', 'TextInput'], exact = true, collapseWhitespace, trim, normalizer } = {},
) {
  const baseElement = container.root;
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });

  const baseArray = types.reduce(
    (accumulator, currentValue) => [
      ...accumulator,
      ...baseElement.findAll(n => n.type === currentValue),
    ],
    [],
  );

  return [...baseArray]
    .filter(node => matcher(getNodeText(node), node, text, matchNormalizer))
    .map(removeBadProperties);
}

function queryByText(...args) {
  return firstResultOrNull(queryAllByText, ...args);
}

/*
 |--------------------------------------------------------------------------
 | Finders
 |--------------------------------------------------------------------------
 */
function makeFinder(getter) {
  return (testContainer, text, options, waitForElementOptions) =>
    waitForElement(
      (container = testContainer) => getter(container, text, options),
      waitForElementOptions,
    );
}

/*
 |--------------------------------------------------------------------------
 | Find all by...
 |--------------------------------------------------------------------------
 */
export const findAllByA11yHint = makeFinder(getAllByA11yHint);
export const findAllByA11yLabel = makeFinder(getAllByA11yLabel);
export const findAllByA11yRole = makeFinder(getAllByA11yRole);
export const findAllByA11yStates = makeFinder(getAllByA11yStates);
export const findAllByA11yTraits = makeFinder(getAllByA11yTraits);
export const findAllByPlaceholder = makeFinder(getAllByPlaceholder);
export const findAllByTestId = makeFinder(getAllByTestId);
export const findAllByText = makeFinder(getAllByText);
export const findAllByValue = makeFinder(getAllByValue);

/*
 |--------------------------------------------------------------------------
 | Find by...
 |--------------------------------------------------------------------------
 */
export const findByA11yHint = makeFinder(getByA11yHint);
export const findByA11yLabel = makeFinder(getByA11yLabel);
export const findByA11yRole = makeFinder(getByA11yRole);
export const findByA11yStates = makeFinder(getByA11yStates);
export const findByA11yTraits = makeFinder(getByA11yTraits);
export const findByPlaceholder = makeFinder(getByPlaceholder);
export const findByTestId = makeFinder(getByTestId);
export const findByText = makeFinder(getByText);
export const findByValue = makeFinder(getByValue);

export {
  getAllByA11yHint,
  getAllByA11yLabel,
  getAllByA11yRole,
  getAllByA11yStates,
  getAllByA11yTraits,
  getAllByPlaceholder,
  getAllByTestId,
  getAllByText,
  getAllByValue,
  getByA11yHint,
  getByA11yLabel,
  getByA11yRole,
  getByA11yStates,
  getByA11yTraits,
  getByPlaceholder,
  getByTestId,
  getByText,
  getByValue,
  queryAllByA11yHint,
  queryAllByA11yLabel,
  queryAllByA11yRole,
  queryAllByA11yTraits,
  queryAllByPlaceholder,
  queryAllByTestId,
  queryAllByText,
  queryAllByValue,
  queryByA11yHint,
  queryByA11yLabel,
  queryByA11yRole,
  queryByA11yTraits,
  queryByPlaceholder,
  queryByTestId,
  queryByText,
  queryByValue,
};
