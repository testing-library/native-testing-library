import { prettyPrint } from './pretty-print';
import { fuzzyMatches, makeNormalizer, matches } from './matches';

function debugTree(htmlElement) {
  const limit = process.env.DEBUG_PRINT_LIMIT || 7000;

  return prettyPrint(htmlElement.toJSON(), limit);
}

function getElementError(message, container) {
  return new Error([message, debugTree(container)].filter(Boolean).join('\n\n'));
}

function filterNodeByType(node, type) {
  return node.type === type;
}

function firstResultOrNull(queryFunction, ...args) {
  const result = queryFunction(...args);
  if (result.length === 0) return null;
  return result[0];
}

function defaultFilter(node) {
  const mockedTypes = [
    'Image',
    'Text',
    'TextInput',
    'Modal',
    'View',
    'RefreshControl',
    'ScrollView',
    'ActivityIndicator',
    'ListView',
    'ListViewDataSource',
  ];

  return mockedTypes.includes(node.type);
}

function getBaseElement(container) {
  return container.root ? container.root : container;
}

function removeBadProperties(node) {
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
  ['find', 'findAllByProps', 'findAllByType', 'findByProps', 'findByType', 'instance'].forEach(op =>
    Object.defineProperty(node, op, { get: undefined }),
  );

  return node;
}

function queryAllByProp(
  attribute,
  container,
  match,
  { filter, exact = true, collapseWhitespace, trim, normalizer } = {},
) {
  const baseElement = getBaseElement(container);
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });
  const allNodes = Array.from(baseElement.findAll(c => c.props[attribute]));

  return allNodes
    .filter((node, index) => (filter ? filter(node, index) : defaultFilter(node, index)))
    .filter(({ props }) =>
      typeof props[attribute] === 'string'
        ? matcher(props[attribute], baseElement, match, matchNormalizer)
        : JSON.stringify(props[attribute]) === JSON.stringify(match),
    )
    .map(removeBadProperties);
}

function queryByProp(...args) {
  return firstResultOrNull(queryAllByProp, ...args);
}

export {
  defaultFilter,
  getBaseElement,
  getElementError,
  firstResultOrNull,
  filterNodeByType,
  queryAllByProp,
  queryByProp,
  removeBadProperties,
};
