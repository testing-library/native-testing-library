import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import cases from 'jest-in-case';

import { render } from '../';

cases(
  'getBy* queries throw an error when there are multiple elements returned',
  ({ name, query, tree }) => {
    const utils = render(tree);
    expect(() => utils[name](query)).toThrow(/multiple elements/i);
  },
  {
    getByA11yHint: {
      query: /his/,
      tree: (
        <View>
          <View accessibilityHint="his" />
          <View accessibilityHint="history" />
        </View>
      ),
    },
    getByA11yLabel: {
      query: /his/,
      tree: (
        <View>
          <View accessibilityLabel="his" />
          <View accessibilityLabel="history" />
        </View>
      ),
    },
    getByA11yRole: {
      query: 'button',
      tree: (
        <View>
          <View accessibilityRole="button" />
          <View accessibilityRole="button" />
        </View>
      ),
    },
    getByA11yStates: {
      query: ['selected'],
      tree: (
        <View>
          <View accessibilityStates={['selected']} />
          <View accessibilityStates={['selected']} />
        </View>
      ),
    },
    getByA11yTraits: {
      query: ['button'],
      tree: (
        <View>
          <View accessibilityTraits={['button']} />
          <View accessibilityTraits={['button']} />
        </View>
      ),
    },
    getByPlaceholder: {
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
    getByValue: {
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
    queryByA11yHint: {
      query: /his/,
      tree: (
        <View>
          <View accessibilityHint="his" />
          <View accessibilityHint="history" />
        </View>
      ),
    },
    queryByA11yLabel: {
      query: /his/,
      tree: (
        <View>
          <View accessibilityLabel="his" />
          <View accessibilityLabel="history" />
        </View>
      ),
    },
    queryByA11yRole: {
      query: 'button',
      tree: (
        <View>
          <View accessibilityRole="button" />
          <View accessibilityRole="button" />
        </View>
      ),
    },
    queryByA11yStates: {
      query: ['selected'],
      tree: (
        <View>
          <View accessibilityStates={['selected']} />
          <View accessibilityStates={['selected']} />
        </View>
      ),
    },
    queryByA11yTraits: {
      query: ['button'],
      tree: (
        <View>
          <View accessibilityTraits={['button']} />
          <View accessibilityTraits={['button']} />
        </View>
      ),
    },
    queryByPlaceholder: {
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
    queryByValue: {
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
