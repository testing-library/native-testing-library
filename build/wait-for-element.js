Object.defineProperty(exports, '__esModule', { value: true });
exports.waitForElement = waitForElement;
var _helpers = require('./helpers');
function waitForElement(callback) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    container = _ref.container,
    _ref$interval = _ref.interval,
    interval = _ref$interval === void 0 ? 50 : _ref$interval,
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 4500 : _ref$timeout;
  return new Promise(function(resolve, reject) {
    if (typeof callback !== 'function') {
      reject(new Error('waitForElement requires a callback as the first parameter'));
      return;
    }
    var timer = setTimeout(onTimeout, timeout);
    var observer, lastError;
    function onDone(error, result) {
      var setImmediate = (0, _helpers.getSetImmediate)();
      clearTimeout(timer);
      setImmediate(function() {
        return clearTimeout(observer);
      });
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }
    function onMutation() {
      try {
        var result = container ? callback({ container: container.root }) : callback();
        if (result) {
          onDone(null, result);
        }
      } catch (error) {
        lastError = error;
        observer = setTimeout(onMutation, interval);
      }
    }
    function onTimeout() {
      onDone(lastError || new Error('Timed out in waitForElement.'), null);
    }
    observer = setTimeout(onMutation);
  });
}
