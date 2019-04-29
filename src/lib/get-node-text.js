function getNodeText(node) {
  switch (node.type) {
    case 'Button':
      return node.getProp('title');
    case 'TextInput':
      return node.getProp('value');
    default:
      return Array.from(node.children).join('');
  }
}

export { getNodeText };
