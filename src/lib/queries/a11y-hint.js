import { queryAllByProp, buildQueries } from './all-utils';

const queryAllByA11yHint = queryAllByProp.bind(null, 'accessibilityHint');

const getMultipleError = (c, hint) =>
  `Found multiple elements with the accessibilityHint of: ${hint}`;
const getMissingError = (c, hint) =>
  `Unable to find an element with the accessibilityHint of: ${hint}`;

const [
  queryByA11yHint,
  getAllByA11yHint,
  getByA11yHint,
  findAllByA11yHint,
  findByA11yHint,
] = buildQueries(queryAllByA11yHint, getMultipleError, getMissingError);

export {
  queryByA11yHint,
  queryAllByA11yHint,
  getByA11yHint,
  getAllByA11yHint,
  findAllByA11yHint,
  findByA11yHint,
};
