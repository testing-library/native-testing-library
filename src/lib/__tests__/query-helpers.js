import { validComponentFilter, proxyUnsafeProperties } from '../query-helpers';
import { configure } from '../config';

describe('validComponentFilter > no key provided', () => {
  test('returns `true` when node.type is a string', () => {
    expect(validComponentFilter({ type: 'Text' })).toEqual(true);
  });
  test('validComponentFilter returns `false` when node.type is not in the mocked type list', () => {
    expect(validComponentFilter({ type: () => {} })).toEqual(false);
  });
});

describe('validComponentFilter > key provided', () => {
  test('validComponentFilter returns `true` when node.type is in the mocked type list', () => {
    configure({ testComponents: ['Text'] });
    expect(validComponentFilter({ type: 'Text' }, 'testComponents')).toEqual(true);
  });
  test('validComponentFilter returns `false` when node.type is not in the mocked type list', () => {
    configure({ testComponents: ['Text'] });
    expect(validComponentFilter({ type: 'Test' }, 'testComponents')).toEqual(false);
  });
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
