var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
Object.defineProperty(exports, '__esModule', { value: true });
exports.getByPlaceholder = getByPlaceholder;
exports.getAllByPlaceholder = getAllByPlaceholder;
exports.queryByText = queryByText;
exports.queryAllByText = queryAllByText;
exports.getByText = getByText;
exports.getAllByText = getAllByText;
exports.getByA11yLabel = getByA11yLabel;
exports.getAllByA11yLabel = getAllByA11yLabel;
exports.getByTestId = getByTestId;
exports.getAllByTestId = getAllByTestId;
exports.getByValue = getByValue;
exports.getAllByValue = getAllByValue;
exports.getAllByA11yRole = getAllByA11yRole;
exports.getByA11yRole = getByA11yRole;
exports.queryAllByA11yRole = exports.queryByA11yRole = exports.queryAllByValue = exports.queryByValue = exports.queryAllByTestId = exports.queryByTestId = exports.queryAllByA11yLabel = exports.queryByA11yLabel = exports.findAllByText = exports.findByText = exports.queryAllByPlaceholder = exports.queryByPlaceholder = exports.findAllByTestId = exports.findByTestId = exports.findAllByA11yRole = exports.findByA11yRole = exports.findAllByValue = exports.findByValue = exports.findAllByPlaceholder = exports.findByPlaceholder = exports.findAllByA11yLabel = exports.findByA11yLabel = void 0;
var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray'),
);
var _react = _interopRequireDefault(require('react'));
var _reactNative = require('react-native');
var _getNodeText = require('./get-node-text');
var _waitForElement = require('./wait-for-element');
var _matches = require('./matches');
var _queryHelpers = require('./query-helpers');
var queryByA11yLabel = _queryHelpers.queryByProp.bind(null, 'accessibilityLabel');
exports.queryByA11yLabel = queryByA11yLabel;
var queryAllByA11yLabel = _queryHelpers.queryAllByProp.bind(null, 'accessibilityLabel');
exports.queryAllByA11yLabel = queryAllByA11yLabel;
var queryByPlaceholder = _queryHelpers.queryByProp.bind(null, 'placeholder');
exports.queryByPlaceholder = queryByPlaceholder;
var queryAllByPlaceholder = _queryHelpers.queryAllByProp.bind(null, 'placeholder');
exports.queryAllByPlaceholder = queryAllByPlaceholder;
var queryByTestId = _queryHelpers.queryByProp.bind(null, 'testID');
exports.queryByTestId = queryByTestId;
var queryAllByTestId = _queryHelpers.queryAllByProp.bind(null, 'testID');
exports.queryAllByTestId = queryAllByTestId;
var queryByValue = _queryHelpers.queryByProp.bind(null, 'value');
exports.queryByValue = queryByValue;
var queryAllByValue = _queryHelpers.queryAllByProp.bind(null, 'value');
exports.queryAllByValue = queryAllByValue;
var queryByA11yRole = _queryHelpers.queryByProp.bind(null, 'accessibilityRole');
exports.queryByA11yRole = queryByA11yRole;
var queryAllByA11yRole = _queryHelpers.queryAllByProp.bind(null, 'accessibilityRole');
exports.queryAllByA11yRole = queryAllByA11yRole;
function queryAllByText(_ref, text) {
  var container = _ref.container;
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref2$types = _ref2.types,
    types = _ref2$types === void 0 ? [_reactNative.Text, _reactNative.TextInput] : _ref2$types,
    _ref2$exact = _ref2.exact,
    exact = _ref2$exact === void 0 ? true : _ref2$exact,
    collapseWhitespace = _ref2.collapseWhitespace,
    trim = _ref2.trim,
    normalizer = _ref2.normalizer;
  var matcher = exact ? _matches.matches : _matches.fuzzyMatches;
  var matchNormalizer = (0, _matches.makeNormalizer)({
    collapseWhitespace: collapseWhitespace,
    trim: trim,
    normalizer: normalizer,
  });
  var baseArray = types.reduce(function(accumulator, currentValue) {
    return [].concat(
      (0, _toConsumableArray2.default)(accumulator),
      (0, _toConsumableArray2.default)(container.findAllByType(currentValue)),
    );
  }, []);
  return (0, _toConsumableArray2.default)(baseArray).filter(function(node) {
    return matcher((0, _getNodeText.getNodeText)(node), node, text, matchNormalizer);
  });
}
function queryByText() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _queryHelpers.firstResultOrNull.apply(void 0, [queryAllByText].concat(args));
}
function getAllByTestId(_ref3, id) {
  var container = _ref3.container,
    testInstance = _ref3.testInstance;
  for (
    var _len2 = arguments.length, rest = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2;
    _key2 < _len2;
    _key2++
  ) {
    rest[_key2 - 2] = arguments[_key2];
  }
  var els = queryAllByTestId.apply(
    void 0,
    [{ container: container, testInstance: testInstance }, id].concat(rest),
  );
  if (!els.length) {
    throw (0, _queryHelpers.getElementError)(
      'Unable to find an element with the testID: ' + id,
      testInstance,
    );
  }
  return els;
}
function getByTestId() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }
  return _queryHelpers.firstResultOrNull.apply(void 0, [getAllByTestId].concat(args));
}
function getAllByA11yRole(_ref4, value) {
  var container = _ref4.container,
    testInstance = _ref4.testInstance;
  for (
    var _len4 = arguments.length, rest = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2;
    _key4 < _len4;
    _key4++
  ) {
    rest[_key4 - 2] = arguments[_key4];
  }
  var els = queryAllByA11yRole.apply(
    void 0,
    [{ container: container, testInstance: testInstance }, value].concat(rest),
  );
  if (!els.length) {
    throw (0, _queryHelpers.getElementError)(
      'Unable to find an element by accessibilityRole="' + value + '".',
      testInstance,
    );
  }
  return els;
}
function getByA11yRole() {
  for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }
  return _queryHelpers.firstResultOrNull.apply(void 0, [getAllByA11yRole].concat(args));
}
function getAllByValue(_ref5, value) {
  var container = _ref5.container,
    testInstance = _ref5.testInstance;
  for (
    var _len6 = arguments.length, rest = new Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2;
    _key6 < _len6;
    _key6++
  ) {
    rest[_key6 - 2] = arguments[_key6];
  }
  var els = queryAllByValue.apply(
    void 0,
    [{ container: container, testInstance: testInstance }, value].concat(rest),
  );
  if (!els.length) {
    throw (0, _queryHelpers.getElementError)(
      'Unable to find an element with the value: ' + value + '.',
      testInstance,
    );
  }
  return els;
}
function getByValue() {
  for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    args[_key7] = arguments[_key7];
  }
  return _queryHelpers.firstResultOrNull.apply(void 0, [getAllByValue].concat(args));
}
function getAllByA11yLabel(_ref6, text) {
  var container = _ref6.container,
    testInstance = _ref6.testInstance;
  for (
    var _len8 = arguments.length, rest = new Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2;
    _key8 < _len8;
    _key8++
  ) {
    rest[_key8 - 2] = arguments[_key8];
  }
  var els = queryAllByA11yLabel.apply(
    void 0,
    [{ container: container, testInstance: testInstance }, text].concat(rest),
  );
  if (!els.length) {
    throw (0, _queryHelpers.getElementError)(
      'Unable to find an element by accessibilityLabel="' + text + '"',
      testInstance,
    );
  }
  return els;
}
function getByA11yLabel() {
  for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    args[_key9] = arguments[_key9];
  }
  return _queryHelpers.firstResultOrNull.apply(void 0, [getAllByA11yLabel].concat(args));
}
function getAllByPlaceholder(_ref7, text) {
  var container = _ref7.container,
    testInstance = _ref7.testInstance;
  for (
    var _len10 = arguments.length, rest = new Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2;
    _key10 < _len10;
    _key10++
  ) {
    rest[_key10 - 2] = arguments[_key10];
  }
  var els = queryAllByPlaceholder.apply(
    void 0,
    [{ container: container, testInstance: testInstance }, text].concat(rest),
  );
  if (!els.length) {
    throw (0, _queryHelpers.getElementError)(
      'Unable to find an element with the placeholder text of: ' + text,
      testInstance,
    );
  }
  return els;
}
function getByPlaceholder() {
  for (
    var _len11 = arguments.length, args = new Array(_len11), _key11 = 0;
    _key11 < _len11;
    _key11++
  ) {
    args[_key11] = arguments[_key11];
  }
  return _queryHelpers.firstResultOrNull.apply(void 0, [getAllByPlaceholder].concat(args));
}
function getAllByText(_ref8, text) {
  var container = _ref8.container,
    testInstance = _ref8.testInstance;
  for (
    var _len12 = arguments.length, rest = new Array(_len12 > 2 ? _len12 - 2 : 0), _key12 = 2;
    _key12 < _len12;
    _key12++
  ) {
    rest[_key12 - 2] = arguments[_key12];
  }
  var els = queryAllByText.apply(
    void 0,
    [{ container: container, testInstance: testInstance }, text].concat(rest),
  );
  if (!els.length) {
    throw (0, _queryHelpers.getElementError)(
      'Unable to find an element with the text: ' +
        text +
        '. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.',
      testInstance,
    );
  }
  return els;
}
function getByText() {
  for (
    var _len13 = arguments.length, args = new Array(_len13), _key13 = 0;
    _key13 < _len13;
    _key13++
  ) {
    args[_key13] = arguments[_key13];
  }
  return _queryHelpers.firstResultOrNull.apply(void 0, [getAllByText].concat(args));
}
function makeFinder(getter) {
  return function(defaultInstance, text, options, waitForElementOptions) {
    return (0, _waitForElement.waitForElement)(function() {
      var instance =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultInstance;
      return getter(instance, text, options);
    }, waitForElementOptions);
  };
}
var findByA11yLabel = makeFinder(getByA11yLabel);
exports.findByA11yLabel = findByA11yLabel;
var findAllByA11yLabel = makeFinder(getAllByA11yLabel);
exports.findAllByA11yLabel = findAllByA11yLabel;
var findByPlaceholder = makeFinder(getByPlaceholder);
exports.findByPlaceholder = findByPlaceholder;
var findAllByPlaceholder = makeFinder(getAllByPlaceholder);
exports.findAllByPlaceholder = findAllByPlaceholder;
var findByText = makeFinder(getByText);
exports.findByText = findByText;
var findAllByText = makeFinder(getAllByText);
exports.findAllByText = findAllByText;
var findByValue = makeFinder(getByValue);
exports.findByValue = findByValue;
var findAllByValue = makeFinder(getAllByValue);
exports.findAllByValue = findAllByValue;
var findByA11yRole = makeFinder(getByA11yRole);
exports.findByA11yRole = findByA11yRole;
var findAllByA11yRole = makeFinder(getAllByA11yRole);
exports.findAllByA11yRole = findAllByA11yRole;
var findByTestId = makeFinder(getByTestId);
exports.findByTestId = findByTestId;
var findAllByTestId = makeFinder(getAllByTestId);
exports.findAllByTestId = findAllByTestId;
