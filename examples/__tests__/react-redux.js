import 'jest-native/extend-expect';
import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { Button, Text, View } from 'react-native';
import { render, fireEvent } from '../../src';

class Counter extends React.Component {
  increment = () => {
    this.props.dispatch({ type: 'INCREMENT' });
  };

  decrement = () => {
    this.props.dispatch({ type: 'DECREMENT' });
  };

  render() {
    return (
      <View>
        <Text>Counter</Text>
        <View>
          <Button onPress={this.decrement} title="-" />
          <Text testID="count-value">{this.props.count}</Text>
          <Button onPress={this.increment} title="+" />
        </View>
      </View>
    );
  }
}

const ConnectedCounter = connect(state => ({ count: state.count }))(Counter);

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
}

function renderWithRedux(ui, { initialState, store = createStore(reducer, initialState) } = {}) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

test('can render with redux with defaults', () => {
  const { getByTestId, getByTitle } = renderWithRedux(<ConnectedCounter />);
  fireEvent.press(getByTitle('+'));
  expect(getByTestId('count-value')).toHaveTextContent(1);
});

test('can render with redux with custom initial state', () => {
  const { getByTestId, getByTitle } = renderWithRedux(<ConnectedCounter />, {
    initialState: { count: 3 },
  });
  fireEvent.press(getByTitle('-'));
  expect(getByTestId('count-value')).toHaveTextContent(2);
});

test('can render with redux with custom store', () => {
  const store = createStore(() => ({ count: 1000 }));
  const { getByTestId, getByTitle } = renderWithRedux(<ConnectedCounter />, {
    store,
  });
  fireEvent.press(getByTitle('+'));
  expect(getByTestId('count-value')).toHaveTextContent(1000);
  fireEvent.press(getByTitle('-'));
  expect(getByTestId('count-value')).toHaveTextContent(1000);
});
