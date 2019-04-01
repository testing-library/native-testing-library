import React, { useState, useEffect } from 'react';

import { act, renderHook } from '../../';

test('renderHook calls the callback', () => {
  const spy = jest.fn();
  renderHook(spy);
  expect(spy).toHaveBeenCalledTimes(1);
});

test('confirm we can safely call a React Hook from within the callback', () => {
  renderHook(() => useState());
});

test('returns a function to unmount component', () => {
  let isMounted;
  const { unmount } = renderHook(() => {
    useEffect(() => {
      isMounted = true;
      return () => {
        isMounted = false;
      };
    });
  });
  expect(isMounted).toBe(true);
  unmount();
  expect(isMounted).toBe(false);
});

test('returns a function to rerender component', () => {
  let renderCount = 0;
  const { rerender } = renderHook(() => {
    useEffect(() => {
      renderCount++;
    });
  });

  expect(renderCount).toBe(1);
  rerender();
  expect(renderCount).toBe(2);
});

test('accepts wrapper option to wrap rendered hook with', () => {
  const ctxA = React.createContext();
  const ctxB = React.createContext();
  const useHook = () => {
    return React.useContext(ctxA) * React.useContext(ctxB);
  };
  let actual;
  renderHook(
    () => {
      actual = useHook();
    },
    {
      // eslint-disable-next-line react/display-name
      wrapper: props => (
        <ctxA.Provider value={3}>
          <ctxB.Provider value={4} {...props} />
        </ctxA.Provider>
      ),
    },
  );
  expect(actual).toBe(12);
});

test('returns result ref with latest result from hook execution', () => {
  function useCounter({ initialCount = 0, step = 1 } = {}) {
    const [count, setCount] = React.useState(initialCount);
    const increment = () => setCount(c => c + step);
    const decrement = () => setCount(c => c - step);
    return { count, increment, decrement };
  }

  const { result } = renderHook(useCounter);
  expect(result.current.count).toBe(0);
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);
});
