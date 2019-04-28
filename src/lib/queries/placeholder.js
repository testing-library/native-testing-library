import { queryAllByProp, buildQueries } from './all-utils';

const queryAllByPlaceholder = queryAllByProp.bind(null, 'placeholder');

const getMultipleError = (c, text) => `Found multiple elements with the placeholder of: ${text}`;
const getMissingError = (c, text) => `Unable to find an element with the placeholder of: ${text}`;

const [
  queryByPlaceholder,
  getAllByPlaceholder,
  getByPlaceholder,
  findAllByPlaceholder,
  findByPlaceholder,
] = buildQueries(queryAllByPlaceholder, getMultipleError, getMissingError);

export {
  queryByPlaceholder,
  queryAllByPlaceholder,
  getByPlaceholder,
  getAllByPlaceholder,
  findAllByPlaceholder,
  findByPlaceholder,
};
