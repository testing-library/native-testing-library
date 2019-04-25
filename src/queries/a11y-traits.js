import { queryAllByProp, buildQueries, getPropMatchAsString } from './all-utils';

const queryAllByA11yTraits = queryAllByProp.bind(null, 'accessibilityTraits');

const getMultipleError = (c, traits) =>
  `Found multiple elements with the accessibilityTraits of: ${getPropMatchAsString(traits)}`;
const getMissingError = (c, traits) =>
  `Unable to find an element with the accessibilityTraits of: ${getPropMatchAsString(traits)}`;

const [
  queryByA11yTraits,
  getAllByA11yTraits,
  getByA11yTraits,
  findAllByA11yTraits,
  findByA11yTraits,
] = buildQueries(queryAllByA11yTraits, getMultipleError, getMissingError);

export {
  queryByA11yTraits,
  queryAllByA11yTraits,
  getByA11yTraits,
  getAllByA11yTraits,
  findAllByA11yTraits,
  findByA11yTraits,
};
