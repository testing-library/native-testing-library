var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');
Object.defineProperty(exports, '__esModule', { value: true });
var _exportNames = {
  fireEvent: true,
  render: true,
  act: true,
  queries: true,
  queryHelpers: true,
  NativeEvent: true,
  getDefaultNormalizer: true,
};
exports.fireEvent = fireEvent;
exports.render = render;
Object.defineProperty(exports, 'act', {
  enumerable: true,
  get: function get() {
    return _actCompat.default;
  },
});
Object.defineProperty(exports, 'NativeEvent', {
  enumerable: true,
  get: function get() {
    return _events.NativeEvent;
  },
});
Object.defineProperty(exports, 'getDefaultNormalizer', {
  enumerable: true,
  get: function get() {
    return _matches.getDefaultNormalizer;
  },
});
exports.queryHelpers = exports.queries = void 0;
var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread'));
var _react = _interopRequireDefault(require('react'));
var _reactTestRenderer = _interopRequireDefault(require('react-test-renderer'));
var _actCompat = _interopRequireDefault(require('./act-compat'));
var queries = _interopRequireWildcard(require('./queries'));
exports.queries = queries;
Object.keys(queries).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return queries[key];
    },
  });
});
var _prettyPrint = require('./pretty-print');
Object.keys(_prettyPrint).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _prettyPrint[key];
    },
  });
});
var queryHelpers = _interopRequireWildcard(require('./query-helpers'));
exports.queryHelpers = queryHelpers;
Object.keys(queryHelpers).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return queryHelpers[key];
    },
  });
});
var _events = require('./events');
Object.keys(_events).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _events[key];
    },
  });
});
var _getQueriesForElement = require('./get-queries-for-element');
Object.keys(_getQueriesForElement).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getQueriesForElement[key];
    },
  });
});
var _getNodeText = require('./get-node-text');
Object.keys(_getNodeText).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getNodeText[key];
    },
  });
});
var _wait = require('./wait');
Object.keys(_wait).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _wait[key];
    },
  });
});
var _waitForElement = require('./wait-for-element');
Object.keys(_waitForElement).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _waitForElement[key];
    },
  });
});
var _matches = require('./matches');
var _jsxFileName = '/Users/Brandon/Projects/testing-library/rntl/src/index.js';
function render(ui) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? {} : _ref$options,
    WrapperComponent = _ref.wrapper;
  var wrapUiIfNeeded = function wrapUiIfNeeded(innerElement) {
    return WrapperComponent
      ? _react.default.createElement(
          WrapperComponent,
          { __source: { fileName: _jsxFileName, lineNumber: 13 } },
          innerElement,
        )
      : innerElement;
  };
  var instance = {};
  (0, _actCompat.default)(function() {
    instance = _reactTestRenderer.default.create(wrapUiIfNeeded(ui), options);
  });
  return (0, _objectSpread2.default)(
    {
      baseElement: instance.root,
      container: instance,
      debug: function debug() {
        var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : instance;
        return console.log((0, _prettyPrint.prettyPrint)(el.toJSON()));
      },
      unmount: function unmount() {
        return instance.unmount();
      },
      rerender: function rerender(rerenderUi) {
        instance.update(wrapUiIfNeeded(rerenderUi));
      },
    },
    (0, _getQueriesForElement.getQueriesForElement)(instance),
  );
}
function fireEvent() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var returnValue;
  (0, _actCompat.default)(function() {
    returnValue = _events.fireEvent.apply(void 0, args);
  });
  return returnValue;
}
Object.keys(_events.fireEvent).forEach(function(key) {
  fireEvent[key] = function() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var returnValue;
    (0, _actCompat.default)(function() {
      returnValue = _events.fireEvent[key].apply(_events.fireEvent, args);
    });
    return returnValue;
  };
});
