import React from 'react';
import { Text, View } from 'react-native';
import { queryAllByProp, render } from '../';

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

  const { testRenderer, getByTestId } = render(<View testID="inner" />, {
    wrapper: WrapperComponent,
  });

  expect(getByTestId('wrapper')).toBeTruthy();
  expect(testRenderer.toJSON()).toMatchInlineSnapshot(`
<View
  testID="wrapper"
>
  <View
    testID="inner"
  />
</View>
`);
});
