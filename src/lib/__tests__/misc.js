import React from 'react';
import { Picker, View } from 'react-native';

import { fireEvent, render, queryByProp, queryByTestId } from '../../';

test('queryByProp', () => {
  const { testRenderer } = render(
    <View>
      <View testID="foo" importantForAccessibility="no" />
      <View importantForAccessibility="no" />
      <View importantForAccessibility="no-hide-descendants" />
    </View>,
  );

  expect(queryByTestId(testRenderer, 'foo')).not.toBeNull();
  expect(queryByProp('importantForAccessibility', testRenderer, 'auto')).toBeNull();
  expect(() => queryByProp('importantForAccessibility', testRenderer, /no/)).toThrow(
    /multiple elements/,
  );
});

test('picker', () => {
  function Wrapper() {
    const [value, setValue] = React.useState('js');

    return (
      <Picker selectedValue={value} onValueChange={itemValue => setValue(itemValue)}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    );
  }
  const { findByDisplayValue, getByDisplayValue } = render(<Wrapper />);

  fireEvent.valueChange(getByDisplayValue('js'), 'java');
  expect(() => findByDisplayValue('js')).not.toThrow();
});
