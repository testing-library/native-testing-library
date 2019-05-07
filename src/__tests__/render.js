import React from 'react';
import { View } from 'react-native';
import { toJSON, render } from '../';

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
  testID="wrapper"
>
  <View
    testID="inner"
  />
</View>
`);
});
