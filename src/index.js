import React from 'react';
import TR from 'react-test-renderer';
import AppContainer from 'react-native/Libraries/ReactNative/AppContainer';

import {
  fireEvent as rntlFireEvent,
  getQueriesForElement,
  NativeTestEvent,
  prettyPrint,
  proxyUnsafeProperties as proxy,
} from './lib';
import act from './act-compat';

function render(ui, { options = {}, wrapper: WrapperComponent, queries } = {}) {
  const wrapUiIfNeeded = innerElement =>
    WrapperComponent ? (
      <AppContainer>
        <WrapperComponent>{innerElement}</WrapperComponent>
      </AppContainer>
    ) : (
      <AppContainer>{innerElement}</AppContainer>
    );

  let testRenderer;

  act(() => {
    testRenderer = TR.create(wrapUiIfNeeded(ui), options);
  });

  const wrappers = proxy(testRenderer.root).findAll(n => n.getProp('pointerEvents') === 'box-none');
  const baseElement = wrappers[0]; // Includes YellowBox and your render
  const container = wrappers[1]; // Includes only your render

  return {
    baseElement,
    container,
    debug: (el = baseElement) => console.log(prettyPrint(el)),
    unmount: () => testRenderer.unmount(),
    rerender: rerenderUi => {
      act(() => {
        testRenderer.update(wrapUiIfNeeded(rerenderUi));
      });
    },
    ...getQueriesForElement(baseElement, queries),
  };
}

function fireEvent(...args) {
  let returnValue;
  act(() => {
    returnValue = rntlFireEvent(...args);
  });
  return returnValue;
}

Object.keys(rntlFireEvent).forEach(typeArg => {
  fireEvent[typeArg] = (...args) => {
    let returnValue;
    act(() => {
      returnValue = rntlFireEvent[typeArg](...args);
    });
    return returnValue;
  };
});

export * from './lib';
export { act, fireEvent, render, NativeTestEvent };
