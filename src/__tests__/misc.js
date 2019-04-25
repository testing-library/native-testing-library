import React from 'react';
import { View } from 'react-native';

import { render } from '../';
import { queryByProp, queryByTestId } from '../';

// we used to use queryByProp internally, but we don't anymore. Some people
// use it as an undocumented part of the API, so we'll keep it around.
test('queryByProp', () => {
  const { container } = render(
    <View>
      <View testID="foo" importantForAccessibility="no" />
      <View importantForAccessibility="no-hide-descendants" />
    </View>,
  );

  expect(queryByTestId(container, 'foo')).not.toBeNull();
  expect(queryByProp('importantForAccessibility', container, 'auto')).toBeNull();
  expect(() => queryByProp('importantForAccessibility', container, /no/)).toThrow(
    /multiple elements/,
  );
});
