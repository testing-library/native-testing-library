import { asyncAct } from '../act-compat';

jest.mock('react-test-renderer', () => ({
  act: cb => {
    const promise = cb();
    return {
      then() {
        console.error('blah, do not do this');
        return promise;
      },
    };
  },
}));

test('async act works even when the act is an old one', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  const callback = jest.fn();
  await asyncAct(async () => {
    await Promise.resolve();
    await callback();
  });
  expect(console.error.mock.calls).toMatchInlineSnapshot(`Array []`);
  expect(callback).toHaveBeenCalledTimes(1);

  // and it doesn't warn you twice
  callback.mockClear();
  console.error.mockClear();

  await asyncAct(async () => {
    await Promise.resolve();
    await callback();
  });
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(callback).toHaveBeenCalledTimes(1);

  console.error.mockRestore();
});
