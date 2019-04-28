import React from 'react';
import { Text, View } from 'react-native';

import { render } from '../';
import { prettyPrint } from '../pretty-print';

test('it prints correctly with no children', () => {
  const { container } = render(<View />);

  expect(prettyPrint(container.toJSON())).toMatchInlineSnapshot(`"[36m<View />[39m"`);
});

test('it prints correctly with one child', () => {
  const { container } = render(
    <View>
      <Text>Hello World!</Text>
    </View>,
  );

  expect(prettyPrint(container.toJSON())).toMatchInlineSnapshot(`
"[36m<View>[39m
  [36m<Text>[39m
    [0mHello World![0m
  [36m</Text>[39m
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

  expect(prettyPrint(container.toJSON())).toMatchInlineSnapshot(`
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
  const { container } = render(
    <View>
      <Text>Hello World!</Text>
    </View>,
  );

  expect(prettyPrint(container.toJSON(), 5)).toMatch(/\.\.\./);
});
