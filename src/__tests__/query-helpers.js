import { filterNodeByType } from '../query-helpers';

test('it returns true when node.type is a match', () => {
  expect(filterNodeByType({ type: 'test' }, 'test')).toEqual(true);
});
test('it returns false when node.type is not a match', () => {
  expect(filterNodeByType({ type: 'test' }, 'tst')).toEqual(false);
});

test('it returns true when node.type.name is a match', () => {
  expect(filterNodeByType({ type: { name: 'test' } }, 'test')).toEqual(true);
});
test('it returns false when node.type.name is not a match', () => {
  expect(filterNodeByType({ type: { name: 'test' } }, 'tst')).toEqual(false);
});

test('it returns true when node.type.displayName is a match', () => {
  expect(filterNodeByType({ type: { displayName: 'test' } }, 'test')).toEqual(true);
});
test('it returns false when node.type.displayName is not a match', () => {
  expect(filterNodeByType({ type: { displayName: 'test' } }, 'tst')).toEqual(false);
});

test('it returns false when an empty node is given', () => {
  expect(filterNodeByType({}, 'test')).toEqual(false);
});
test('it returns false when no node is given', () => {
  expect(filterNodeByType(null, 'test')).toEqual(false);
});
