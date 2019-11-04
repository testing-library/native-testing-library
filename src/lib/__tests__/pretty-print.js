import React from 'react';
import { Text, View } from 'react-native';

import { render, prettyPrint, cleanup } from '../../';

afterEach(cleanup);

test('it prints correctly with no children', () => {
  const { container } = render(<View />);

  expect(prettyPrint(container)).toMatchInlineSnapshot(`
    "[36m<View[39m
      [33mcollapsable[39m=[32m{true}[39m
      [33mpointerEvents[39m=[32m\\"box-none\\"[39m
      [33mstyle[39m=[32m{
        Object {
          \\"flex\\": 1,
        }
      }[39m
    [36m>[39m
      [36m<View />[39m
    [36m</View>[39m"
  `);
});

test('it prints correctly with one child', () => {
  const { container } = render(
    <View>
      <Text>Hello World!</Text>
    </View>,
  );

  expect(prettyPrint(container)).toMatchInlineSnapshot(`
    "[36m<View[39m
      [33mcollapsable[39m=[32m{true}[39m
      [33mpointerEvents[39m=[32m\\"box-none\\"[39m
      [33mstyle[39m=[32m{
        Object {
          \\"flex\\": 1,
        }
      }[39m
    [36m>[39m
      [36m<View>[39m
        [36m<Text>[39m
          [0mHello World![0m
        [36m</Text>[39m
      [36m</View>[39m
    [36m</View>[39m"
  `);
});

test('it prints correctly with multiple children', () => {
  const { container } = render(
    <View>
      <Text>Hello</Text>
      <Text>World!</Text>
    </View>,
  );

  expect(prettyPrint(container)).toMatchInlineSnapshot(`
    "[36m<View[39m
      [33mcollapsable[39m=[32m{true}[39m
      [33mpointerEvents[39m=[32m\\"box-none\\"[39m
      [33mstyle[39m=[32m{
        Object {
          \\"flex\\": 1,
        }
      }[39m
    [36m>[39m
      [36m<View>[39m
        [36m<Text>[39m
          [0mHello[0m
        [36m</Text>[39m
        [36m<Text>[39m
          [0mWorld![0m
        [36m</Text>[39m
      [36m</View>[39m
    [36m</View>[39m"
  `);
});

test('it supports truncating the output length', () => {
  const { container } = render(
    <View>
      <Text>Hello World!</Text>
    </View>,
  );

  expect(prettyPrint(container, 5)).toMatch(/\.\.\./);
});

test('it supports removing props from output', () => {
  const { container } = render(
    <View style={{ width: 100 }}>
      <Text>Hello World!</Text>
    </View>,
  );

  expect(prettyPrint(container, undefined, { debug: { omitProps: ['style', 'pointerEvents'] } }))
    .toMatchInlineSnapshot(`
    "[36m<View[39m
      [33mcollapsable[39m=[32m{true}[39m
    [36m>[39m
      [36m<View>[39m
        [36m<Text>[39m
          [0mHello World![0m
        [36m</Text>[39m
      [36m</View>[39m
    [36m</View>[39m"
  `);
});
