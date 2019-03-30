/*
 * There are browsers for which `setImmediate` is not available. This
 * serves as a polyfill of sorts, adopting `setTimeout` as the closest
 * equivalent
 */
function getSetImmediate() {
  /* istanbul ignore else */
  if (typeof setImmediate === 'function') {
    return setImmediate;
  } else {
    return function setImmediate(fn) {
      return setTimeout(fn, 0);
    };
  }
}

export { getSetImmediate };
