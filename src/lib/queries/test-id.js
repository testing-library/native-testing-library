import { queryAllByProp, buildQueries } from './all-utils';

const queryAllByTestId = queryAllByProp.bind(null, 'testID');

const getMultipleError = (c, id) => `Found multiple elements with the testID of: ${id}`;
const getMissingError = (c, id) => `Unable to find an element with the testID of: ${id}`;

const [queryByTestId, getAllByTestId, getByTestId, findAllByTestId, findByTestId] = buildQueries(
  queryAllByTestId,
  getMultipleError,
  getMissingError,
);

export {
  queryByTestId,
  queryAllByTestId,
  getByTestId,
  getAllByTestId,
  findAllByTestId,
  findByTestId,
};
