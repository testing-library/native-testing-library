var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
Object.defineProperty(exports, '__esModule', { value: true });
exports.prettyPrint = prettyPrint;
var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread'));
var _prettyFormat = _interopRequireDefault(require('pretty-format'));
var _prettyFormat$plugins = _prettyFormat.default.plugins,
  ReactTestComponent = _prettyFormat$plugins.ReactTestComponent,
  ReactElement = _prettyFormat$plugins.ReactElement;
function prettyPrint(reactElement, maxLength, options) {
  var debugContent = (0, _prettyFormat.default)(
    reactElement,
    (0, _objectSpread2.default)(
      { plugins: [ReactTestComponent, ReactElement], printFunctionName: false, highlight: true },
      options,
    ),
  );
  return maxLength !== undefined && reactElement.toString().length > maxLength
    ? debugContent.slice(0, maxLength) + '...'
    : debugContent;
}
