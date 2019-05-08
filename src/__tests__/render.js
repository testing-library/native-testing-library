import React from 'react';
import { View } from 'react-native';
import { cleanup, toJSON, render } from '../';

afterEach(cleanup);

test('renders View', () => {
  const { container } = render(<View />);
  expect(container).not.toBeNull();
});

test('returns container', () => {
  const { container } = render(<View />);
  expect(container).toBeTruthy();
});

test('renders options.wrapper around node', () => {
  const WrapperComponent = ({ children }) => <View testID="wrapper">{children}</View>;

  const { container, getByTestId } = render(<View testID="inner" />, {
    wrapper: WrapperComponent,
  });

  expect(getByTestId('wrapper')).toBeTruthy();
  expect(toJSON(container)).toMatchInlineSnapshot(`
    <View
      testID="ntl-container"
    >
      <View
        testID="wrapper"
      >
        <View
          testID="inner"
        />
      </View>
    </View>
  `);
});
