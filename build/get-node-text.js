Object.defineProperty(exports, '__esModule', { value: true });
exports.getNodeText = getNodeText;
var _reactNative = require('react-native');
var _queryHelpers = require('./query-helpers');
function getNodeText(node) {
  if ((0, _queryHelpers.filterNodeByType)(node, _reactNative.TextInput)) {
    return node.props.value;
  }
  return Array.from(node.children)
    .filter(function(node) {
      return (0, _queryHelpers.filterNodeByType)(node, 'Text') && Boolean(node.props.children);
    })
    .map(function(_ref) {
      var props = _ref.props;
      return props.children;
    })
    .join('');
}
