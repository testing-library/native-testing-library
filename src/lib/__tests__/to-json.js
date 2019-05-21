import React from 'react';
import { Text, View } from 'react-native';

import { cleanup, prettyPrint, render, toJSON } from '../../';

afterEach(cleanup);

test('it converts to json', () => {
  function ParentComponent({ children }) {
    return <View>{children}</View>;
  }

  function MiddleComponent({ children }) {
    return (
      <View>
        <Text>{children}</Text>
      </View>
    );
  }

  const { baseElement, container } = render(
    <ParentComponent>
      <View>
        <MiddleComponent>hello</MiddleComponent>
        <View>
          <Text onPress={jest.fn()}>world</Text>
          <Text>foo bar</Text>
        </View>
        <View />
      </View>
    </ParentComponent>,
  );

  expect(prettyPrint(container)).toMatchSnapshot();
  expect(prettyPrint(baseElement)).toMatchSnapshot();
});

test('it handles an no argument', () => {
  expect(toJSON()).toBeNull();
});

test('it handles hidden nodes', () => {
  expect(toJSON({ _fiber: { stateNode: { isHidden: true } } })).toBeNull();
});

test('it handles invalid nodes', () => {
  expect(() => toJSON({ _fiber: { stateNode: { tag: 'FAKE' } } })).toThrow();
});
