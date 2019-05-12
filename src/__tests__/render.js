import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { render } from '../';

test('renders View', () => {
  const { container } = render(<View />);
  expect(container).not.toBeNull();
});

test('returns container', () => {
  const { container } = render(<View />);
  expect(container).toBeTruthy();
});

test('renders options.wrapper around node', () => {
  const WrapperComponent = ({ children }) => (
    <SafeAreaView testID="wrapper">{children}</SafeAreaView>
  );

  const { container, getByTestId } = render(<View testID="inner" />, {
    wrapper: WrapperComponent,
  });

  expect(getByTestId('wrapper')).toBeTruthy();
  expect(container).toMatchInlineSnapshot(`
    <View
      collapsable={true}
      pointerEvents="box-none"
      style={
        Object {
          "flex": 1,
        }
      }
    >
      <SafeAreaView
        testID="wrapper"
      >
        <View
          testID="inner"
        />
      </SafeAreaView>
    </View>
  `);
});
