import { queryAllByProp, buildQueries } from './all-utils';

const queryAllByRole = queryAllByProp.bind(null, 'accessibilityRole');

const getMultipleError = (c, role) =>
  `Found multiple elements with the accessibilityRole of: ${role}`;
const getMissingError = (c, role) =>
  `Unable to find an element with the accessibilityRole of: ${role}`;

const [queryByRole, getAllByRole, getByRole, findAllByRole, findByRole] = buildQueries(
  queryAllByRole,
  getMultipleError,
  getMissingError,
);

export { queryByRole, queryAllByRole, getByRole, getAllByRole, findAllByRole, findByRole };
