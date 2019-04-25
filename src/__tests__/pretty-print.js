import React from 'react';
import { Text, View } from 'react-native';

import { render } from '../';
import { prettyPrint } from '../pretty-print';

test('it prints correctly with no children', () => {
  const { baseElement } = render(<View />);

  expect(prettyPrint(baseElement)).toMatchInlineSnapshot(`"[36m<View />[39m"`);
});

test('it prints correctly with one child', () => {
  const { baseElement } = render(
    <View>
      <Text>Hello World!</Text>
    </View>,
  );

  expect(prettyPrint(baseElement)).toMatchInlineSnapshot(`
"[36m<View>[39m
  [36m<Text>[39m
    [0mHello World![0m
  [36m</Text>[39m
[36m</View>[39m"
`);
});

test('it prints correctly with multiple children', () => {
  const { baseElement } = render(
    <View>
      <Text>Hello</Text>
      <Text>World!</Text>
    </View>,
  );

  expect(prettyPrint(baseElement)).toMatchInlineSnapshot(`
"[36m<View>[39m
  [36m<Text>[39m
    [0mHello[0m
  [36m</Text>[39m
  [36m<Text>[39m
    [0mWorld![0m
  [36m</Text>[39m
[36m</View>[39m"
`);
});

test('it supports truncating the output length', () => {
  const { baseElement } = render(
    <View>
      <Text>Hello World!</Text>
    </View>,
  );

  expect(prettyPrint(baseElement, 5)).toMatch(/\.\.\./);
});
