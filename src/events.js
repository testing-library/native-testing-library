import { NativeEvent } from './native-event';

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

function getEventHandlerName(key) {
  return `on${key.charAt(0).toUpperCase()}${key.slice(1)}`;
}

function findEventHandler(element, eventName) {
  const eventHandler = getEventHandlerName(eventName);

  if (typeof element.props[eventHandler] === 'function') {
    return element.props[eventHandler];
  }

  if (element.parent === null || element.parent.parent === null) {
    throw new Error(`No handler found for event: ${eventName}`);
  }

  return findEventHandler(element.parent, eventName);
}

function fireEvent(element, event) {
  event.target = findEventHandler(element, event.typeArg);

  return event.target(event.event);
}

events.forEach(key => {
  fireEvent[key] = (node, init) => {
    const event = new NativeEvent(key, init);
    return fireEvent(node, event);
  };
});

export { fireEvent, getEventHandlerName, NativeEvent };
