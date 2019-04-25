import { queryAllByProp, buildQueries, getPropMatchAsString } from './all-utils';

const queryAllByA11yStates = queryAllByProp.bind(null, 'accessibilityStates');

const getMultipleError = (c, states) =>
  `Found multiple elements with the accessibilityStates of: ${getPropMatchAsString(states)}`;
const getMissingError = (c, states) =>
  `Unable to find an element with the accessibilityStates of: ${getPropMatchAsString(states)}`;

const [
  queryByA11yStates,
  getAllByA11yStates,
  getByA11yStates,
  findAllByA11yStates,
  findByA11yStates,
] = buildQueries(queryAllByA11yStates, getMultipleError, getMissingError);

export {
  queryByA11yStates,
  queryAllByA11yStates,
  getByA11yStates,
  getAllByA11yStates,
  findAllByA11yStates,
  findByA11yStates,
};
