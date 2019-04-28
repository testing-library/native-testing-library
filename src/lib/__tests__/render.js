import React from 'react';
import { View } from 'react-native';
import { render } from '../';

test('renders View', () => {
  const { baseElement } = render(<View />);
  expect(baseElement).not.toBeNull();
});

test('returns baseElement', () => {
  const { baseElement } = render(<View />);
  expect(baseElement).toBeTruthy();
});

test('renders options.wrapper around node', () => {
  const WrapperComponent = ({ children }) => <View testID="wrapper">{children}</View>;

  const { container, getByTestId } = render(<View testID="inner" />, {
    wrapper: WrapperComponent,
  });

  expect(getByTestId('wrapper')).toBeTruthy();
  expect(container.toJSON()).toMatchInlineSnapshot(`
<View
  testID="wrapper"
>
  <View
    testID="inner"
  />
</View>
`);
});
