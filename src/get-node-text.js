import { Text, TextInput } from 'react-native';
import { filterNodeByType } from './query-helpers';

function getNodeText(node) {
  if (filterNodeByType(node, TextInput)) {
    return node.props.value;
  }

  return Array.from(node.children)
    .filter(node => filterNodeByType(node, 'Text') && Boolean(node.props.children))
    .map(({ props }) => props.children)
    .join('');
}

export { getNodeText };
