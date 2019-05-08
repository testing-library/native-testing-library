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

  expect(prettyPrint(toJSON(container))).toMatchSnapshot();
  expect(prettyPrint(toJSON(baseElement))).toMatchSnapshot();
});
