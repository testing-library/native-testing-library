Object.defineProperty(exports, '__esModule', { value: true });
exports.getSetImmediate = getSetImmediate;
function getSetImmediate() {
  if (typeof setImmediate === 'function') {
    return setImmediate;
  } else {
    return function setImmediate(fn) {
      return setTimeout(fn, 0);
    };
  }
}
