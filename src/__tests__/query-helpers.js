import { defaultFilter, filterNodeByType } from '../query-helpers';

test('filterNodeByType returns `true` when node.type matches the provided type', () => {
  expect(filterNodeByType({ type: 'Text' }, 'Text')).toEqual(true);
});
test('filterNodeByType returns `false` when node.type does not match the provided type', () => {
  expect(filterNodeByType({ type: 'Text' }, 'Test')).toEqual(false);
});

test('defaultFilter returns `true` when node.type is in the mocked type list', () => {
  expect(defaultFilter({ type: 'Text' })).toEqual(true);
});
test('defaultFilter returns `false` when node.type is not in the mocked type list', () => {
  expect(defaultFilter({ type: 'Test' })).toEqual(false);
});
