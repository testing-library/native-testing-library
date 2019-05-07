import React from 'react';
import { Picker } from 'react-native';

import { fireEvent, render } from '../';

test('picker works', () => {
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
