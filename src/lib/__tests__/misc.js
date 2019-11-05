import React from 'react';
import { Picker, Switch, View, Text, TextInput, Button } from 'react-native';

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

test('selector option in queries filter out elements', () => {
  function filterByLabel(label) {
    return {
      selector: ({ props }) => props.accessibilityLabel === label,
    };
  }

  const { getByText, getByRole, getByDisplayValue, getByTitle } = render(
    <>
      <Text>hello world</Text>
      <Text accessibilityLabel="labelled">hello world</Text>

      <View accessibilityRole="link" />
      <View accessibilityRole="link" accessibilityLabel="labelled" />

      <TextInput value="hello joe" />
      <TextInput value="hello joe" accessibilityLabel="labelled" />

      <Button title="hello joe" />
      <Button title="hello joe" accessibilityLabel="labelled" />
    </>,
  );

  // more than one match:
  expect(() => getByText(/hello world/i)).toThrow();
  // filtered
  getByText(/hello world/i, filterByLabel('labelled'));

  // more than one match:
  expect(() => getByRole('link')).toThrow();
  // filtered
  getByRole('link', filterByLabel('labelled'));

  // more than one match:
  expect(() => getByDisplayValue(/hello joe/i)).toThrow();
  // filtered
  getByDisplayValue(/hello joe/i, filterByLabel('labelled'));

  // more than one match:
  expect(() => getByTitle(/hello joe/i)).toThrow();
  // filtered
  getByTitle(/hello joe/i, filterByLabel('labelled'));
});
