import { matches, fuzzyMatches, makeNormalizer, buildQueries, getBaseElement } from './all-utils';

function queryAllByValue(
  container,
  value,
  { exact = true, collapseWhitespace, trim, normalizer } = {},
) {
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });

  const baseElement = getBaseElement(container);
  return Array.from(baseElement.findAll(n => ['TextInput', 'Picker'].includes(n.type))).filter(
    node => {
      if (node.type === 'Picker') {
        return matcher(node.props.selectedValue, node, value, matchNormalizer);
      }

      return matcher(node.props.value, node, value, matchNormalizer);
    },
  );
}

const getMultipleError = (c, value) => `Found multiple elements with the value: ${value}.`;
const getMissingError = (c, value) => `Unable to find an element with the value: ${value}.`;
const [queryByValue, getAllByValue, getByValue, findAllByValue, findByValue] = buildQueries(
  queryAllByValue,
  getMultipleError,
  getMissingError,
);

export { queryByValue, queryAllByValue, getByValue, getAllByValue, findAllByValue, findByValue };
