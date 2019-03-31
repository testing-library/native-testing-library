import React from 'react';
import { Button, Image, Text, TextInput } from 'react-native';

import { render, fireEvent } from '../';
import { NativeEvent } from '../events';

test('onChange works', () => {
  const handleChange = jest.fn();
  const { rootInstance } = render(<TextInput onChange={handleChange} />);
  fireEvent.change(rootInstance, { target: { value: 'a' } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});

test('calling `fireEvent` directly works too', () => {
  const handleEvent = jest.fn();
  const { rootInstance } = render(<Button onPress={handleEvent} title="test" />);
  fireEvent(rootInstance, new NativeEvent('press'));
});

test('calling a handler when there is no valid target throws', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<Image onPress={spy} testID="image" />);
  expect(() => fireEvent.press(getByTestId('image'))).toThrow();
  expect(spy).toBeCalledTimes(0);
});

test('calling an event that has no defined handler throws', () => {
  const { getByText } = render(<Text>test</Text>);
  expect(() => fireEvent.press(getByText('test'))).toThrow();
});

test('calling an event sets nativeEvent properly', () => {
  const event = { value: 'testing' };
  const onChange = jest.fn(({ nativeEvent }) => expect(nativeEvent).toEqual(event));

  const { getByValue } = render(<TextInput value="test" onChange={onChange} />);
  fireEvent.change(getByValue('test'), event);
});
