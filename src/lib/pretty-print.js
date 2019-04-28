import prettyFormat from 'pretty-format';
import React from 'react';
const { ReactTestComponent, ReactElement } = prettyFormat.plugins;

function prettyPrint(element, maxLength, options) {
  const debugContent = prettyFormat(element, {
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
