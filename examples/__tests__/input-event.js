import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { render, fireEvent } from '../../src';

class CostInput extends React.Component {
  state = {
    value: '',
  };

  removeDollarSign = value => (value[0] === '$' ? value.slice(1) : value);
  getReturnValue = value => (value === '' ? '' : `$${value}`);
  handleChange = ({ nativeEvent }) => {
    const text = nativeEvent.text;
    const noDollarSign = this.removeDollarSign(text);
    if (isNaN(noDollarSign)) return;
    this.setState({ value: this.getReturnValue(noDollarSign) });
  };

  render() {
    return (
      <TextInput
        value={this.state.value}
        accessibilityLabel="cost-input"
        onChange={this.handleChange}
      />
    );
  }
}

const setup = () => {
  const utils = render(<CostInput />);
  const input = utils.getByA11yLabel('cost-input');
  return {
    input,
    ...utils,
  };
};

test('It should keep a $ in front of the input', () => {
  const { input } = setup();
  fireEvent.change(input, { text: 23 });
  expect(input.props.value).toBe('$23');
});
test('It should allow a $ to be in the input when the value is changed', () => {
  const { input } = setup();
  fireEvent.change(input, { text: '$23.0' });
  expect(input.props.value).toBe('$23.0');
});

test('It should not allow letters to be inputted', () => {
  const { input } = setup();
  expect(input.props.value).toBe(''); // empty before
  fireEvent.change(input, { text: 'Good Day' });
  expect(input.props.value).toBe(''); //empty after
});

test('It should allow the $ to be deleted', () => {
  const { input } = setup();
  fireEvent.change(input, { text: '23' });
  expect(input.props.value).toBe('$23'); // need to make a change so React registers "" as a change
  fireEvent.change(input, { text: '' });
  expect(input.props.value).toBe('');
});