import { act } from '..';

jest.mock('react-test-renderer', () => ({}));

test('act works even when there is no act from test renderer', () => {
  const callback = jest.fn();
  act(callback);
  expect(callback).toHaveBeenCalledTimes(1);
});
