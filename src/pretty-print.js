import prettyFormat from 'pretty-format';
const { ReactTestComponent, ReactElement } = prettyFormat.plugins;

function getPrettyOutput(reactElement, maxLength, options) {
  const debugContent = prettyFormat(reactElement, {
    plugins: [ReactTestComponent, ReactElement],
    printFunctionName: false,
    highlight: true,
    ...options,
  });

  return maxLength !== undefined && debugContent && debugContent.toString().length > maxLength
    ? `${debugContent.slice(0, maxLength)}...`
    : debugContent;
}

function prettyPrint(reactElement, ...args) {
  try {
    return getPrettyOutput(reactElement.toJSON(), ...args);
  } catch (e) {
    return getPrettyOutput(reactElement, ...args);
  }
}

export { prettyPrint };
