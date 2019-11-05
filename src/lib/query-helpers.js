import { getConfig } from './config';
import { prettyPrint } from './pretty-print';
import { waitForElement } from './wait-for-element';
import { fuzzyMatches, makeNormalizer, matches } from './matches';

function debugTree(container) {
  const limit = process.env.DEBUG_PRINT_LIMIT || 7000;

  return prettyPrint(container, limit);
}

function getElementError(message, container) {
  return new Error([message, debugTree(container)].filter(Boolean).join('\n\n'));
}

function getMultipleElementsFoundError(message, container) {
  return getElementError(
    `${message}\n\n(If this is intentional, then use the \`*AllBy*\` variant of the query (like \`queryAllByText\`, \`getAllByText\`, or \`findAllByText\`)).`,
    container,
  );
}

function validComponentFilter(node, key) {
  return key ? getConfig(key).includes(node.type) : typeof node.type === 'string';
}

function flatten(arr) {
  return arr.reduce(
    (flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    [],
  );
}

function getChildren(node) {
  return node.children.map(child => {
    if (typeof child === 'string') {
      return child;
    } else if (validComponentFilter(child)) {
      return proxyElement(child);
    }

    return getChildren(child);
  });
}

function getParent(node) {
  if (node.parent) {
    return validComponentFilter(node.parent) ? proxyElement(node.parent) : getParent(node.parent);
  }

  return null;
}

function proxyElement(node) {
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
  return new Proxy(node, {
    get(target, key) {
      const ref = target[key];

      switch (key) {
        case 'findAll':
          return function(cb) {
            const overrideCb = n => cb(proxyElement(n));
            return ref.apply(this, [overrideCb]);
          };
        case 'getProp':
          return function(prop) {
            return target.props[prop];
          };
        case 'children':
          return flatten(getChildren(target));
        case 'parentNode':
          return getParent(target);
        case '$$typeof':
          return Symbol.for('ntl.element');
        case 'find':
        case 'findAllByProps':
        case 'findAllByType':
        case 'findByProps':
        case 'findByType':
        case 'instance':
          return undefined;
        default:
          // Let things behave normally if you're not running a query
          return ref;
      }
    },
  });
}

function queryAllByProp(
  prop,
  container,
  match,
  { selector = n => n, exact = true, collapseWhitespace, trim, normalizer } = {},
) {
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });

  return Array.from(container.findAll(c => c.getProp(prop)))
    .filter(selector)
    .filter(node => {
      const value = node.getProp(prop);

      return matcher(value, container, match, matchNormalizer);
    });
}

function queryByProp(prop, container, match, ...args) {
  const els = queryAllByProp(prop, container, match, ...args);
  if (els.length > 1) {
    throw getMultipleElementsFoundError(`Found multiple elements by [${prop}=${match}]`, container);
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
  getElementError,
  getMultipleElementsFoundError,
  makeFindQuery,
  makeGetAllQuery,
  makeSingleQuery,
  queryAllByProp,
  queryByProp,
  proxyElement,
  validComponentFilter,
};
