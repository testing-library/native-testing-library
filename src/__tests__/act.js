import React from 'react';
import 'jest-dom/extend-expect';
import { Button } from 'react-native';

import { render, fireEvent } from '../';

test('render calls useEffect immediately', () => {
  const effectCb = jest.fn();
  function MyUselessComponent() {
    React.useEffect(effectCb);
    return null;
  }
  render(<MyUselessComponent />);
  expect(effectCb).toHaveBeenCalledTimes(1);
});

test('fireEvent triggers useEffect calls', () => {
  const effectCb = jest.fn();

  function Counter() {
    React.useEffect(effectCb);
    const [count, setCount] = React.useState(0);
    return <Button onPress={() => setCount(count + 1)} title={`${count}`} />;
  }
  const { getByText } = render(<Counter />);
  const buttonNode = getByText('0');
  /**/
  effectCb.mockClear();
  fireEvent.press(buttonNode); /**/
  expect(buttonNode.props.children).toEqual('1');
  expect(effectCb).toHaveBeenCalledTimes(1);
});

test('calls to hydrate will run useEffects', () => {
  const effectCb = jest.fn();
  function MyUselessComponent() {
    React.useEffect(effectCb);
    return null;
  }
  render(<MyUselessComponent />, { hydrate: true });
  expect(effectCb).toHaveBeenCalledTimes(1);
});
