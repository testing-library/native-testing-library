import React from 'react';
import 'jest-native/extend-expect';
import { Text } from 'react-native';

import { cleanup, render } from '../';

afterEach(cleanup);

test('rerender will re-render the element', () => {
  const Greeting = props => <Text>{props.message}</Text>;
  const { getByText, rerender } = render(<Greeting message="hi" />);

  const message = getByText('hi');

  expect(message).toHaveTextContent('hi');
  rerender(<Greeting message="hey" />);
  expect(message).toHaveTextContent('hey');
});
