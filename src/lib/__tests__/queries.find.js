import React from 'react';
import { Button, Image, Text, TextInput, View } from 'react-native';

import { cleanup, render } from '../../';

afterEach(cleanup);

test('find asynchronously finds elements', async () => {
  const {
    findAllByHintText,
    findAllByLabelText,
    findAllByRole,
    findAllByPlaceholderText,
    findAllByTestId,
    findAllByText,
    findAllByTitle,
    findAllByDisplayValue,
    findByHintText,
    findByLabelText,
    findByRole,
    findByPlaceholderText,
    findByTestId,
    findByText,
    findByTitle,
    findByDisplayValue,
  } = render(
    <View>
      <View accessibilityTraits={['button']} />
      <View accessibilityTraits="none" />
      <Text testID="test-id" accessibilityRole="text">
        test text content
      </Text>
      <Button title="button" />
      <TextInput placeholder="placeholder" />
      <TextInput value="value" />
      <TextInput accessibilityStates={['disabled']} />
      <Image accessibilityLabel="test-label" src="/lucy-ricardo.png" />
      <Image accessibilityHint="test-hint" src="/lucy-ricardo.png" />
      <View accessibilityRole="dialog" />
      <View accessibilityRole="fake" />
    </View>,
  );

  // Things get annoying querying accessibilityTraits with `queryByRole`
  jest.spyOn(console, 'warn').mockImplementation(() => {});

  await expect(findByHintText('test-hint')).resolves.toBeTruthy();
  await expect(findAllByHintText('test-hint')).resolves.toHaveLength(1);

  await expect(findByLabelText('test-label')).resolves.toBeTruthy();
  await expect(findAllByLabelText('test-label')).resolves.toHaveLength(1);

  await expect(findByPlaceholderText('placeholder')).resolves.toBeTruthy();
  await expect(findAllByPlaceholderText('placeholder')).resolves.toHaveLength(1);

  await expect(findByText('test text content')).resolves.toBeTruthy();
  await expect(findAllByText('test text content')).resolves.toHaveLength(1);

  await expect(findByTitle('button')).resolves.toBeTruthy();
  await expect(findAllByTitle('button')).resolves.toHaveLength(1);

  await expect(findByText('button')).resolves.toBeTruthy();
  await expect(findAllByText('button')).resolves.toBeTruthy();

  await expect(findByDisplayValue('value')).resolves.toBeTruthy();
  await expect(findAllByDisplayValue('value')).resolves.toHaveLength(1);

  await expect(findByRole('text')).resolves.toBeTruthy();
  await expect(findAllByRole('text')).resolves.toHaveLength(1);

  await expect(findByRole('button')).resolves.toBeTruthy();
  await expect(findAllByRole('button')).resolves.toHaveLength(1);

  await expect(findByRole(['button'])).resolves.toBeTruthy();
  await expect(findAllByRole(['button'])).resolves.toHaveLength(1);

  await expect(findByRole('none')).resolves.toBeTruthy();
  await expect(findAllByRole('none')).resolves.toHaveLength(1);

  await expect(findByRole(['none'])).resolves.toBeTruthy();
  await expect(findAllByRole(['none'])).resolves.toHaveLength(1);

  await expect(findByRole('fake', {}, { timeout: 50 })).rejects.toThrow();

  await expect(findByTestId('test-id')).resolves.toBeTruthy();
  await expect(findAllByTestId('test-id')).resolves.toHaveLength(1);

  console.warn.mock.calls.forEach(([message]) => {
    expect(message).toMatch(/Found elements matching accessibilityTraits/);
  });
});

test('find rejects when something cannot be found', async () => {
  const {
    findAllByHintText,
    findAllByLabelText,
    findAllByRole,
    findAllByPlaceholderText,
    findAllByTestId,
    findAllByText,
    findAllByTitle,
    findAllByDisplayValue,
    findByHintText,
    findByLabelText,
    findByRole,
    findByPlaceholderText,
    findByTestId,
    findByText,
    findByTitle,
    findByDisplayValue,
  } = render(<View />);

  const qo = {};
  const wo = { timeout: 10 };

  await expect(findByHintText('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByHintText('x', qo, wo)).rejects.toThrow('x');

  await expect(findByLabelText('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByLabelText('x', qo, wo)).rejects.toThrow('x');

  await expect(findByRole('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByRole('x', qo, wo)).rejects.toThrow('x');

  await expect(findByPlaceholderText('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByPlaceholderText('x', qo, wo)).rejects.toThrow('x');

  await expect(findByText('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByText('x', qo, wo)).rejects.toThrow('x');

  await expect(findByTitle('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByTitle('x', qo, wo)).rejects.toThrow('x');

  await expect(findByDisplayValue('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByDisplayValue('x', qo, wo)).rejects.toThrow('x');

  await expect(findByTestId('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByTestId('x', qo, wo)).rejects.toThrow('x');
});

test('actually works with async code', async () => {
  const { findByTestId, rerender } = render(<View />);
  setTimeout(() => rerender(<Text testID="text">correct tree</Text>), 20);
  await expect(findByTestId('text', {})).resolves.toBeTruthy();
});
