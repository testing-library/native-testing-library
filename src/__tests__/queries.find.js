import React from 'react';
import { Image, Text, TextInput, View } from 'react-native';

import { render } from '../.';

test('find asynchronously finds elements', async () => {
  const {
    findByA11yLabel,
    findAllByA11yLabel,

    findByPlaceholder,
    findAllByPlaceholder,

    findByText,
    findAllByText,

    findByValue,
    findAllByValue,

    findByA11yRole,
    findAllByA11yRole,

    findByTestId,
    findAllByTestId,
  } = render(
    <View>
      <Text testID="test-id" accessibilityRole="text">
        test text content
      </Text>
      <TextInput placeholder="placeholder" />
      <TextInput value="value" />
      <Image accessibilityLabel="test-label" src="/lucy-ricardo.png" />
      <View role="dialog" />
    </View>,
  );

  await expect(findByA11yLabel('test-label')).resolves.toBeTruthy();
  await expect(findAllByA11yLabel('test-label')).resolves.toHaveLength(1);

  await expect(findByPlaceholder('placeholder')).resolves.toBeTruthy();
  await expect(findAllByPlaceholder('placeholder')).resolves.toHaveLength(1);

  await expect(findByText('test text content')).resolves.toBeTruthy();
  await expect(findAllByText('test text content')).resolves.toHaveLength(1);

  await expect(findByA11yRole('text')).resolves.toBeTruthy();
  await expect(findAllByA11yRole('text')).resolves.toHaveLength(1);

  await expect(findByValue('value')).resolves.toBeTruthy();
  await expect(findAllByValue('value')).resolves.toHaveLength(1);

  await expect(findByTestId('test-id')).resolves.toBeTruthy();
  await expect(findAllByTestId('test-id')).resolves.toHaveLength(1);
});

test('find rejects when something cannot be found', async () => {
  const {
    findByA11yLabel,
    findAllByA11yLabel,

    findByPlaceholder,
    findAllByPlaceholder,

    findByText,
    findAllByText,

    findByValue,
    findAllByValue,

    findByA11yRole,
    findAllByA11yRole,

    findByTestId,
    findAllByTestId,
  } = render(<View />);

  const qo = {};
  const wo = { timeout: 10 };

  await expect(findByA11yLabel('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByA11yLabel('x', qo, wo)).rejects.toThrow('x');

  await expect(findByPlaceholder('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByPlaceholder('x', qo, wo)).rejects.toThrow('x');

  await expect(findByText('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByText('x', qo, wo)).rejects.toThrow('x');

  await expect(findByValue('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByValue('x', qo, wo)).rejects.toThrow('x');

  await expect(findByA11yRole('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByA11yRole('x', qo, wo)).rejects.toThrow('x');

  await expect(findByTestId('x', qo, wo)).rejects.toThrow('x');
  await expect(findAllByTestId('x', qo, wo)).rejects.toThrow('x');
});

test('actually works with async code', async () => {
  const { findByTestId, rerender, container } = render(<View />);
  setTimeout(() => rerender(<Text testID="text">correct tree</Text>), 20);
  await expect(findByTestId('text', {}, { container })).resolves.toBeTruthy();
});
