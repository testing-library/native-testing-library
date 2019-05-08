import React from 'react';
import { Text } from 'react-native';

import { cleanup, render } from '../';

afterEach(cleanup);

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  console.log.mockRestore();
});

test('debug pretty prints the testRenderer', () => {
  const HelloWorld = () => <Text>Hello World</Text>;
  const { debug } = render(<HelloWorld />);
  debug();
  expect(console.log).toHaveBeenCalledTimes(1);
  expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Hello World'));
});
