import { queryAllByProp, buildQueries } from './all-utils';

const queryAllByA11yRole = queryAllByProp.bind(null, 'accessibilityRole');

const getMultipleError = (c, role) =>
  `Found multiple elements with the accessibilityRole of: ${role}`;
const getMissingError = (c, role) =>
  `Unable to find an element with the accessibilityRole of: ${role}`;

const [
  queryByA11yRole,
  getAllByA11yRole,
  getByA11yRole,
  findAllByA11yRole,
  findByA11yRole,
] = buildQueries(queryAllByA11yRole, getMultipleError, getMissingError);

export {
  queryByA11yRole,
  queryAllByA11yRole,
  getByA11yRole,
  getAllByA11yRole,
  findAllByA11yRole,
  findByA11yRole,
};
