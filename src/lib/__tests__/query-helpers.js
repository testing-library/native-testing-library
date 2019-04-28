import { defaultFilter, filterNodeByType, proxyUnsafeProperties } from '../query-helpers';

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

test('proxyUnsafeProperties ignores what it should', () => {
  const testElement = proxyUnsafeProperties({
    _fiber: 'should work',
    findAllByProps: jest.fn(),
    findAllByType: jest.fn(),
    findByProps: jest.fn(),
    findByType: jest.fn(),
    instance: jest.fn(),
  });

  expect(testElement._fiber).toBe('should work');
  expect(testElement.findAllByProps).toBe(undefined);
  expect(testElement.findAllByType).toBe(undefined);
  expect(testElement.findByProps).toBe(undefined);
  expect(testElement.findByType).toBe(undefined);
  expect(testElement.instance).toBe(undefined);
});
