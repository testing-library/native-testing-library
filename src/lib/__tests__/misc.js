import React from 'react';
import { View } from 'react-native';

import { render, queryByProp, queryByTestId, cleanup } from '../../';

afterEach(cleanup);

test('queryByProp', () => {
  const { container } = render(
    <View>
      <View testID="foo" importantForAccessibility="no" />
      <View importantForAccessibility="no" />
      <View importantForAccessibility="no-hide-descendants" />
    </View>,
  );

  expect(queryByTestId(container, 'foo')).not.toBeNull();
  expect(queryByProp('importantForAccessibility', container, 'auto')).toBeNull();
  expect(() => queryByProp('importantForAccessibility', container, /no/)).toThrow(
    /multiple elements/,
  );
});
