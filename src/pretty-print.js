import prettyFormat from 'pretty-format';

const { ReactTestComponent, ReactElement } = prettyFormat.plugins;

function prettyPrint(reactElement, maxLength, options) {
  const debugContent = prettyFormat(reactElement, {
    plugins: [ReactTestComponent, ReactElement],
    printFunctionName: false,
    highlight: true,
    ...options,
  });

  return maxLength !== undefined && reactElement.toString().length > maxLength
    ? `${debugContent.slice(0, maxLength)}...`
    : debugContent;
}

export { prettyPrint };
