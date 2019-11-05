import {
  buildQueries,
  matches,
  fuzzyMatches,
  makeNormalizer,
  validComponentFilter,
} from './all-utils';

function queryAllByTitle(
  container,
  value,
  { selector = n => n, exact = true, collapseWhitespace, trim, normalizer } = {},
) {
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });

  return Array.from(container.findAll(node => validComponentFilter(node, 'titleComponents')))
    .filter(selector)
    .filter(node => matcher(node.getProp('title'), node, value, matchNormalizer));
}

const getMultipleError = (c, title) => `Found multiple elements with the title: ${title}`;
const getMissingError = (c, title) => `Unable to find an element with the title: ${title}`;

const [queryByTitle, getAllByTitle, getByTitle, findAllByTitle, findByTitle] = buildQueries(
  queryAllByTitle,
  getMultipleError,
  getMissingError,
);

export { queryByTitle, queryAllByTitle, getByTitle, getAllByTitle, findAllByTitle, findByTitle };
