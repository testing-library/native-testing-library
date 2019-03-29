import React from 'react';
import { Button, TextInput, View } from 'react-native';
import { render, fireEvent } from '../';
import { getEventHandlerName } from '../events';
import { NativeEvent } from '../native-event';

const events = [
  // Focus Events
  'focus',
  'blur',
  // Form Events
  'change',
  'changeText',
  'contentSizeChange',
  'endEditing',
  'keyPress',
  'scroll',
  'submitEditing',
  // Layout Events
  'layout',
  // Selection Events
  'selectionChange',
  // Touch Events
  'longPress',
  'press',
  'pressIn',
  'pressOut',
  // Scroll Events
  'momentumScrollBegin',
  'momentumScrollEnd',
  'scroll',
  'scrollBeginDrag',
  'scrollEndDrag',
  // Image Events
  'load',
  'loadEnd',
  'loadStart',
  'error',
  'partialLoad',
  'progress',
];

events.forEach(eventName => {
  describe(`${eventName} Events`, () => {
    const propName = getEventHandlerName(eventName);

    it(`triggers ${propName}`, () => {
      const spy = jest.fn();

      const props = { [propName]: spy };

      const { baseElement } = render(<View {...props} />);

      fireEvent[eventName](baseElement);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

test('onChange works', () => {
  const handleChange = jest.fn();
  const { baseElement } = render(<TextInput onChange={handleChange} />);
  fireEvent.change(baseElement, { target: { value: 'a' } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});

test('calling `fireEvent` directly works too', () => {
  const handleEvent = jest.fn();
  const { baseElement } = render(<Button onPress={handleEvent} title="test" />);
  fireEvent(baseElement, new NativeEvent('press'));
});
