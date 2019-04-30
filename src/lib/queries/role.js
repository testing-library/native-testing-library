import { buildQueries, getContainer } from './all-utils';

const validRoles = [
  'adjustable',
  'button',
  'header',
  'image',
  'imagebutton',
  'keyboardKey',
  'link',
  'none',
  'search',
  'summary',
  'text',
];

const validTraits = [
  'adjustable',
  'allowsDirectInteraction',
  'button',
  'disabled',
  'frequentUpdates',
  'header',
  'image',
  'key',
  'link',
  'none',
  'pageTurn',
  'plays',
  'search',
  'selected',
  'startsMedia',
  'summary',
  'text',
];

function queryAllByRole(baseElement, value, { filter = n => n } = {}) {
  const container = getContainer(baseElement);

  const roleElements = container.findAll(c => c.props.accessibilityRole);
  const traitElements = container.findAll(c => c.props.accessibilityTraits);

  return [...roleElements, ...traitElements].filter(filter).filter(node => {
    const role = node.getProp('accessibilityRole');
    const traits = node.getProp('accessibilityTraits');

    if (role === value && validRoles.includes(value)) {
      return true;
    } else if (traits) {
      const arrayTraits = Array.isArray(traits) ? traits : [traits];
      const arrayValue = Array.isArray(value) ? value : [value];

      return arrayTraits.every(i => arrayValue.indexOf(i) > -1 && validTraits.includes(i));
    }

    return false;
  });
}

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
