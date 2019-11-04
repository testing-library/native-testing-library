import React from 'react';
import prettyFormat from 'pretty-format';

import { toJSON } from './to-json';

const { ReactTestComponent, ReactElement } = prettyFormat.plugins;

function prettyPrint(element, maxLength, options = {}) {
  let plugins = [ReactTestComponent, ReactElement];
  const { debug, ...rest } = options;

  const debugContent = prettyFormat(toJSON(element, debug), {
    plugins: plugins,
    printFunctionName: false,
    highlight: true,
    ...rest,
  });

  return maxLength !== undefined && debugContent && debugContent.toString().length > maxLength
    ? `${debugContent.slice(0, maxLength)}...`
    : debugContent;
}

export { prettyPrint };
