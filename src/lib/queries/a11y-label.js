import { queryAllByProp, buildQueries } from './all-utils';

const queryAllByA11yLabel = queryAllByProp.bind(null, 'accessibilityLabel');

const getMultipleError = (c, label) =>
  `Found multiple elements with the accessibilityLabel of: ${label}`;
const getMissingError = (c, label) =>
  `Unable to find an element with the accessibilityLabel of: ${label}`;

const [
  queryByA11yLabel,
  getAllByA11yLabel,
  getByA11yLabel,
  findAllByA11yLabel,
  findByA11yLabel,
] = buildQueries(queryAllByA11yLabel, getMultipleError, getMissingError);

export {
  queryByA11yLabel,
  queryAllByA11yLabel,
  getByA11yLabel,
  getAllByA11yLabel,
  findAllByA11yLabel,
  findByA11yLabel,
};
