import { getCoreComponents } from '../preset/core-components';

import { prettyPrint } from './pretty-print';
import { waitForElement } from './wait-for-element';
import { fuzzyMatches, makeNormalizer, matches } from './matches';

function debugTree(container) {
  const limit = process.env.DEBUG_PRINT_LIMIT || 7000;

  return prettyPrint(container.toJSON(), limit);
}

function getElementError(message, container) {
  return new Error([message, debugTree(container)].filter(Boolean).join('\n\n'));
}

function filterNodeByType(node, type) {
  return node.type === type;
}

function getMultipleElementsFoundError(message, container) {
  return getElementError(
    `${message}\n\n(If this is intentional, then use the \`*AllBy*\` variant of the query (like \`queryAllByText\`, \`getAllByText\`, or \`findAllByText\`)).`,
    container,
  );
}

function defaultFilter(node, mockedTypes = getCoreComponents()) {
  return mockedTypes.includes(node.type);
}

function getBaseElement(container) {
  return proxyUnsafeProperties(container.root ? container.root : container);
}

function proxyUnsafeProperties(node) {
  // We take the guiding principles seriously around these parts. These methods just let
  // you do too much unfortunately, and they make it hard to follow the rules of the
  // testing-library. It's not that we don't trust you, in fact we do trust you! We've
  // left `findAll` on the instance for you as an emergency escape hatch for when
  // you're really in a bind. We do want you to test successfully, after all ☺️
  //
  // The main intent is to:
  //   1) Make it hard to assert on implementation details
  //   2) Force you to consider how to test from a user's perspective
  //
  // Of course if you can't figure that out, we still want you to be able to use this library,
  // so use `findAll`, just use it sparingly! We really believe you can do everything you
  // need using the query methods provided on the `render` API.
  const UNSAFE_METHODS = [
    'findAllByProps',
    'findAllByType',
    'findByProps',
    'findByType',
    'instance',
  ];

  return new Proxy(node, {
    get(target, key) {
      // You can use these two, but we still want to filter out most components
      if (key === 'findAll' || key === 'find') {
        const ref = target[key];
        return function(...args) {
          return ref.apply(this, args).filter(el => defaultFilter(el));
        };
      } else if (UNSAFE_METHODS.includes(key)) {
        return undefined;
      }

      // Let things behave normally if you're not running a query
      return target[key];
    },
  });
}

function getPropMatchAsString(prop) {
  return typeof prop === 'string' ? prop : JSON.stringify(prop);
}

function queryAllByProp(
  attribute,
  container,
  match,
  { exact = true, collapseWhitespace, trim, normalizer } = {},
) {
  const baseElement = getBaseElement(container);
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });

  return Array.from(baseElement.findAll(c => c.props[attribute]))
    .filter(({ props }) =>
      typeof props[attribute] === 'string'
        ? matcher(props[attribute], baseElement, match, matchNormalizer)
        : JSON.stringify(props[attribute]) === JSON.stringify(match),
    )
    .map(proxyUnsafeProperties);
}

function queryByProp(prop, container, match, ...args) {
  const els = queryAllByProp(prop, container, match, ...args);
  if (els.length > 1) {
    throw getMultipleElementsFoundError(
      `Found multiple elements by [${prop}=${getPropMatchAsString(match)}]`,
      container,
    );
  }
  return els[0] || null;
}

// accepts a query and returns a function that throws if more than one element is returned, otherwise
// returns the result or null
function makeSingleQuery(allQuery, getMultipleError) {
  return (container, ...args) => {
    const els = allQuery(container, ...args);
    if (els.length > 1) {
      throw getMultipleElementsFoundError(getMultipleError(container, ...args), container);
    }
    return els[0] || null;
  };
}

// accepts a query and returns a function that throws if an empty list is returned
function makeGetAllQuery(allQuery, getMissingError) {
  return (container, ...args) => {
    const els = allQuery(container, ...args);
    if (!els.length) {
      throw getElementError(getMissingError(container, ...args), container);
    }
    return els;
  };
}

// accepts a getter  and returns a function that calls waitForElement which invokes the getter.
function makeFindQuery(getter) {
  return (container, text, options, waitForElementOptions) =>
    waitForElement(() => getter(container, text, options), waitForElementOptions);
}

function buildQueries(queryAllBy, getMultipleError, getMissingError) {
  const queryBy = makeSingleQuery(queryAllBy, getMultipleError);
  const getAllBy = makeGetAllQuery(queryAllBy, getMissingError);
  const getBy = makeSingleQuery(getAllBy, getMultipleError);
  const findAllBy = makeFindQuery(getAllBy);
  const findBy = makeFindQuery(getBy);

  return [queryBy, getAllBy, getBy, findAllBy, findBy];
}

export {
  buildQueries,
  defaultFilter,
  filterNodeByType,
  getBaseElement,
  getElementError,
  getMultipleElementsFoundError,
  getPropMatchAsString,
  makeFindQuery,
  makeGetAllQuery,
  makeSingleQuery,
  queryAllByProp,
  queryByProp,
  proxyUnsafeProperties,
};
