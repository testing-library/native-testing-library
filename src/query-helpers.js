import { prettyPrint } from './pretty-print';
import { fuzzyMatches, makeNormalizer, matches } from './matches';

function debugDOM(htmlElement) {
  const limit = process.env.DEBUG_PRINT_LIMIT || 7000;

  return prettyPrint(htmlElement.toJSON(), limit);
}

function getElementError(message, container) {
  return new Error([message, debugDOM(container)].filter(Boolean).join('\n\n'));
}

function filterNodeByType(node, type) {
  return node.type === type;
}

function firstResultOrNull(queryFunction, ...args) {
  const result = queryFunction(...args);
  if (result.length === 0) return null;
  return result[0];
}

// This is one of the big differences between react-testing-library and this library. Since this relies on
// the react rendered rather than the DOM, you end up getting more results than you expect to get. In
// the case of native  components, that means you get double what you expect to get. For example:

// <Text testID="hi">
//   hi
// </Text>
//
// will become:
//
// <Text testID="hi">
//   <Text testID="hi">
//     hi
//   </Text>
// </Text>
//
// This issue has been brought to the react-native team's attention on multiple times over the years, but it
// still exists. In the mean time, you can provide a filter function when querying by props in this library
// so that you can only get the elements you expect to get. We provide a default that works for mocked
// native components of only returning odd results. In the example above, that would be the inner-most
// <Text /> component, which is the one you'll actually want (it's the mocked native <Text />).
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

  return (
    allNodes
      // Then make sure to only match the odd numbered ones
      .filter((node, index) => (filter ? filter(node, index) : defaultFilter(node, index)))
      .filter(node => matcher(node.props[attribute], rootInstance, text, matchNormalizer))
  );
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
