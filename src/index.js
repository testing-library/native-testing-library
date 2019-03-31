import React from 'react';
import TR from 'react-test-renderer';

import act from './act-compat';
import * as queries from './queries';
import { prettyPrint } from './pretty-print';
import * as queryHelpers from './query-helpers';
import { fireEvent as rntlFireEvent, NativeEvent } from './events';
import { getQueriesForElement } from './get-queries-for-element';

function render(ui, { options = {}, wrapper: WrapperComponent } = {}) {
  const wrapUiIfNeeded = innerElement =>
    WrapperComponent ? <WrapperComponent>{innerElement}</WrapperComponent> : innerElement;

  let container = {};

  act(() => {
    container = TR.create(wrapUiIfNeeded(ui), options);
  });

  return {
    container,
    rootInstance: container.root,
    debug: (el = container) => console.log(prettyPrint(el)),
    unmount: () => container.unmount(),
    rerender: rerenderUi => {
      container.update(wrapUiIfNeeded(rerenderUi));
      // Intentionally do not return anything to avoid unnecessarily complicating the API.
      // folks can use all the same utilities we return in the first place that are bound to the container
    },
    ...getQueriesForElement(container),
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
export { getDefaultNormalizer } from './matches';

export { act, fireEvent, queries, queryHelpers, render, NativeEvent };
