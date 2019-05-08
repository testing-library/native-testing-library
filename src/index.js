import React from 'react';
import { View } from 'react-native';
import TR from 'react-test-renderer';
import AppContainer from 'react-native/Libraries/ReactNative/AppContainer';

import {
  toJSON,
  fireEvent as rntlFireEvent,
  getQueriesForElement,
  NativeEvent,
  prettyPrint,
  proxyUnsafeProperties,
  validComponentFilter,
} from './lib';
import act from './act-compat';

const containerId = 'ntl-container';
const renderers = new Set();

function render(ui, { options = {}, wrapper: WrapperComponent, queries } = {}) {
  const wrapUiIfNeeded = innerElement =>
    WrapperComponent ? (
      <AppContainer>
        <View testID={containerId}>
          <WrapperComponent>{innerElement}</WrapperComponent>
        </View>
      </AppContainer>
    ) : (
      <AppContainer>
        <View testID={containerId}>{innerElement}</View>
      </AppContainer>
    );

  let testRenderer;

  act(() => {
    testRenderer = TR.create(wrapUiIfNeeded(ui), options);
  });

  renderers.add(testRenderer);

  const baseElement = proxyUnsafeProperties(testRenderer.root);
  const container = baseElement
    .findAll(c => validComponentFilter(c))
    .filter(n => n.getProp('testID') === containerId)[0];

  return {
    baseElement,
    container,
    debug: (el = baseElement) => console.log(prettyPrint(toJSON(el))),
    unmount: () => testRenderer.unmount(),
    rerender: rerenderUi => {
      act(() => {
        testRenderer.update(wrapUiIfNeeded(rerenderUi));
      });
    },
    ...getQueriesForElement(testRenderer, queries),
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
export { act, cleanup, fireEvent, render, NativeEvent };
