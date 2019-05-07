import React from 'react';
import TR from 'react-test-renderer';

import {
  toJSON,
  fireEvent as rntlFireEvent,
  getQueriesForElement,
  NativeEvent,
  prettyPrint,
  proxyUnsafeProperties,
} from './lib';
import act from './act-compat';

function render(ui, { options = {}, wrapper: WrapperComponent, queries } = {}) {
  const wrapUiIfNeeded = innerElement =>
    WrapperComponent ? <WrapperComponent>{innerElement}</WrapperComponent> : innerElement;

  let testRenderer;

  act(() => {
    testRenderer = TR.create(wrapUiIfNeeded(ui), options);
  });

  return {
    container: proxyUnsafeProperties(testRenderer.root),
    debug: (el = testRenderer.root) => console.log(prettyPrint(toJSON(el))),
    unmount: () => testRenderer.unmount(),
    rerender: rerenderUi => {
      act(() => {
        testRenderer.update(wrapUiIfNeeded(rerenderUi));
      });
    },
    ...getQueriesForElement(testRenderer, queries),
  };
}

function fireEvent(...args) {
  let returnValue;
  act(() => {
    returnValue = rntlFireEvent(...args);
  });
  return returnValue;
}

Object.keys(rntlFireEvent).forEach(key => {
  fireEvent[key] = (...args) => {
    let returnValue;
    act(() => {
      returnValue = rntlFireEvent[key](...args);
    });
    return returnValue;
  };
});

export * from './lib';
export { act, fireEvent, render, NativeEvent };
