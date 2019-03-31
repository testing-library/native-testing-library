Object.defineProperty(exports, '__esModule', { value: true });
exports.default = void 0;
var _reactTestRenderer = require('react-test-renderer');
function actPolyfill(callback) {
  callback();
}
var act = _reactTestRenderer.act || actPolyfill;
function rntlAct(callback) {
  return act(callback);
}
var _default = rntlAct;
exports.default = _default;
