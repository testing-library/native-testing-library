import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';

import { cleanup, render } from '../';

afterEach(cleanup);

test('renders View', () => {
  const { container } = render(<View />);
  expect(container).not.toBeNull();
});

test('returns container', () => {
  const { container } = render(<View />);
  expect(container).toBeTruthy();
});

it('supports fragments', () => {
  class Test extends React.Component {
    render() {
      return (
        <View>
          <Text>Fragments are pretty cool!</Text>
        </View>
      );
    }
  }

  const { asJSON, unmount } = render(<Test />);
  expect(asJSON()).toMatchSnapshot();
  unmount();
  expect(asJSON()).toBeNull();
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
