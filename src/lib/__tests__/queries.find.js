import React from 'react';
import { Button, Image, Text, TextInput, View } from 'react-native';

import { render } from '../.';

test('find asynchronously finds elements', async () => {
  const {
    findAllByA11yHint,
    findAllByA11yLabel,
    findAllByA11yRole,
    findAllByA11yStates,
    findAllByA11yTraits,
    findAllByPlaceholder,
    findAllByTestId,
    findAllByText,
    findAllByTitle,
    findAllByValue,
    findByA11yHint,
    findByA11yLabel,
    findByA11yRole,
    findByA11yStates,
    findByA11yTraits,
    findByPlaceholder,
    findByTestId,
    findByText,
    findByTitle,
    findByValue,
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

  await expect(findByA11yLabel('test-label')).resolves.toBeTruthy();
  await expect(findAllByA11yLabel('test-label')).resolves.toHaveLength(1);

  await expect(findByA11yStates(['disabled'])).resolves.toBeTruthy();
  await expect(findAllByA11yStates(['disabled'])).resolves.toHaveLength(1);

  await expect(findByA11yTraits(['button'])).resolves.toBeTruthy();
  await expect(findAllByA11yTraits(['button'])).resolves.toHaveLength(1);

  await expect(findByPlaceholder('placeholder')).resolves.toBeTruthy();
  await expect(findAllByPlaceholder('placeholder')).resolves.toHaveLength(1);

  await expect(findByText('test text content')).resolves.toBeTruthy();
  await expect(findAllByText('test text content')).resolves.toHaveLength(1);

  await expect(findByTitle('button')).resolves.toBeTruthy();
  await expect(findAllByTitle('button')).resolves.toHaveLength(1);

  await expect(findByA11yRole('text')).resolves.toBeTruthy();
  await expect(findAllByA11yRole('text')).resolves.toHaveLength(1);

  await expect(findByValue('value')).resolves.toBeTruthy();
  await expect(findAllByValue('value')).resolves.toHaveLength(1);

  await expect(findByTestId('test-id')).resolves.toBeTruthy();
  await expect(findAllByTestId('test-id')).resolves.toHaveLength(1);
});

test('find rejects when something cannot be found', async () => {
  const {
    findAllByA11yHint,
    findAllByA11yLabel,
    findAllByA11yRole,
    findAllByA11yStates,
    findAllByA11yTraits,
    findAllByPlaceholder,
    findAllByTestId,
    findAllByText,
    findAllByTitle,
    findAllByValue,
    findByA11yHint,
    findByA11yLabel,
    findByA11yRole,
    findByA11yStates,
    findByA11yTraits,
    findByPlaceholder,
    findByTestId,
    findByText,
    findByTitle,
    findByValue,
  } = render(<View />);

  const qo = {};
  const wo = { timeout: 10 };

  await expect(findByA11yHint('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByA11yHint('x', qo, wo)).rejects.toThrow('x');

  await expect(findByA11yLabel('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByA11yLabel('x', qo, wo)).rejects.toThrow('x');

  await expect(findByA11yRole('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByA11yRole('x', qo, wo)).rejects.toThrow('x');

  await expect(findByA11yStates('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByA11yStates('x', qo, wo)).rejects.toThrow('x');

  await expect(findByA11yTraits('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByA11yTraits('x', qo, wo)).rejects.toThrow('x');

  await expect(findByPlaceholder('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByPlaceholder('x', qo, wo)).rejects.toThrow('x');

  await expect(findByText('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByText('x', qo, wo)).rejects.toThrow('x');

  await expect(findByTitle('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByTitle('x', qo, wo)).rejects.toThrow('x');

  await expect(findByValue('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByValue('x', qo, wo)).rejects.toThrow('x');

  await expect(findByTestId('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByTestId('x', qo, wo)).rejects.toThrow('x');
});

test('actually works with async code', async () => {
  const { findByTestId, rerender } = render(<View />);
  setTimeout(() => rerender(<Text testID="text">correct tree</Text>), 20);
  await expect(findByTestId('text', {})).resolves.toBeTruthy();
});
