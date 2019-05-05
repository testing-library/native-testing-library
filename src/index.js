import React from 'react';
import TR from 'react-test-renderer';

import act from './act-compat';
import * as queries from './queries';
import { prettyPrint } from './pretty-print';
import * as queryHelpers from './query-helpers';
import { resultContainer, TestHook } from './hooks';
import { getQueriesForElement } from './get-queries-for-element';
import { fireEvent as rntlFireEvent, NativeEvent } from './events';

function render(ui, { options = {}, wrapper: WrapperComponent, queries } = {}) {
  const wrapUiIfNeeded = innerElement =>
    WrapperComponent ? <WrapperComponent>{innerElement}</WrapperComponent> : innerElement;

  let container = {};

  act(() => {
    container = TR.create(wrapUiIfNeeded(ui), options);
  });

  const baseElement = queryHelpers.removeBadProperties(container.root);

  return {
    container,
    baseElement,
    debug: (el = baseElement) => console.log(prettyPrint(el)),
    unmount: () => container.unmount(),
    rerender: rerenderUi => {
      act(() => {
        container.update(wrapUiIfNeeded(rerenderUi));
      });
    },
    ...getQueriesForElement(container, queries || undefined),
  };
}

function renderHook(callback, { initialProps, ...options } = {}) {
  const { result, updateResult, addResolver } = resultContainer();
  const hookProps = { current: initialProps };

  const toRender = () => (
    <TestHook callback={callback} hookProps={hookProps.current}>
      {updateResult}
    </TestHook>
  );

  const { unmount, rerender: rerenderComponent } = render(toRender(), options);

  return {
    result,
    waitForNextUpdate: () => new Promise(resolve => addResolver(resolve)),
    rerender: (newProps = hookProps.current) => {
      hookProps.current = newProps;
      rerenderComponent(toRender());
    },
    unmount,
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

export * from './events';
export * from './get-node-text';
export * from './get-queries-for-element';
export * from './pretty-print';
export * from './queries';
export * from './query-helpers';
export * from './wait';
export * from './wait-for-element';
export * from './wait-for-element-to-be-removed';
export { getDefaultNormalizer } from './matches';

export { act, fireEvent, queries, queryHelpers, render, renderHook, NativeEvent };
