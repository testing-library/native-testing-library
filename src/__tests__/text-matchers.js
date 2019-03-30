import React from 'react';
import cases from 'jest-in-case';
import { Image, Text, TextInput, TouchableOpacity } from 'react-native';

import { render } from '../';
import { getDefaultNormalizer } from '../matches';

cases(
  'matches find case-sensitive full strings by default',
  ({ dom, query, queryFn }) => {
    const queries = render(dom);

    const queryString = query;
    const queryRegex = new RegExp(query);
    const queryFunc = text => text === query;

    expect(queries[queryFn](queryString)).toHaveLength(1);
    expect(queries[queryFn](queryRegex)).toHaveLength(1);
    expect(queries[queryFn](queryFunc)).toHaveLength(1);

    expect(queries[queryFn](query.toUpperCase())).toHaveLength(0); // case
    expect(queries[queryFn](query.slice(0, 1))).toHaveLength(0); // substring
  },
  {
    queryAllByTestId: {
      dom: (
        <TouchableOpacity testID="link" onPress={jest.fn()}>
          Link
        </TouchableOpacity>
      ),
      query: `link`,
      queryFn: `queryAllByTestId`,
    },
    queryAllByAccessibilityLabel: {
      dom: <Image accessibilityLabel="Finding Nemo poster" src="/finding-nemo.png" />,
      query: `Finding Nemo poster`,
      queryFn: `queryAllByA11yLabel`,
    },
    queryAllByAccessibilityRole: {
      dom: <Image accessibilityRole="image" src="/finding-nemo.png" />,
      query: `image`,
      queryFn: `queryAllByA11yRole`,
    },
    queryAllByPlaceholder: {
      dom: <TextInput placeholder="Dwayne 'The Rock' Johnson" />,
      query: `Dwayne 'The Rock' Johnson`,
      queryFn: `queryAllByPlaceholder`,
    },
    queryAllByText: {
      dom: <Text>Some content</Text>,
      query: `Some content`,
      queryFn: `queryAllByText`,
    },
  },
);

cases(
  'queries trim leading, trailing & inner whitespace by default',
  ({ dom, query, queryFn }) => {
    const queries = render(dom);
    expect(queries[queryFn](query)).toHaveLength(1);
    expect(
      queries[queryFn](query, {
        normalizer: getDefaultNormalizer({
          collapseWhitespace: false,
          trim: false,
        }),
      }),
    ).toHaveLength(0);
  },
  {
    queryAllByTestId: {
      dom: (
        <TouchableOpacity testID=" link " onPress={jest.fn()}>
          Link
        </TouchableOpacity>
      ),
      query: `link`,
      queryFn: `queryAllByTestId`,
    },
    queryAllByAccessibilityLabel: {
      dom: (
        <Image
          accessibilityLabel="
            Finding Nemo poster "
          src="/finding-nemo.png"
        />
      ),
      query: `Finding Nemo poster`,
      queryFn: `queryAllByA11yLabel`,
    },
    queryAllByAccessibilityRole: {
      dom: <Image accessibilityRole=" image" src="/finding-nemo.png" />,
      query: `image`,
      queryFn: `queryAllByA11yRole`,
    },
    queryAllByPlaceholder: {
      dom: <TextInput placeholder="  Dwayne 'The Rock' Johnson  " />,
      query: `Dwayne 'The Rock' Johnson`,
      queryFn: `queryAllByPlaceholder`,
    },
    queryAllByText: {
      dom: (
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
  },
);

cases(
  '{ exact } option toggles case-insensitive partial matches',
  ({ dom, query, queryFn }) => {
    const queries = render(dom);

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
    queryAllByPlaceholder: {
      dom: <TextInput placeholder="Dwayne 'The Rock' Johnson" />,
      query: `Dwayne 'The Rock' Johnson`,
      queryFn: `queryAllByPlaceholder`,
    },
    queryAllByAccessibilityLabel: {
      dom: <Image accessibilityLabel="Finding Nemo poster " src="/finding-nemo.png" />,
      query: `Finding Nemo poster`,
      queryFn: `queryAllByA11yLabel`,
    },
    queryAllByText: {
      dom: (
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
  },
);

// A good use case for a custom normalizer is stripping
// out Unicode control characters such as LRM (left-right-mark)
// before matching
const LRM = '\u200e';
function removeUCC(str) {
  return str.replace(/[\u200e]/g, '');
}

cases(
  '{ normalizer } option allows custom pre-match normalization',
  ({ dom, queryFn }) => {
    const queries = render(dom);

    const query = queries[queryFn];

    // With the correct normalizer, we should match
    expect(query(/user n.me/i, { normalizer: removeUCC })).toHaveLength(1);
    expect(query('User name', { normalizer: removeUCC })).toHaveLength(1);

    // Without the normalizer, we shouldn't
    expect(query(/user n.me/i)).toHaveLength(0);
    expect(query('User name')).toHaveLength(0);
  },
  {
    queryAllByPlaceholderText: {
      dom: <TextInput placeholder={`User ${LRM}name`} />,
      queryFn: 'queryAllByPlaceholder',
    },
    queryAllByText: {
      dom: <Text>{`User ${LRM}name`}</Text>,
      queryFn: 'queryAllByText',
    },
    queryAllByA11yLabel: {
      dom: <Image accessibilityLabel={`User ${LRM}name`} src="username.jpg" />,
      queryFn: 'queryAllByA11yLabel',
    },
    queryAllByValue: {
      dom: <TextInput value={`User ${LRM}name`} />,
      queryFn: 'queryAllByValue',
    },
    queryAllByA11yRole: {
      dom: <Image accessibilityRole={`User ${LRM}name`} />,
      queryFn: 'queryAllByA11yRole',
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
  // Default is trim: true and collapseWhitespace: true
  expect(getDefaultNormalizer()('  abc  def  ')).toEqual('abc def');

  // Turning off trimming should not turn off whitespace collapsing
  expect(getDefaultNormalizer({ trim: false })('  abc  def  ')).toEqual(' abc def ');

  // Turning off whitespace collapsing should not turn off trimming
  expect(getDefaultNormalizer({ collapseWhitespace: false })('  abc  def  ')).toEqual('abc  def');

  // Whilst it's rather pointless, we should be able to turn both off
  expect(getDefaultNormalizer({ trim: false, collapseWhitespace: false })('  abc  def  ')).toEqual('  abc  def  ');
});

test('we support an older API with trim and collapseWhitespace instead of a normalizer', () => {
  const { queryAllByText } = render(<Text>{`  x  y  `}</Text>);
  expect(queryAllByText('x y').length).toBe(1);
  expect(queryAllByText('x y', { trim: false }).length).toBe(0);
  expect(queryAllByText(' x y ', { trim: false }).length).toBe(1);
  expect(queryAllByText('x y', { collapseWhitespace: false }).length).toBe(0);
  expect(queryAllByText('x  y', { collapseWhitespace: false }).length).toBe(1);
});
