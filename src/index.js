import React from 'react';
import TR from 'react-test-renderer';
import AppContainer from 'react-native/Libraries/ReactNative/AppContainer';

import {
  toJSON,
  fireEvent as rntlFireEvent,
  getQueriesForElement,
  NativeTestEvent,
  prettyPrint,
  proxyElement,
} from './lib';
import act from './act-compat';

const renderers = new Set();

function render(ui, { options = {}, wrapper: WrapperComponent, queries } = {}) {
  const { debug, ...rest } = options;

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
    testRenderer = TR.create(wrapUiIfNeeded(ui), rest);
  });

  renderers.add(testRenderer);

  const wrappers = proxyElement(testRenderer.root).findAll(n => n.type === 'View');
  const baseElement = wrappers[0]; // Includes YellowBox and your render
  const container = wrappers[1]; // Includes only your render

  return {
    baseElement,
    container,
    debug: (el = baseElement) => console.log(prettyPrint(el, undefined, { debug })),
    unmount: () => testRenderer.unmount(),
    rerender: rerenderUi => {
      act(() => {
        testRenderer.update(wrapUiIfNeeded(rerenderUi));
      });
    },
    asJSON: () => {
      return toJSON(container);
    },
    ...getQueriesForElement(baseElement, queries),
  };
}

function cleanup() {
  renderers.forEach(cleanupRenderer);
}

function cleanupRenderer(renderer) {
  renderer.unmount();
  renderers.delete(renderer);
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
export { act, cleanup, fireEvent, render, NativeTestEvent };
