import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { act, fireEvent, render, wait } from '../../src';

function Example() {
  const [name, setUser] = React.useState('');
  const [show, setShow] = React.useState(false);

  return (
    <View>
      <TextInput value={name} onChangeText={setUser} testID="input" />
      <Button
        title="Print Username"
        onPress={() => {
          // let's pretend this is making a server request, so it's async
          // (you'd want to mock this imaginary request in your unit tests)...
          setTimeout(() => {
            setShow(!show);
          }, Math.floor(Math.random() * 200));
        }}
      />
      {show && <Text testID="printed-username">{name}</Text>}
    </View>
  );
}

test('examples of some things', async () => {
  const { getByTestId, getByText, queryByTestId, testInstance } = render(<Example />);
  const famousWomanInHistory = 'Ada Lovelace';

  // Get form elements by their label text.
  // An error will be thrown if one cannot be found (accessibility FTW!)
  const input = getByTestId('input');
  fireEvent.changeText(input, famousWomanInHistory);

  // Get elements by their text, just like a real user does.
  const button = getByText('Print Username');
  fireEvent.press(button);

  await wait(() => expect(queryByTestId('printed-username')).toBeTruthy());

  expect(getByTestId('printed-username').props.children).toBe(famousWomanInHistory);
  expect(testInstance).toMatchSnapshot();
});
