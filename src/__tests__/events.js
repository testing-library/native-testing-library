import React from 'react';
import 'jest-native/extend-expect';
import { Button, Image, Text, TextInput, TouchableHighlight } from 'react-native';

import { cleanup, render, fireEvent, eventMap, NativeEvent, getEventHandlerName, wait } from '../';

afterEach(cleanup);

Object.keys(eventMap).forEach(key => {
  const handlerName = getEventHandlerName(key);

  describe(`${handlerName}`, () => {
    const config = eventMap[key];

    config.validTargets.forEach(element => {
      const spy = jest.fn();

      const { getByTestId } = render(
        React.createElement(element, {
          [handlerName]: spy,
        }),
      );

      const target = getByTestId('ntl-container').children[0];
      fireEvent[key](target);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

test('onChange works', () => {
  const handleChange = jest.fn();
  const { getByTestId } = render(<TextInput onChange={handleChange} />);
  const target = getByTestId('ntl-container').children[0];
  fireEvent.change(target, { target: { value: 'a' } });
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

test('assigns target properties', async () => {
  class MyComponent extends React.Component {
    state = { value: '' };
    onChange = ({ nativeEvent }) => {
      this.setState({ value: nativeEvent.text });
      this.props.onChange();
    };
    render() {
      return <TextInput testID="input" value={this.state.value} onChange={this.onChange} />;
    }
  }

  const spy = jest.fn();
  const value = 'a';
  const { getByTestId } = render(<MyComponent onChange={spy} />);
  const input = getByTestId('input');
  fireEvent.change(input, { nativeEvent: { text: value } });
  expect(spy).toHaveBeenCalledTimes(1);
  await wait(() => expect(input.props.value).toBe(value));
});

test('calling `fireEvent` directly works too', () => {
  const handleEvent = jest.fn();
  const { getByTestId } = render(<Button onPress={handleEvent} title="test" />);

  const target = getByTestId('ntl-container').children[0];
  fireEvent(target, new NativeEvent('press'));
  expect(handleEvent).toBeCalledTimes(1);
});

test('calling a custom event works as well', () => {
  const event = { nativeEvent: { value: 'testing' } };
  const onMyEvent = jest.fn(({ nativeEvent }) => expect(nativeEvent).toEqual({ value: 'testing' }));
  const MyComponent = ({ onMyEvent }) => <TextInput value="test" onChange={onMyEvent} />;

  const { getByTestId } = render(<MyComponent onMyEvent={onMyEvent} />);
  const target = getByTestId('ntl-container').children[0];
  fireEvent(target, new NativeEvent('myEvent', event));

  expect(onMyEvent).toHaveBeenCalledWith({
    nativeEvent: { value: 'testing' },
    type: 'CustomEvent',
  });
});

test('calling a handler when there is no valid target does not work', () => {
  const handleEvent = jest.fn();
  const { getByTestId } = render(<Image onPress={handleEvent} testID="image" />);
  expect(() => fireEvent.press(getByTestId('image'))).not.toThrow();
  expect(handleEvent).toBeCalledTimes(0);
});

test('calling a handler if a Button is disabled does not work', () => {
  const handleEvent = jest.fn();
  const { getByText } = render(<Button disabled onPress={handleEvent} title="button" />);
  expect(() => fireEvent.press(getByText('button'))).not.toThrow();
  expect(handleEvent).toBeCalledTimes(0);
});

test('calling a handler if a Touchable is disabled does not work', () => {
  const handleEvent = jest.fn();
  const { getByText } = render(
    <TouchableHighlight disabled onPress={jest.fn()}>
      <Text>touchable</Text>
    </TouchableHighlight>,
  );
  expect(() => fireEvent.press(getByText('touchable'))).not.toThrow();
  expect(handleEvent).toBeCalledTimes(0);
});

test('calling an event that has no defined handler throws', () => {
  const { getByText } = render(<Text>test</Text>);
  expect(() => fireEvent.press(getByText('test'))).not.toThrow();
});

test('calling an event sets nativeEvent properly', () => {
  const event = { nativeEvent: { value: 'testing' } };
  const onChange = jest.fn(({ nativeEvent }) => expect(nativeEvent).toEqual({ value: 'testing' }));

  const { getByDisplayValue } = render(<TextInput value="test" onChange={onChange} />);
  fireEvent.change(getByDisplayValue('test'), event);
});
