import React from 'react';
import { Button, Image, Text, TextInput, View } from 'react-native';

import { render } from '../.';

test('find asynchronously finds elements', async () => {
  const {
    findAllByA11yHint,
    findAllByLabelText,
    findAllByRole,
    findAllByPlaceholderText,
    findAllByTestId,
    findAllByText,
    findAllByTitle,
    findAllByDisplayValue,
    findByA11yHint,
    findByLabelText,
    findByRole,
    findByPlaceholderText,
    findByTestId,
    findByText,
    findByTitle,
    findByDisplayValue,
  } = render(
    <View>
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
      <View accessibilityTraits={['button']} />
    </View>,
  );

  await expect(findByA11yHint('test-hint')).resolves.toBeTruthy();
  await expect(findAllByA11yHint('test-hint')).resolves.toHaveLength(1);

  await expect(findByLabelText('test-label')).resolves.toBeTruthy();
  await expect(findAllByLabelText('test-label')).resolves.toHaveLength(1);

  await expect(findByPlaceholderText('placeholder')).resolves.toBeTruthy();
  await expect(findAllByPlaceholderText('placeholder')).resolves.toHaveLength(1);

  await expect(findByText('test text content')).resolves.toBeTruthy();
  await expect(findAllByText('test text content')).resolves.toHaveLength(1);

  await expect(findByTitle('button')).resolves.toBeTruthy();
  await expect(findByText('button')).resolves.toBeTruthy();
  await expect(findAllByTitle('button')).resolves.toHaveLength(1);
  await expect(findAllByText('button')).resolves.toBeTruthy();

  await expect(findByRole('text')).resolves.toBeTruthy();
  await expect(findAllByRole('text')).resolves.toHaveLength(1);

  await expect(findByDisplayValue('value')).resolves.toBeTruthy();
  await expect(findAllByDisplayValue('value')).resolves.toHaveLength(1);

  await expect(findByTestId('test-id')).resolves.toBeTruthy();
  await expect(findAllByTestId('test-id')).resolves.toHaveLength(1);
});

test('find rejects when something cannot be found', async () => {
  const {
    findAllByA11yHint,
    findAllByLabelText,
    findAllByRole,
    findAllByPlaceholderText,
    findAllByTestId,
    findAllByText,
    findAllByTitle,
    findAllByDisplayValue,
    findByA11yHint,
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

  await expect(findByA11yHint('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByA11yHint('x', qo, wo)).rejects.toThrow('x');

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
