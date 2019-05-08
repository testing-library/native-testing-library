import React from 'react';
import { Button, View } from 'react-native';

import { cleanup, render, within } from '../../';

afterEach(cleanup);

test('it works when scoping to a smaller set of elements', () => {
  const { getByTestId } = render(
    <View>
      <View testID="filter-box">
        <Button testID="search-button" onPress={jest.fn()} title="press me" />
      </View>
    </View>,
  );

  within(getByTestId('filter-box')).getByTestId('search-button');
});
