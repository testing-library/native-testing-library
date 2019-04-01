import { getSetImmediate } from '../helpers';

test('if setImmediate is available, use it', () => {
  const setImmediateMock = jest.fn();
  global.setImmediate = setImmediateMock;

  expect(getSetImmediate()).toBe(setImmediateMock);
});

test('if setImmediate is not available, use setTimeout', () => {
  const setImmediateMock = {};
  const setTimeoutMock = jest.fn();
  global.setImmediate = setImmediateMock;
  global.setTimeout = setTimeoutMock;

  const setImmediate = getSetImmediate();

  expect(setImmediate).not.toBe(setImmediateMock);
  setImmediate();
  expect(setTimeoutMock).toHaveBeenCalledTimes(1);
});
