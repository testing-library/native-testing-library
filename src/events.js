const eventMap = {
  focus: {
    type: 'FocusEvent',
    validTargets: [
      'TextInput',
      'Touchable',
      'TouchableBounce',
      'TouchableHighlight',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
      'TouchableNativeFeedback',
    ],
  },
  blur: {
    type: 'BlurEvent',
    validTargets: [
      'TextInput',
      'Touchable',
      'TouchableBounce',
      'TouchableHighlight',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
    ],
  },
  change: {
    type: 'ChangeEvent',
    validTargets: [
      'SegmentedControlIOS',
      'PickerIOS',
      'Switch',
      'DatePickerIOS',
      'Checkbox',
      'TextInput',
    ],
  },
  changeText: {
    type: 'ChangeEvent',
    validTargets: ['TextInput'],
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
      'FlatList',
      'Image',
      'KeyboardAvoidingView',
      'ScrollView',
      'ScrollViewStickyHeader',
      'SectionList',
      'Text',
      'TextInput',
      'Touchable',
      'TouchableHighlight',
      'TouchableNativeFeedback',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
      'View',
      'VirtualizedList',
      'WindowedListView',
    ],
  },
  selectionChange: {
    type: 'SelectionChangeEvent',
    validTargets: ['TextInput'],
  },
  longPress: {
    type: 'PressEvent',
    validTargets: [
      'Touchable',
      'TouchableBounce',
      'TouchableHighlight',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
      'TouchableNativeFeedback',
      'Text',
    ],
  },
  press: {
    type: 'PressEvent',
    validTargets: [
      'Button',
      'Touchable',
      'TouchableBounce',
      'TouchableHighlight',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
      'TouchableNativeFeedback',
      'Text',
    ],
  },
  pressIn: {
    type: 'PressEvent',
    validTargets: [
      'Touchable',
      'TouchableBounce',
      'TouchableHighlight',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
      'TouchableNativeFeedback',
      'YellowBoxPressable',
      'Text',
    ],
  },
  pressOut: {
    type: 'PressEvent',
    validTargets: [
      'Touchable',
      'TouchableBounce',
      'TouchableHighlight',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
      'TouchableNativeFeedback',
      'YellowBoxPressable',
      'Text',
    ],
  },
  momentumScrollBegin: {
    type: 'ScrollEvent',
    validTargets: [
      'ScrollResponder',
      'FlatList',
      'ScrollView',
      'SectionList',
      'VirtualizedList',
      'WindowedListView',
    ],
  },
  momentumScrollEnd: {
    type: 'ScrollEvent',
    validTargets: [
      'ScrollResponder',
      'FlatList',
      'ScrollView',
      'SectionList',
      'VirtualizedList',
      'WindowedListView',
    ],
  },
  scroll: {
    type: 'ScrollEvent',
    validTargets: [
      'ScrollResponder',
      'FlatList',
      'ScrollView',
      'SectionList',
      'TextInput',
      'VirtualizedList',
      'WindowedListView',
    ],
  },
  scrollBeginDrag: {
    type: 'ScrollEvent',
    validTargets: [
      'ScrollResponder',
      'FlatList',
      'ScrollView',
      'SectionList',
      'VirtualizedList',
      'WindowedListView',
    ],
  },
  scrollEndDrag: {
    type: 'ScrollEvent',
    validTargets: [
      'ScrollResponder',
      'FlatList',
      'ScrollView',
      'SectionList',
      'VirtualizedList',
      'WindowedListView',
    ],
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
  'Slider',
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
  return (
    list.includes(element.type) ||
    list.includes(element.type.name) ||
    list.includes(element.type.displayName)
  );
}

function isValidTarget(element, event) {
  return event.validTargets.length ? validateElementType(event.validTargets, element) : true;
}

function isDisabled(element) {
  return element.props.disabled && validateElementType(disableableElements, element);
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

  if (element.parent === null || element.parent.parent === null) {
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

export { fireEvent, getEventHandlerName, NativeEvent };
