import React from 'react';
import { Text } from 'react-native';

import { render } from '../';

test('rerender will re-render the element', () => {
  const Greeting = props => <Text>{props.message}</Text>;
  const { getByText, rerender } = render(<Greeting message="hi" />);

  const message = getByText('hi');

  //  console.log(message.props.children);
  expect(message.props.children).toEqual('hi');
  rerender(<Greeting message="hey" />);
  expect(message.props.children).toEqual('hey');
});
