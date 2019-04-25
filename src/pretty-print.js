import prettyFormat from 'pretty-format';
import React from 'react';
const { ReactTestComponent, ReactElement } = prettyFormat.plugins;

function toJSON(node) {
  if (typeof node === 'string') {
    return node;
  }

  const { children, ...props } = node.props;
  let renderedChildren = null;

  if (children) {
    React.Children.forEach(children, child => {
      const renderedChild = toJSON(child);

      if (renderedChildren === null) {
        renderedChildren = [renderedChild];
      } else {
        renderedChildren.push(renderedChild);
      }
    });
  }

  const json = {
    type: node.type.displayName || node.type,
    props: props,
    children: renderedChildren,
  };

  Object.defineProperty(json, '$$typeof', {
    value: Symbol.for('react.test.json'),
  });

  return json;
}

function prettyPrint(reactElement, maxLength, options) {
  const debugContent = prettyFormat(toJSON(reactElement), {
    plugins: [ReactTestComponent, ReactElement],
    printFunctionName: false,
    highlight: true,
    ...options,
  });

  return maxLength !== undefined && debugContent && debugContent.toString().length > maxLength
    ? `${debugContent.slice(0, maxLength)}...`
    : debugContent;
}

export { prettyPrint };
