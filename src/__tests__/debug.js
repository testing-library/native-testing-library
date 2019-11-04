import React from 'react';
import { Text, View } from 'react-native';

import { cleanup, render } from '../';

let log;

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(output => (log = output));
});

afterEach(() => {
  cleanup();
  log = undefined;
  console.log.mockRestore();
});

test('debug pretty prints the baseElement', () => {
  const HelloWorld = () => <Text>Hello World</Text>;
  const { debug } = render(<HelloWorld />);
  debug();
  expect(console.log).toHaveBeenCalledTimes(1);
  expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Hello World'));
});

test('debug can remove specified props from output', () => {
  const { debug } = render(
    <View style={{ width: 300 }}>
      <Text>Hello World!</Text>
    </View>,
    {
      options: {
        debug: {
          omitProps: ['style', 'pointerEvents', 'collapsable'],
        },
      },
    },
  );

  debug();

  expect(console.log).toHaveBeenCalledTimes(1);
  expect(log).toMatchInlineSnapshot(`
    "[36m<View>[39m
      [36m<View>[39m
        [36m<View>[39m
          [36m<Text>[39m
            [0mHello World![0m
          [36m</Text>[39m
        [36m</View>[39m
      [36m</View>[39m
    [36m</View>[39m"
  `);
});
