import { configure } from '../config';
import { validComponentFilter, proxyUnsafeProperties } from '../query-helpers';

test('validComponentFilter returns `true` when node.type is in the mocked type list', () => {
  configure({ coreComponents: ['Text'] });
  expect(validComponentFilter({ type: 'Text' })).toEqual(true);
});
test('validComponentFilter returns `false` when node.type is not in the mocked type list', () => {
  configure({ coreComponents: ['Text'] });
  expect(validComponentFilter({ type: 'Test' })).toEqual(false);
});
test('validComponentFilter always returns `true` when no mocked components are provided', () => {
  configure({ coreComponents: null });
  expect(validComponentFilter({ type: 'BadComponent' })).toEqual(true);
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
