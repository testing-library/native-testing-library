import React from 'react';
import { Button, TextInput, View } from 'react-native';
import { render, fireEvent } from '../';

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
  const { getByText } = render(<Login onSubmit={handleSubmit} user={fakeUser} />);

  const submitButtonNode = getByText('Submit');

  // Act
  fireEvent.press(submitButtonNode);

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser);
});
