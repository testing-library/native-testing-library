import React from 'react';
import TR from 'react-test-renderer';

import {
  configure as configureNTL,
  fireEvent as rntlFireEvent,
  getQueriesForElement,
  NativeEvent,
  prettyPrint,
  proxyUnsafeProperties,
} from './lib';
import act, { asyncAct } from './act-compat';

configureNTL({
  asyncWrapper: async cb => {
    let result;
    await asyncAct(async () => {
      result = await cb();
    });
    return result;
  },
});

function render(ui, { options = {}, wrapper: WrapperComponent } = {}) {
  const wrapUiIfNeeded = innerElement =>
    WrapperComponent ? <WrapperComponent>{innerElement}</WrapperComponent> : innerElement;

  let testRenderer;

  act(() => {
    testRenderer = TR.create(wrapUiIfNeeded(ui), options);
  });

  return {
    testRenderer,
    container: proxyUnsafeProperties(testRenderer.root),
    debug: () => console.log(prettyPrint(testRenderer.toJSON())),
    unmount: () => testRenderer.unmount(),
    rerender: rerenderUi => {
      act(() => {
        testRenderer.update(wrapUiIfNeeded(rerenderUi));
      });
    },
    ...getQueriesForElement(testRenderer),
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
