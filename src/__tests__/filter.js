import React from 'react';
import { Text } from 'react-native';

import { render } from '../';

test('it calls a custom filter', () => {
  const { queryByTestId } = render(<Text testID="test">hi</Text>);
  const filterSpy = jest.fn();

  queryByTestId('test', { filter: filterSpy });
  expect(filterSpy).toHaveBeenCalled();
});

test('custom filters modify results', () => {
  const filter = node => {
    return node.type === 'TextInput';
  };

  const { queryAllByTestId } = render(<Text testID="test">hi</Text>);
  expect(queryAllByTestId('test', { filter }).length).toEqual(0);
});
