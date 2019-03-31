var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
Object.defineProperty(exports, '__esModule', { value: true });
exports.wait = wait;
var _waitForExpect = _interopRequireDefault(require('wait-for-expect'));
function wait() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function() {};
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 4500 : _ref$timeout,
    _ref$interval = _ref.interval,
    interval = _ref$interval === void 0 ? 50 : _ref$interval;
  return (0, _waitForExpect.default)(callback, timeout, interval);
}
