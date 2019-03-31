Object.defineProperty(exports, '__esModule', { value: true });
exports.defaultFilter = defaultFilter;
exports.getElementError = getElementError;
exports.firstResultOrNull = firstResultOrNull;
exports.filterNodeByType = filterNodeByType;
exports.queryAllByProp = queryAllByProp;
exports.queryByProp = queryByProp;
var _prettyPrint = require('./pretty-print');
var _matches = require('./matches');
function debugDOM(htmlElement) {
  var limit = process.env.DEBUG_PRINT_LIMIT || 7000;
  return (0, _prettyPrint.prettyPrint)(htmlElement.toJSON(), limit);
}
function getElementError(message, container) {
  return new Error([message, debugDOM(container)].filter(Boolean).join('\n\n'));
}
function filterNodeByType() {
  var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var type = arguments.length > 1 ? arguments[1] : undefined;
  if (!node) {
    return false;
  }
  return (
    node.type === type ||
    (node.type && node.type.name === type) ||
    (node.type && node.type.displayName === type) ||
    (node.type && node.type.render && node.type.render.name === type) ||
    (node.type && node.type.render && node.type.render.displayName === type) ||
    false
  );
}
function firstResultOrNull(queryFunction) {
  for (
    var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1;
    _key < _len;
    _key++
  ) {
    args[_key - 1] = arguments[_key];
  }
  var result = queryFunction.apply(void 0, args);
  if (result.length === 0) return null;
  return result[0];
}
function defaultFilter(node) {
  var name =
    node.type.displayName ||
    node.type.name ||
    (node.type.render ? node.type.render.displayName || node.type.render.name : 'Unknown');
  return name !== 'Unknown';
}
function queryAllByProp(attribute, _ref, text) {
  var container = _ref.container,
    testInstance = _ref.testInstance;
  var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
    filter = _ref2.filter,
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
  var allNodes = Array.from(
    container.findAll(function(c) {
      return c.props[attribute];
    }),
  );
  return allNodes
    .filter(function(node, index) {
      return filter ? filter(node, index) : defaultFilter(node, index);
    })
    .filter(function(node) {
      return matcher(node.props[attribute], container, text, matchNormalizer);
    });
}
function queryByProp() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  return firstResultOrNull.apply(void 0, [queryAllByProp].concat(args));
}
