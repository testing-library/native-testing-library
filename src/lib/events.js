const eventMap = {
  focus: {
    type: 'FocusEvent',
    validTargets: [
      'TextInput',
      'TouchableHighlight',
      'TouchableNativeFeedback',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
    ],
  },
  blur: {
    type: 'BlurEvent',
    validTargets: [
      'TextInput',
      'TouchableHighlight',
      'TouchableNativeFeedback',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
    ],
  },
  change: {
    type: 'ChangeEvent',
    validTargets: ['Switch', 'TextInput'],
  },
  changeText: {
    type: 'ChangeEvent',
    validTargets: ['TextInput'],
  },
  valueChange: {
    type: 'ChangeEvent',
    validTargets: ['Picker'],
  },
  contentSizeChange: {
    type: 'ContentSizeChangeEvent',
    validTargets: ['VirtualizedList', 'FlatList', 'SectionList', 'TextInput', 'ScrollView'],
  },
  endEditing: {
    type: 'EditingEvent',
    validTargets: ['TextInput'],
  },
  keyPress: {
    type: 'KeyPressEvent',
    validTargets: ['TextInput'],
  },
  submitEditing: {
    type: 'EditingEvent',
    validTargets: ['TextInput'],
  },
  layout: {
    type: 'LayoutEvent',
    validTargets: [
      'ActivityIndicator',
      'Button',
      'DrawerLayoutAndroid',
      'Image',
      'Modal',
      'RefreshControl',
      'ScrollView',
      'Switch',
      'Text',
      'TextInput',
      'TouchableHighlight',
      'TouchableNativeFeedback',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
      'View',
    ],
  },
  selectionChange: {
    type: 'SelectionChangeEvent',
    validTargets: ['TextInput'],
  },
  longPress: {
    type: 'PressEvent',
    validTargets: [
      'Text',
      'TouchableHighlight',
      'TouchableNativeFeedback',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
    ],
  },
  press: {
    type: 'PressEvent',
    validTargets: [
      'Button',
      'Text',
      'TouchableHighlight',
      'TouchableNativeFeedback',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
    ],
  },
  pressIn: {
    type: 'PressEvent',
    validTargets: [
      'Text',
      'TouchableHighlight',
      'TouchableNativeFeedback',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
    ],
  },
  pressOut: {
    type: 'PressEvent',
    validTargets: [
      'Text',
      'TouchableHighlight',
      'TouchableNativeFeedback',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
    ],
  },
  momentumScrollBegin: {
    type: 'ScrollEvent',
    validTargets: ['FlatList', 'ScrollView', 'SectionList', 'VirtualizedList'],
  },
  momentumScrollEnd: {
    type: 'ScrollEvent',
    validTargets: ['FlatList', 'ScrollView', 'SectionList', 'VirtualizedList'],
  },
  scroll: {
    type: 'ScrollEvent',
    validTargets: ['FlatList', 'ScrollView', 'SectionList', 'TextInput', 'VirtualizedList'],
  },
  scrollBeginDrag: {
    type: 'ScrollEvent',
    validTargets: ['FlatList', 'ScrollView', 'SectionList', 'VirtualizedList'],
  },
  scrollEndDrag: {
    type: 'ScrollEvent',
    validTargets: ['FlatList', 'ScrollView', 'SectionList', 'VirtualizedList'],
  },
  load: {
    type: 'ImageLoadEvent',
    validTargets: ['Image'],
  },
  error: {
    type: 'SyntheticEvent',
    validTargets: ['Image'],
  },
  progress: {
    type: 'SyntheticEvent',
    validTargets: ['Image'],
  },

  // Custom events, like a component onWhatever callback
  custom: {
    type: 'CustomEvent',
    validTargets: [],
  },
};

const disableableElements = [
  'Button',
  'Switch',
  'TouchableHighlight',
  'TouchableNativeFeedback',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
];

class NativeEvent {
  constructor(typeArg, event = {}) {
    const config = eventMap[typeArg] || eventMap.custom;
    const { validTargets = [], ...rest } = event;

    this.typeArg = typeArg;
    this.event = typeof event === 'object' ? { type: config.type, ...rest } : event;
    this.validTargets = [...config.validTargets, ...validTargets];
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
  const propDisabled = disabled;
  const stateDisabled = Array.from(accessibilityStates).includes('disabled');

  return (propDisabled || stateDisabled) && validateElementType(disableableElements, element);
}

function findEventHandler(element, event) {
  const { typeArg } = event;
  const eventHandler = getEventHandlerName(typeArg);
  const valid = isValidTarget(element, event);
  const disabled = isDisabled(element);

  if (typeof element.props[eventHandler] === 'function' && valid) {
    if (disabled) {
      throw new Error(`A target was found for event: "${typeArg}", but the target is disabled`);
    }
    return element.props[eventHandler];
  }

  if (element.parent === null) {
    throw new Error(`No target found for event: "${typeArg}"`);
  }

  return findEventHandler(element.parent, event);
}

function fireEvent(element, event) {
  event.target = findEventHandler(element, event);

  return event.target(event.event);
}

Object.keys(eventMap).forEach(key => {
  fireEvent[key] = (node, init) => {
    return fireEvent(node, new NativeEvent(key, init));
  };
});

export { eventMap, fireEvent, getEventHandlerName, NativeEvent };
