import React from 'react';
import { Button, Picker } from 'react-native';
import { toMatchDiffSnapshot } from 'snapshot-diff';

import { fireEvent, render } from '../';

test('<Picker /> works', () => {
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

test('fragments can show diffs', () => {
  function TestComponent() {
    const [count, setCount] = React.useState(0);

    return (
      <Button onPress={() => setCount(count => count + 1)} title={`Click to increase: ${count}`} />
    );
  }

  expect.extend({ toMatchDiffSnapshot });

  const { getByText, asFragment } = render(<TestComponent />);
  const firstRender = asFragment();

  fireEvent.press(getByText(/Click to increase/));

  // This will snapshot only the difference between the first render, and the
  // state of the DOM after the click event.
  // See https://github.com/jest-community/snapshot-diff
  expect(firstRender).toMatchDiffSnapshot(asFragment());
});
