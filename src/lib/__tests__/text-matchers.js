import React from 'react';
import cases from 'jest-in-case';
import { Button, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import { cleanup, getDefaultNormalizer, render } from '../../';

afterEach(cleanup);

cases(
  'matches find case-sensitive full strings by default',
  ({ tree, query, queryFn }) => {
    const queries = render(tree);

    const queryString = query;
    const queryRegex = new RegExp(query);
    const queryFunc = text => text === query;

    expect(queries[queryFn](queryString)).toBeTruthy();
    expect(queries[queryFn](queryRegex)).toBeTruthy();
    expect(queries[queryFn](queryFunc)).toBeTruthy();

    expect(queries[queryFn](query.toUpperCase())).toBeFalsy();
    expect(queries[queryFn](query.slice(0, 1))).toBeFalsy();
  },
  {
    queryByTestId: {
      tree: (
        <TouchableOpacity testID="link" onPress={jest.fn()}>
          Link
        </TouchableOpacity>
      ),
      query: `link`,
      queryFn: `queryByTestId`,
    },
    queryByHintText: {
      tree: <Image accessibilityHint="Finding Nemo poster" src="/finding-nemo.png" />,
      query: `Finding Nemo poster`,
      queryFn: `queryByHintText`,
    },
    queryByLabelText: {
      tree: <Image accessibilityLabel="Finding Nemo poster" src="/finding-nemo.png" />,
      query: `Finding Nemo poster`,
      queryFn: `queryByLabelText`,
    },
    queryByPlaceholderText: {
      tree: <TextInput placeholder="Dwayne 'The Rock' Johnson" />,
      query: `Dwayne 'The Rock' Johnson`,
      queryFn: `queryByPlaceholderText`,
    },
    queryByText: {
      tree: <Text>Some content</Text>,
      query: `Some content`,
      queryFn: `queryByText`,
    },
    queryByTitle: {
      tree: <Button title=" link " onPress={jest.fn()} />,
      query: `link`,
      queryFn: `queryByTitle`,
    },
  },
);

cases(
  'queries trim leading, trailing & inner whitespace by default',
  ({ tree, query, queryFn }) => {
    const queries = render(tree);
    expect(queries[queryFn](query)).toBeTruthy();
    expect(
      queries[queryFn](query, {
        normalizer: getDefaultNormalizer({
          collapseWhitespace: false,
          trim: false,
        }),
      }),
    ).toBeFalsy();
  },
  {
    queryByTestId: {
      tree: (
        <TouchableOpacity testID=" link " onPress={jest.fn()}>
          Link
        </TouchableOpacity>
      ),
      query: `link`,
      queryFn: `queryByTestId`,
    },
    queryByHintText: {
      tree: (
        <Image
          accessibilityHint="
            Finding Nemo poster "
          src="/finding-nemo.png"
        />
      ),
      query: `Finding Nemo poster`,
      queryFn: `queryByHintText`,
    },
    queryByLabelText: {
      tree: (
        <Image
          accessibilityLabel="
            Finding Nemo poster "
          src="/finding-nemo.png"
        />
      ),
      query: `Finding Nemo poster`,
      queryFn: `queryByLabelText`,
    },
    queryByPlaceholderText: {
      tree: <TextInput placeholder="  Dwayne 'The Rock' Johnson  " />,
      query: `Dwayne 'The Rock' Johnson`,
      queryFn: `queryByPlaceholderText`,
    },
    queryByText: {
      tree: (
        <Text>
          {`
            Content 
            with 
            linebreaks 
            is 
            ok
          `}
        </Text>
      ),
      query: `Content with linebreaks is ok`,
      queryFn: `queryByText`,
    },
    queryByTitle: {
      tree: <Button title=" link " onPress={jest.fn()} />,
      query: `link`,
      queryFn: `queryByTitle`,
    },
  },
);

cases(
  '{ exact } option toggles case-insensitive partial matches',
  ({ tree, query, queryFn }) => {
    const queries = render(tree);

    const queryString = query;
    const queryRegex = new RegExp(query);
    const queryFunc = text => text === query;

    expect(queries[queryFn](query)).toHaveLength(1);

    expect(queries[queryFn](queryString, { exact: false })).toHaveLength(1);
    expect(queries[queryFn](queryRegex, { exact: false })).toHaveLength(1);
    expect(queries[queryFn](queryFunc, { exact: false })).toHaveLength(1);

    expect(queries[queryFn](query.split(' ')[0], { exact: false })).toHaveLength(1);
    expect(queries[queryFn](query.toLowerCase(), { exact: false })).toHaveLength(1);
  },
  {
    queryAllByPlaceholderText: {
      tree: <TextInput placeholder="Dwayne 'The Rock' Johnson" />,
      query: `Dwayne 'The Rock' Johnson`,
      queryFn: `queryAllByPlaceholderText`,
    },
    queryAllByDisplayValue: {
      tree: <TextInput value="Dwayne 'The Rock' Johnson" />,
      query: `Dwayne 'The Rock' Johnson`,
      queryFn: `queryAllByDisplayValue`,
    },
    queryAllByHintText: {
      tree: <Image accessibilityHint="Finding Nemo poster " src="/finding-nemo.png" />,
      query: `Finding Nemo poster`,
      queryFn: `queryAllByHintText`,
    },
    queryAllByLabelText: {
      tree: <Image accessibilityLabel="Finding Nemo poster " src="/finding-nemo.png" />,
      query: `Finding Nemo poster`,
      queryFn: `queryAllByLabelText`,
    },
    queryAllByText: {
      tree: (
        <Text>
          {`
            Content 
            with 
            linebreaks 
            is 
            ok
          `}
        </Text>
      ),
      query: `Content with linebreaks is ok`,
      queryFn: `queryAllByText`,
    },
    queryAllByTitle: {
      tree: <Button title=" link " onPress={jest.fn()} />,
      query: `link`,
      queryFn: `queryAllByTitle`,
    },
  },
);

const LRM = '\u200e';
function removeUCC(str) {
  return str.replace(/[\u200e]/g, '');
}

cases(
  '{ normalizer } option allows custom pre-match normalization',
  ({ tree, queryFn }) => {
    const queries = render(tree);

    const query = queries[queryFn];

    expect(query(/user n.me/i, { normalizer: removeUCC })).toHaveLength(1);
    expect(query('User name', { normalizer: removeUCC })).toHaveLength(1);

    expect(query(/user n.me/i)).toHaveLength(0);
    expect(query('User name')).toHaveLength(0);
  },
  {
    queryAllByPlaceholderText: {
      tree: <TextInput placeholder={`User ${LRM}name`} />,
      queryFn: 'queryAllByPlaceholderText',
    },
    queryAllByText: {
      tree: <Text>{`User ${LRM}name`}</Text>,
      queryFn: 'queryAllByText',
    },
    queryAllByHintText: {
      tree: <Image accessibilityHint={`User ${LRM}name`} src="username.jpg" />,
      queryFn: 'queryAllByHintText',
    },
    queryAllByLabelText: {
      tree: <Image accessibilityLabel={`User ${LRM}name`} src="username.jpg" />,
      queryFn: 'queryAllByLabelText',
    },
    queryAllByDisplayValue: {
      tree: <TextInput value={`User ${LRM}name`} />,
      queryFn: 'queryAllByDisplayValue',
    },
  },
);

test('normalizer works with both exact and non-exact matching', () => {
  const { queryAllByText } = render(<Text>{`MiXeD ${LRM}CaSe`}</Text>);

  expect(queryAllByText('mixed case', { exact: false, normalizer: removeUCC })).toHaveLength(1);
  expect(queryAllByText('mixed case', { exact: true, normalizer: removeUCC })).toHaveLength(0);
  expect(queryAllByText('MiXeD CaSe', { exact: true, normalizer: removeUCC })).toHaveLength(1);
  expect(queryAllByText('MiXeD CaSe', { exact: true })).toHaveLength(0);
});

test('top-level trim and collapseWhitespace options are not supported if normalizer is specified', () => {
  const { queryAllByText } = render(<Text> abc def </Text>);
  const normalizer = str => str;

  expect(() => queryAllByText('abc', { trim: false, normalizer })).toThrow();
  expect(() => queryAllByText('abc', { trim: true, normalizer })).toThrow();
  expect(() => queryAllByText('abc', { collapseWhitespace: false, normalizer })).toThrow();
  expect(() => queryAllByText('abc', { collapseWhitespace: true, normalizer })).toThrow();
});

test('getDefaultNormalizer returns a normalizer that supports trim and collapseWhitespace', () => {
  expect(getDefaultNormalizer()('  abc  def  ')).toEqual('abc def');
  expect(getDefaultNormalizer({ trim: false })('  abc  def  ')).toEqual(' abc def ');
  expect(getDefaultNormalizer({ collapseWhitespace: false })('  abc  def  ')).toEqual('abc  def');
  expect(getDefaultNormalizer({ trim: false, collapseWhitespace: false })('  abc  def  ')).toEqual(
    '  abc  def  ',
  );
});

test('we support an older API with trim and collapseWhitespace instead of a normalizer', () => {
  const { queryAllByText } = render(<Text>{`  x  y  `}</Text>);
  expect(queryAllByText('x y').length).toBe(1);
  expect(queryAllByText('x y', { trim: false }).length).toBe(0);
  expect(queryAllByText(' x y ', { trim: false }).length).toBe(1);
  expect(queryAllByText('x y', { collapseWhitespace: false }).length).toBe(0);
  expect(queryAllByText('x  y', { collapseWhitespace: false }).length).toBe(1);
});
