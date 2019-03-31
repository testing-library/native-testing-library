Object.defineProperty(exports, '__esModule', { value: true });
exports.fuzzyMatches = fuzzyMatches;
exports.matches = matches;
exports.getDefaultNormalizer = getDefaultNormalizer;
exports.makeNormalizer = makeNormalizer;
function fuzzyMatches(textToMatch, node, matcher, normalizer) {
  if (typeof textToMatch !== 'string') {
    return false;
  }
  var normalizedText = normalizer(textToMatch);
  if (typeof matcher === 'string') {
    return normalizedText.toLowerCase().includes(matcher.toLowerCase());
  } else if (typeof matcher === 'function') {
    return matcher(normalizedText, node);
  } else {
    return matcher.test(normalizedText);
  }
}
function matches(textToMatch, node, matcher, normalizer) {
  if (typeof textToMatch !== 'string') {
    return false;
  }
  var normalizedText = normalizer(textToMatch);
  if (typeof matcher === 'string') {
    return normalizedText === matcher;
  } else if (typeof matcher === 'function') {
    return matcher(normalizedText, node);
  } else {
    return matcher.test(normalizedText);
  }
}
function getDefaultNormalizer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$trim = _ref.trim,
    trim = _ref$trim === void 0 ? true : _ref$trim,
    _ref$collapseWhitespa = _ref.collapseWhitespace,
    collapseWhitespace = _ref$collapseWhitespa === void 0 ? true : _ref$collapseWhitespa;
  return function(text) {
    var normalizedText = text;
    normalizedText = trim ? normalizedText.trim() : normalizedText;
    normalizedText = collapseWhitespace ? normalizedText.replace(/\s+/g, ' ') : normalizedText;
    return normalizedText;
  };
}
function makeNormalizer(_ref2) {
  var trim = _ref2.trim,
    collapseWhitespace = _ref2.collapseWhitespace,
    normalizer = _ref2.normalizer;
  if (normalizer) {
    if (typeof trim !== 'undefined' || typeof collapseWhitespace !== 'undefined') {
      throw new Error(
        'trim and collapseWhitespace are not supported with a normalizer. ' +
          'If you want to use the default trim and collapseWhitespace logic in your normalizer, ' +
          'use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer',
      );
    }
    return normalizer;
  } else {
    return getDefaultNormalizer({ trim: trim, collapseWhitespace: collapseWhitespace });
  }
}
