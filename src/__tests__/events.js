import React from 'react';
import { Button, Image, Text, TextInput, TouchableHighlight } from 'react-native';

import { render, fireEvent } from '../';
import { NativeEvent } from '../events';

test('onChange works', () => {
  const handleChange = jest.fn();
  const { baseElement } = render(<TextInput onChange={handleChange} />);
  fireEvent.change(baseElement, { target: { value: 'a' } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});

test('onChangeText works', () => {
  function OnChangeText() {
    const [text, setText] = React.useState('first');

    return <TextInput onChangeText={setText} value={text} testID="input" />;
  }

  const { getByTestId } = render(<OnChangeText />);
  const input = getByTestId('input');

  expect(input.props.value).toBe('first');
  fireEvent.changeText(input, 'second');
  expect(input.props.value).toBe('second');
});

test('calling `fireEvent` directly works too', () => {
  const handleEvent = jest.fn();
  const { baseElement } = render(<Button onPress={handleEvent} title="test" />);

  fireEvent(baseElement, new NativeEvent('press'));
  expect(handleEvent).toBeCalledTimes(1);
});

test('calling a custom event works as well', () => {
  const event = { nativeEvent: { value: 'testing' } };
  const onMyEvent = jest.fn(({ nativeEvent }) => expect(nativeEvent).toEqual({ value: 'testing' }));
  const MyComponent = ({ onMyEvent }) => <TextInput value="test" onChange={onMyEvent} />;

  const { baseElement } = render(<MyComponent onMyEvent={onMyEvent} />);
  fireEvent(baseElement, new NativeEvent('myEvent', event));

  expect(onMyEvent).toHaveBeenCalledWith({
    nativeEvent: { value: 'testing' },
    type: 'CustomEvent',
  });
});

test('calling a handler when there is no valid target throws', () => {
  const handleEvent = jest.fn();
  const { getByTestId } = render(<Image onPress={handleEvent} testID="image" />);
  expect(() => fireEvent.press(getByTestId('image'))).toThrow();
  expect(handleEvent).toBeCalledTimes(0);
});

test('calling a handler if a Button is disabled throws', () => {
  const handleEvent = jest.fn();
  const { getByText } = render(<Button disabled onPress={handleEvent} title="button" />);
  expect(() => fireEvent.press(getByText('button'))).toThrow();
  expect(handleEvent).toBeCalledTimes(0);
});

test('calling a handler if a Touchable is disabled throws', () => {
  const handleEvent = jest.fn();
  const { getByText } = render(
    <TouchableHighlight disabled onPress={jest.fn()}>
      <Text>touchable</Text>
    </TouchableHighlight>,
  );
  expect(() => fireEvent.press(getByText('touchable'))).toThrow();
  expect(handleEvent).toBeCalledTimes(0);
});

test('calling an event that has no defined handler throws', () => {
  const { getByText } = render(<Text>test</Text>);
  expect(() => fireEvent.press(getByText('test'))).toThrow();
});

test('calling an event sets nativeEvent properly', () => {
  const event = { nativeEvent: { value: 'testing' } };
  const onChange = jest.fn(({ nativeEvent }) => expect(nativeEvent).toEqual({ value: 'testing' }));

  const { getByValue } = render(<TextInput value="test" onChange={onChange} />);
  fireEvent.change(getByValue('test'), event);
});
