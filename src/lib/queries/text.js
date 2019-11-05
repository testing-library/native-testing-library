import {
  fuzzyMatches,
  matches,
  makeNormalizer,
  getNodeText,
  buildQueries,
  validComponentFilter,
} from './all-utils';

function queryAllByText(
  container,
  text,
  { selector = n => n, exact = true, collapseWhitespace, trim, normalizer } = {},
) {
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });

  return Array.from(container.findAll(node => validComponentFilter(node, 'textComponents')))
    .filter(selector)
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
