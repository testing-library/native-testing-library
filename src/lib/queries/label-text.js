import { queryAllByProp, buildQueries } from './all-utils';

const queryAllByLabelText = queryAllByProp.bind(null, 'accessibilityLabel');

const getMultipleError = (c, label) =>
  `Found multiple elements with the accessibilityLabel of: ${label}`;
const getMissingError = (c, label) =>
  `Unable to find an element with the accessibilityLabel of: ${label}`;

const [
  queryByLabelText,
  getAllByLabelText,
  getByLabelText,
  findAllByLabelText,
  findByLabelText,
] = buildQueries(queryAllByLabelText, getMultipleError, getMissingError);

export {
  queryByLabelText,
  queryAllByLabelText,
  getByLabelText,
  getAllByLabelText,
  findAllByLabelText,
  findByLabelText,
};
