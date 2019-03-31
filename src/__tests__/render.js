import React from 'react';
import { Text, View } from 'react-native';
import { render } from '../';

test('renders View', () => {
  const ref = React.createRef();
  const { debug } = render(<View ref={ref} />);

  debug(<Text>hi</Text>);
});

test('renders View', () => {
  const ref = React.createRef();
  const { rootInstance } = render(<View ref={ref} />);
  expect(rootInstance.instance).toBe(ref.current);
});

test('returns rootInstance', () => {
  const { rootInstance } = render(<View />);
  expect(rootInstance).toBeTruthy();
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
