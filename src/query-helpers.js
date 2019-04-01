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

function queryAllByProp(
  attribute,
  container,
  text,
  { filter, exact = true, collapseWhitespace, trim, normalizer } = {},
) {
  const rootInstance = container.root;
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });
  const allNodes = Array.from(rootInstance.findAll(c => c.props[attribute]));

  return allNodes
    .filter((node, index) => (filter ? filter(node, index) : defaultFilter(node, index)))
    .filter(node => matcher(node.props[attribute], rootInstance, text, matchNormalizer));
}

function queryByProp(...args) {
  return firstResultOrNull(queryAllByProp, ...args);
}

export {
  defaultFilter,
  getElementError,
  firstResultOrNull,
  filterNodeByType,
  queryAllByProp,
  queryByProp,
};
