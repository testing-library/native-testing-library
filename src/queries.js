import React from 'react';
import { Text, TextInput } from 'react-native';

import { getNodeText } from './get-node-text';
import { waitForElement } from './wait-for-element';
import { fuzzyMatches, makeNormalizer, matches } from './matches';
import { getElementError, firstResultOrNull, queryAllByProp, queryByProp } from './query-helpers';

const queryByA11yLabel = queryByProp.bind(null, 'accessibilityLabel');
const queryAllByA11yLabel = queryAllByProp.bind(null, 'accessibilityLabel');
const queryByPlaceholder = queryByProp.bind(null, 'placeholder');
const queryAllByPlaceholder = queryAllByProp.bind(null, 'placeholder');
const queryByTestId = queryByProp.bind(null, 'testID');
const queryAllByTestId = queryAllByProp.bind(null, 'testID');
const queryByValue = queryByProp.bind(null, 'value');
const queryAllByValue = queryAllByProp.bind(null, 'value');
const queryByA11yRole = queryByProp.bind(null, 'accessibilityRole');
const queryAllByA11yRole = queryAllByProp.bind(null, 'accessibilityRole');

function queryAllByText(
  { rootInstance },
  text,
  { types = [Text, TextInput], exact = true, collapseWhitespace, trim, normalizer } = {},
) {
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });

  const baseArray = types.reduce(
    (accumulator, currentValue) => [...accumulator, ...rootInstance.findAllByType(currentValue)],
    [],
  );

  return [...baseArray].filter(node => matcher(getNodeText(node), node, text, matchNormalizer));
}

function queryByText(...args) {
  return firstResultOrNull(queryAllByText, ...args);
}

// getters
// the reason we're not dynamically generating these functions that look so similar:
// 1. The error messages are specific to each one and depend on arguments
// 2. The stack trace will look better because it'll have a helpful method name.

function getAllByTestId({ rootInstance, container }, id, ...rest) {
  const els = queryAllByTestId({ rootInstance, container }, id, ...rest);
  if (!els.length) {
    throw getElementError(`Unable to find an element with the testID: ${id}`, container);
  }
  return els;
}

function getByTestId(...args) {
  return firstResultOrNull(getAllByTestId, ...args);
}

function getAllByA11yRole({ rootInstance, container }, value, ...rest) {
  const els = queryAllByA11yRole({ rootInstance, container }, value, ...rest);
  if (!els.length) {
    throw getElementError(`Unable to find an element by accessibilityRole="${value}".`, container);
  }
  return els;
}

function getByA11yRole(...args) {
  return firstResultOrNull(getAllByA11yRole, ...args);
}

function getAllByValue({ rootInstance, container }, value, ...rest) {
  const els = queryAllByValue({ rootInstance, container }, value, ...rest);
  if (!els.length) {
    throw getElementError(`Unable to find an element with the value: ${value}.`, container);
  }
  return els;
}

function getByValue(...args) {
  return firstResultOrNull(getAllByValue, ...args);
}

function getAllByA11yLabel({ rootInstance, container }, text, ...rest) {
  const els = queryAllByA11yLabel({ rootInstance, container }, text, ...rest);
  if (!els.length) {
    throw getElementError(`Unable to find an element by accessibilityLabel="${text}"`, container);
  }
  return els;
}

function getByA11yLabel(...args) {
  return firstResultOrNull(getAllByA11yLabel, ...args);
}

function getAllByPlaceholder({ rootInstance, container }, text, ...rest) {
  const els = queryAllByPlaceholder({ rootInstance, container }, text, ...rest);
  if (!els.length) {
    throw getElementError(
      `Unable to find an element with the placeholder text of: ${text}`,
      container,
    );
  }
  return els;
}

function getByPlaceholder(...args) {
  return firstResultOrNull(getAllByPlaceholder, ...args);
}

function getAllByText({ rootInstance, container }, text, ...rest) {
  const els = queryAllByText({ rootInstance, container }, text, ...rest);
  if (!els.length) {
    throw getElementError(
      `Unable to find an element with the text: ${text}. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.`,
      container,
    );
  }
  return els;
}

function getByText(...args) {
  return firstResultOrNull(getAllByText, ...args);
}

function makeFinder(getter) {
  return (testInstance, text, options, waitForElementOptions) =>
    waitForElement(
      (instance = testInstance) => getter(instance, text, options),
      waitForElementOptions,
    );
}

export const findByA11yLabel = makeFinder(getByA11yLabel);
export const findAllByA11yLabel = makeFinder(getAllByA11yLabel);

export const findByPlaceholder = makeFinder(getByPlaceholder);
export const findAllByPlaceholder = makeFinder(getAllByPlaceholder);

const findByText = makeFinder(getByText);
const findAllByText = makeFinder(getAllByText);

export const findByValue = makeFinder(getByValue);
export const findAllByValue = makeFinder(getAllByValue);

export const findByA11yRole = makeFinder(getByA11yRole);
export const findAllByA11yRole = makeFinder(getAllByA11yRole);

export const findByTestId = makeFinder(getByTestId);
export const findAllByTestId = makeFinder(getAllByTestId);

export {
  queryByPlaceholder,
  queryAllByPlaceholder,
  getByPlaceholder,
  getAllByPlaceholder,
  findByText,
  findAllByText,
  queryByText,
  queryAllByText,
  getByText,
  getAllByText,
  queryByA11yLabel,
  queryAllByA11yLabel,
  getByA11yLabel,
  getAllByA11yLabel,
  queryByTestId,
  queryAllByTestId,
  getByTestId,
  getAllByTestId,
  queryByValue,
  queryAllByValue,
  getByValue,
  getAllByValue,
  queryByA11yRole,
  queryAllByA11yRole,
  getAllByA11yRole,
  getByA11yRole,
};
