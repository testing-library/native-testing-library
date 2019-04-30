import { getCoreComponents } from '../preset/core-components';

import { prettyPrint } from './pretty-print';
import { waitForElement } from './wait-for-element';
import { fuzzyMatches, makeNormalizer, matches } from './matches';

function debugTree(baseElement) {
  const limit = process.env.DEBUG_PRINT_LIMIT || 7000;

  return prettyPrint(baseElement.toJSON(), limit);
}

function getElementError(message, baseElement) {
  return new Error([message, debugTree(baseElement)].filter(Boolean).join('\n\n'));
}

function getMultipleElementsFoundError(message, baseElement) {
  return getElementError(
    `${message}\n\n(If this is intentional, then use the \`*AllBy*\` variant of the query (like \`queryAllByText\`, \`getAllByText\`, or \`findAllByText\`)).`,
    baseElement,
  );
}

function defaultFilter(node) {
  return getCoreComponents().includes(node.type);
}

function getContainer(baseElement) {
  return proxyUnsafeProperties(baseElement.root ? baseElement.root : baseElement);
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
          return ref
            .apply(this, args)
            .filter(defaultFilter)
            .map(proxyUnsafeProperties);
        };
      } else if (key === 'getProp') {
        return function(prop) {
          /* istanbul ignore next */
          return target.props ? target.props[prop] : null;
        };
      } else if (UNSAFE_METHODS.includes(key)) {
        return undefined;
      }

      // Let things behave normally if you're not running a query
      return target[key];
    },
  });
}

function queryAllByProp(
  prop,
  baseElement,
  match,
  { filter = n => n, exact = true, collapseWhitespace, trim, normalizer } = {},
) {
  const container = getContainer(baseElement);
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });

  return Array.from(container.findAll(c => c.props[prop]))
    .filter(filter)
    .filter(node => {
      const value = node.getProp(prop);

      return matcher(value, container, match, matchNormalizer);
    });
}

function queryByProp(prop, baseElement, match, ...args) {
  const els = queryAllByProp(prop, baseElement, match, ...args);
  if (els.length > 1) {
    throw getMultipleElementsFoundError(
      `Found multiple elements by [${prop}=${match}]`,
      baseElement,
    );
  }
  return els[0] || null;
}

// accepts a query and returns a function that throws if more than one element is returned, otherwise
// returns the result or null
function makeSingleQuery(allQuery, getMultipleError) {
  return (baseElement, ...args) => {
    const els = allQuery(baseElement, ...args);
    if (els.length > 1) {
      throw getMultipleElementsFoundError(getMultipleError(baseElement, ...args), baseElement);
    }
    return els[0] || null;
  };
}

// accepts a query and returns a function that throws if an empty list is returned
function makeGetAllQuery(allQuery, getMissingError) {
  return (baseElement, ...args) => {
    const els = allQuery(baseElement, ...args);
    if (!els.length) {
      throw getElementError(getMissingError(baseElement, ...args), baseElement);
    }
    return els;
  };
}

// accepts a getter  and returns a function that calls waitForElement which invokes the getter.
function makeFindQuery(getter) {
  return (baseElement, text, options, waitForElementOptions) =>
    waitForElement(() => getter(baseElement, text, options), waitForElementOptions);
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
  getContainer,
  getElementError,
  getMultipleElementsFoundError,
  makeFindQuery,
  makeGetAllQuery,
  makeSingleQuery,
  queryAllByProp,
  queryByProp,
  proxyUnsafeProperties,
};
