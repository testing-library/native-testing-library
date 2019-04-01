import React from 'react';
import { Text, View } from 'react-native';
import { render } from '../../src';

let idCounter = 1;

class NumberDisplay extends React.Component {
  id = idCounter++;
  render() {
    return (
      <View>
        <Text testID="number-display">{this.props.number}</Text>
        <Text testID="instance-id">{this.id}</Text>
      </View>
    );
  }
}

test('calling render with the same component on the same container does not remount', () => {
  const { getByTestId, rerender } = render(<NumberDisplay number={1} />);
  expect(getByTestId('number-display').props.children).toEqual(1);

  rerender(<NumberDisplay number={2} />);
  expect(getByTestId('number-display').props.children).toEqual(2);

  expect(getByTestId('instance-id').props.children).toEqual(1);
});
