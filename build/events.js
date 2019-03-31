var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
Object.defineProperty(exports, '__esModule', { value: true });
exports.fireEvent = fireEvent;
exports.getEventHandlerName = getEventHandlerName;
exports.NativeEvent = void 0;
var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));
var eventMap = {
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
  contentSizeChange: {
    type: 'ContentSizeChangeEvent',
    validTargets: ['VirtualizedList', 'FlatList', 'SectionList', 'TextInput', 'ScrollView'],
  },
  endEditing: { type: 'EditingEvent', validTargets: ['TextInput'] },
  keyPress: { type: 'KeyPressEvent', validTargets: ['TextInput'] },
  submitEditing: { type: 'EditingEvent', validTargets: ['TextInput'] },
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
  selectionChange: { type: 'SelectionChangeEvent', validTargets: ['TextInput'] },
  longPress: {
    type: 'PressEvent',
    validTargets: [
      'Touchable',
      'TouchableBounce',
      'TouchableHighlight',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
      'TouchableNativeFeedback',
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
  load: { type: 'ImageLoadEvent', validTargets: ['Image'] },
  error: { type: 'SyntheticEvent', validTargets: ['Image'] },
  progress: { type: 'SyntheticEvent', validTargets: ['Image'] },
};
var NativeEvent = (function() {
  function NativeEvent(typeArg) {
    var eventInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, NativeEvent);
    var config = eventMap[typeArg];
    this.typeArg = typeArg;
    this.nativeEvent = eventInit;
    this.type = config.type;
    this.validTargets = config.validTargets;
  }
  (0, _createClass2.default)(NativeEvent, [
    {
      key: 'target',
      set: function set(target) {
        this._target = target;
      },
      get: function get() {
        return this._target;
      },
    },
  ]);
  return NativeEvent;
})();
exports.NativeEvent = NativeEvent;
function getEventHandlerName(key) {
  return 'on' + key.charAt(0).toUpperCase() + key.slice(1);
}
function isValidTarget(element, event) {
  return (
    event.validTargets.includes(element.type) ||
    event.validTargets.includes(element.type.name) ||
    event.validTargets.includes(element.type.displayName)
  );
}
function findEventHandler(element, event) {
  var typeArg = event.typeArg;
  var eventHandler = getEventHandlerName(typeArg);
  var isValid = isValidTarget(element, event);
  if (typeof element.props[eventHandler] === 'function' && isValid) {
    return element.props[eventHandler];
  }
  if (element.parent === null || element.parent.parent === null) {
    throw new Error('No handler found for event: ' + typeArg);
  }
  return findEventHandler(element.parent, event);
}
function fireEvent(element, event) {
  event.target = findEventHandler(element, event);
  return event.target(event);
}
Object.keys(eventMap).forEach(function(key) {
  fireEvent[key] = function(node, init) {
    return fireEvent(node, new NativeEvent(key, init));
  };
});
