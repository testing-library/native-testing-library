import { defaultFilter, filterNodeByType } from '../query-helpers';

test('filterNodeByType returns true when node.type is a match', () => {
  expect(filterNodeByType({ type: 'test' }, 'test')).toEqual(true);
});
test('filterNodeByType returns false when node.type is not a match', () => {
  expect(filterNodeByType({ type: 'test' }, 'tst')).toEqual(false);
});

test('filterNodeByType returns true when node.type.name is a match', () => {
  expect(filterNodeByType({ type: { name: 'test' } }, 'test')).toEqual(true);
});
test('filterNodeByType returns false when node.type.name is not a match', () => {
  expect(filterNodeByType({ type: { name: 'test' } }, 'tst')).toEqual(false);
});

test('filterNodeByType returns true when node.type.displayName is a match', () => {
  expect(filterNodeByType({ type: { displayName: 'test' } }, 'test')).toEqual(true);
});
test('filterNodeByType returns false when node.type.displayName is not a match', () => {
  expect(filterNodeByType({ type: { displayName: 'test' } }, 'tst')).toEqual(false);
});

test('filterNodeByType returns false when no node is given', () => {
  expect(filterNodeByType(null, 'test')).toEqual(false);
});

test('filterNodeByType returns false when undefined is given', () => {
  expect(filterNodeByType(undefined, 'test')).toEqual(false);
});

//function defaultFilter(node) {
//  const name =
//    node.type.displayName ||
//    node.type.name ||
//    (node.type.render // handle React.forwardRef
//     ? node.type.render.displayName || node.type.render.name
//     : 'Unknown');
//
//  return name !== 'Unknown';
//}

test('defaultFilter returns `false` when node.type.displayName is provided', () => {
  expect(defaultFilter({ type: { displayName: 'test' } })).toEqual(true);
});
test('defaultFilter returns `false` when node.type.name is provided', () => {
  expect(defaultFilter({ type: { name: 'test' } })).toEqual(true);
});
test('defaultFilter returns `false` when node.type.render.displayName is provided', () => {
  expect(defaultFilter({ type: { render: { displayName: 'test' } } })).toEqual(true);
});
test('defaultFilter returns `false` when node.type.render.name is provided', () => {
  expect(defaultFilter({ type: { render: { name: 'test' } } })).toEqual(true);
});
test('defaultFilter returns `true` when when it cannot find a type name on the node', () => {
  expect(defaultFilter({ type: {} })).toEqual(false);
});
