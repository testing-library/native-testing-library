import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
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
  const { getByTestId, getByText } = renderWithRedux(<ConnectedCounter />);
  fireEvent.press(getByText('+'));
  expect(getByTestId('count-value').props.children).toBe(1);
});

test('can render with redux with custom initial state', () => {
  const { getByTestId, getByText } = renderWithRedux(<ConnectedCounter />, {
    initialState: { count: 3 },
  });
  fireEvent.press(getByText('-'));
  expect(getByTestId('count-value').props.children).toBe(2);
});

test('can render with redux with custom store', () => {
  const store = createStore(() => ({ count: 1000 }));
  const { getByTestId, getByText } = renderWithRedux(<ConnectedCounter />, {
    store,
  });
  fireEvent.press(getByText('+'));
  expect(getByTestId('count-value').props.children).toBe(1000);
  fireEvent.press(getByText('-'));
  expect(getByTestId('count-value').props.children).toBe(1000);
});
