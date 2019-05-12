import React from 'react';
import prettyFormat from 'pretty-format';

import { toJSON } from './to-json';

const { ReactTestComponent, ReactElement } = prettyFormat.plugins;

function prettyPrint(element, maxLength, options) {
  const debugContent = prettyFormat(toJSON(element), {
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
