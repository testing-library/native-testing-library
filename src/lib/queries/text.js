import {
  fuzzyMatches,
  matches,
  makeNormalizer,
  getNodeText,
  buildQueries,
  getContainer,
} from './all-utils';

function queryAllByText(
  testRenderer,
  text,
  { filter = n => n, exact = true, collapseWhitespace, trim, normalizer } = {},
) {
  const container = getContainer(testRenderer);
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });

  return Array.from(container.findAll(n => ['Button', 'TextInput', 'Text'].includes(n.type)))
    .filter(filter)
    .filter(node => matcher(getNodeText(node), node, text, matchNormalizer));
}

const getMultipleError = (c, text) => `Found multiple elements with the text: ${text}`;
const getMissingError = (c, text) =>
  `Unable to find an element with the text: ${text}. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.`;

const [queryByText, getAllByText, getByText, findAllByText, findByText] = buildQueries(
  queryAllByText,
  getMultipleError,
  getMissingError,
);

export { queryByText, queryAllByText, getByText, getAllByText, findAllByText, findByText };
