import React from 'react';
import { Picker, Switch, View } from 'react-native';

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

it('should render test', () => {
  const { getByDisplayValue } = render(
    <View>
      <Picker selectedValue="fr">
        <Picker.Item value="fr" label="French" />
      </Picker>
      <Switch value={true} />
    </View>,
  );

  expect(getByDisplayValue(true)).toBeTruthy();
});
