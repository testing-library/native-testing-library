import { matches, fuzzyMatches, makeNormalizer, buildQueries, getContainer } from './all-utils';

function queryAllByDisplayValue(
  testRenderer,
  value,
  { filter = n => n, exact = true, collapseWhitespace, trim, normalizer } = {},
) {
  const container = getContainer(testRenderer);
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });

  return Array.from(container.findAll(n => ['TextInput', 'Picker'].includes(n.type)))
    .filter(filter)
    .filter(node => {
      if (node.type === 'Picker') {
        return matcher(node.getProp('selectedValue'), node, value, matchNormalizer);
      }

      return matcher(node.getProp('value'), node, value, matchNormalizer);
    });
}

const getMultipleError = (c, value) => `Found multiple elements with the value: ${value}.`;
const getMissingError = (c, value) => `Unable to find an element with the value: ${value}.`;
const [
  queryByDisplayValue,
  getAllByDisplayValue,
  getByDisplayValue,
  findAllByDisplayValue,
  findByDisplayValue,
] = buildQueries(queryAllByDisplayValue, getMultipleError, getMissingError);

export {
  queryByDisplayValue,
  queryAllByDisplayValue,
  getByDisplayValue,
  getAllByDisplayValue,
  findAllByDisplayValue,
  findByDisplayValue,
};
