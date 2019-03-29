import React from 'react';
import TR from 'react-test-renderer';

import { wait } from './wait';
import act from './act-compat';
import { prettyPrint } from './pretty-print';
import { fireEvent as rntlFireEvent, NativeEvent } from './events';
import { getQueriesForElement } from './get-queries-for-element';

function render(ui, { options = {}, wrapper: WrapperComponent } = {}) {
  const wrapUiIfNeeded = innerElement =>
    WrapperComponent ? <WrapperComponent>{innerElement}</WrapperComponent> : innerElement;

  let instance = {};

  act(() => {
    instance = TR.create(wrapUiIfNeeded(ui), options);
  });

  return {
    baseElement: instance.root,
    container: instance,
    debug: (el = instance) => console.log(prettyPrint(el.toJSON())),
    unmount: () => instance.unmount(),
    rerender: rerenderUi => {
      instance.update(wrapUiIfNeeded(rerenderUi));
      // Intentionally do not return anything to avoid unnecessarily complicating the API.
      // folks can use all the same utilities we return in the first place that are bound to the container
    },
    ...getQueriesForElement(instance),
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

export { act, fireEvent, render, wait, NativeEvent };
