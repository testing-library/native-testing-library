import { queryAllByProp, buildQueries } from './all-utils';

const queryAllByHintText = queryAllByProp.bind(null, 'accessibilityHint');

const getMultipleError = (c, hint) =>
  `Found multiple elements with the accessibilityHint of: ${hint}`;
const getMissingError = (c, hint) =>
  `Unable to find an element with the accessibilityHint of: ${hint}`;

const [
  queryByHintText,
  getAllByHintText,
  getByHintText,
  findAllByHintText,
  findByHintText,
] = buildQueries(queryAllByHintText, getMultipleError, getMissingError);

export {
  queryByHintText,
  queryAllByHintText,
  getByHintText,
  getAllByHintText,
  findAllByHintText,
  findByHintText,
};
