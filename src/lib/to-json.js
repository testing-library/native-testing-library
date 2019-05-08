function flat(arr) {
  return arr.reduce((arr, toFlatten) => {
    return arr.concat(Array.isArray(toFlatten) ? flat(toFlatten) : toFlatten);
  }, []);
}

function toJSON(node) {
  try {
    // If the node is a string return it
    if (typeof node === 'string') {
      return node;
    }

    // We don't want children being included in the props
    const { children, ...props } = node.props;

    // Convert all children to the JSON format
    const renderedChildren = flat(node.children.map(child => toJSON(child)));

    // If there's no parent, return the base element not in an array
    if (node.parent === null) {
      return renderedChildren[0];
    }

    // Hoist children so that only "native elements" are in the output
    if (typeof node.type !== 'string') {
      return renderedChildren;
    }

    // Function props get noisy in debug output, so we'll exclude them
    let renderedProps = {};
    Object.keys(props).filter(name => {
      if (typeof props[name] !== 'function') {
        renderedProps[name] = props[name];
      }
    });

    // Finally, create the JSON object
    return {
      $$typeof: Symbol.for('react.test.json'),
      parent: node.parent,
      type: node.type,
      props: renderedProps,
      children: renderedChildren,
    };
  } catch (e) {
    return null;
  }
}

export { toJSON };
