import React from 'react';
import { Text } from 'react-native';

import { render } from '../';
import { prettyPrint } from '../pretty-print';

test('it prints out the given DOM element tree', () => {
  const { container } = render(<Text>Hello World!</Text>);
  expect(prettyPrint(container.toJSON())).toMatchInlineSnapshot(`
"[36m<Text>[39m
  [0mHello World![0m
[36m</Text>[39m"
`);
});

test('it supports truncating the output length', () => {
  const { container } = render(<Text>Hello World!</Text>);
  expect(prettyPrint(container.toJSON(), 5)).toMatch(/\.\.\./);
});
