import React from 'react';
import { Button, TextInput, View } from 'react-native';
import { render, fireEvent, cleanup } from '../';

afterEach(cleanup);

function Login({ onSubmit, user }) {
  return (
    <View>
      <TextInput
        accessibilityLabel="Username"
        placeholder="Username..."
        textContentType="username"
        value={user.username}
      />
      <TextInput
        accessibilityLabel="Password"
        placeholder="Password..."
        textContentType="password"
        value={user.password}
      />
      <Button title="Submit" onPress={() => onSubmit(user)} />
    </View>
  );
}

test('login form submits', () => {
  const fakeUser = { username: 'bcarroll', password: 'starboy' };
  const handleSubmit = jest.fn();
  const { getByTitle } = render(<Login onSubmit={handleSubmit} user={fakeUser} />);

  const submitButtonNode = getByTitle('Submit');

  fireEvent.press(submitButtonNode);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser);
});
