const viewEvents = [
  'accessibilityEscape',
  'accessibilityTap',
  'layout',
  'magicTap',
  'moveShouldSetResponder',
  'moveShouldSetResponderCapture',
  'responderGrant',
  'responderMove',
  'responderReject',
  'responderRelease',
  'responderTerminate',
  'responderTerminationRequest',
  'startShouldSetResponder',
  'startShouldSetResponderCapture',
];

const eventMap = {
  ActivityIndicator: [...viewEvents],
  Button: ['layout', 'press'],
  DrawerLayoutAndroid: [
    ...viewEvents,
    'drawerClose',
    'drawerOpen',
    'drawerSlide',
    'drawerStateChanged',
  ],
  Image: ['error', 'layout', 'load', 'loadEnd', 'loadStart', 'partialLoad', 'progress'],
  Modal: ['dismiss', 'orientationChange', 'requestClose', 'show'],
  RefreshControl: [...viewEvents, 'refresh'],
  SafeAreaView: [...viewEvents],
  ScrollView: [
    ...viewEvents,
    'contentSizeChange',
    'momentumScrollBegin',
    'momentumScrollEnd',
    'scroll',
    'scrollBeginDrag',
    'scrollEndDrag',
  ],
  Switch: [...viewEvents, 'valueChange'],
  Text: ['layout', 'longPress', 'press'],
  TextInput: [
    ...viewEvents,
    'blur',
    'change',
    'changeText',
    'contentSizeChange',
    'endEditing',
    'focus',
    'keyPress',
    'scroll',
    'selectionChange',
    'submitEditing',
  ],
  TouchableHighlight: [
    'blur',
    'focus',
    'hideUnderlay',
    'layout',
    'longPress',
    'press',
    'pressIn',
    'pressOut',
    'showUnderlay',
  ],
  TouchableNativeFeedback: ['blur', 'focus', 'layout', 'longPress', 'press', 'pressIn', 'pressOut'],
  TouchableOpacity: ['blur', 'focus', 'layout', 'longPress', 'press', 'pressIn', 'pressOut'],
  TouchableWithoutFeedback: [
    'blur',
    'focus',
    'layout',
    'longPress',
    'press',
    'pressIn',
    'pressOut',
  ],
  View: viewEvents,
};

class NativeTestEvent {
  constructor(typeArg, ...args) {
    this.args = args;
    this.typeArg = typeArg;
    this.validTargets = Object.keys(eventMap).filter(c => eventMap[c].includes(typeArg));
  }

  set target(target) {
    this._target = target;
  }

  get target() {
    return this._target;
  }
}

function getEventHandlerName(key) {
  return `on${key.charAt(0).toUpperCase()}${key.slice(1)}`;
}

function validateElementType(list, element) {
  return list.includes(element.type) || list.includes(element.type.displayName);
}

function isValidTarget(element, event) {
  return event.validTargets.length ? validateElementType(event.validTargets, element) : true;
}

function isDisabled(element) {
  const { accessibilityStates = [], disabled } = element.props;
  return disabled || accessibilityStates.includes('disabled');
}

function findEventTarget(element, event) {
  const { typeArg } = event;
  const handlerName = getEventHandlerName(typeArg);
  const eventHandler = element.props[handlerName];

  if (eventHandler && !isDisabled(element) && isValidTarget(element, event)) {
    return eventHandler;
  }

  return element.parent ? findEventTarget(element.parent, event) : null;
}

function fireEvent(element, event) {
  event.target = findEventTarget(element, event);

  if (event.target) event.target(...event.args);

  return event.target;
}

const eventList = Object.keys(eventMap).reduce((list, name) => {
  return [...list, ...eventMap[name].filter(event => !list.includes(event))];
}, []);

eventList.forEach(typeArg => {
  fireEvent[typeArg] = (node, ...args) => {
    return fireEvent(node, new NativeTestEvent(typeArg, ...args));
  };
});

export { eventMap, fireEvent, getEventHandlerName, NativeTestEvent };
