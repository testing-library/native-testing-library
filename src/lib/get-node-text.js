import { filterNodeByType } from './query-helpers';

function getNodeText(node) {
  if (filterNodeByType(node, 'TextInput')) {
    return node.props.value;
  }

  return Array.from(node.children).join('');
}

export { getNodeText };
