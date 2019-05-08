import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import cases from 'jest-in-case';

import { cleanup, render } from '../../';

afterEach(cleanup);

cases(
  'getBy* queries throw an error when there are multiple elements returned',
  ({ name, query, tree }) => {
    const utils = render(tree);
    expect(() => utils[name](query)).toThrow(/multiple elements/i);
  },
  {
    getByHintText: {
      query: /his/,
      tree: (
        <View>
          <View accessibilityHint="his" />
          <View accessibilityHint="history" />
        </View>
      ),
    },
    getByLabelText: {
      query: /his/,
      tree: (
        <View>
          <View accessibilityLabel="his" />
          <View accessibilityLabel="history" />
        </View>
      ),
    },
    getByRole: {
      query: 'button',
      tree: (
        <View>
          <View accessibilityRole="button" />
          <View accessibilityRole="button" />
        </View>
      ),
    },
    getByPlaceholderText: {
      query: /his/,
      tree: (
        <View>
          <TextInput placeholder="his" />
          <TextInput placeholder="history" />
        </View>
      ),
    },
    getByTestId: {
      query: /his/,
      tree: (
        <View>
          <Text testID="his">text</Text>
          <Text testID="history">other</Text>
        </View>
      ),
    },
    getByText: {
      query: /his/,
      tree: (
        <View>
          <Text>his</Text>
          <Text>history</Text>
        </View>
      ),
    },
    getByTitle: {
      query: /his/,
      tree: (
        <View>
          <Button title="his" />
          <Button title="history" />
        </View>
      ),
    },
    getByDisplayValue: {
      query: /his/,
      tree: (
        <View>
          <TextInput value="his" />
          <TextInput value="history" />
        </View>
      ),
    },
  },
);

cases(
  'queryBy* queries throw an error when there are multiple elements returned',
  ({ name, query, tree }) => {
    const utils = render(tree);
    expect(() => utils[name](query)).toThrow(/multiple elements/i);
  },
  {
    queryByHintText: {
      query: /his/,
      tree: (
        <View>
          <View accessibilityHint="his" />
          <View accessibilityHint="history" />
        </View>
      ),
    },
    queryByLabelText: {
      query: /his/,
      tree: (
        <View>
          <View accessibilityLabel="his" />
          <View accessibilityLabel="history" />
        </View>
      ),
    },
    queryByRole: {
      query: 'button',
      tree: (
        <View>
          <View accessibilityRole="button" />
          <View accessibilityRole="button" />
        </View>
      ),
    },
    queryByPlaceholderText: {
      query: /his/,
      tree: (
        <View>
          <TextInput placeholder="his" />
          <TextInput placeholder="history" />
        </View>
      ),
    },
    queryByTestId: {
      query: /his/,
      tree: (
        <View>
          <Text testID="his">text</Text>
          <Text testID="history">other</Text>
        </View>
      ),
    },
    queryByText: {
      query: /his/,
      tree: (
        <View>
          <Text>his</Text>
          <Text>history</Text>
        </View>
      ),
    },
    queryByTitle: {
      query: /his/,
      tree: (
        <View>
          <Button title="his" />
          <Button title="history" />
        </View>
      ),
    },
    queryByDisplayValue: {
      query: /his/,
      tree: (
        <View>
          <TextInput value="his" />
          <TextInput value="history" />
        </View>
      ),
    },
  },
);
