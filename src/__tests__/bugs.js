import React from 'react';
import { Text, View } from 'react-native';

import { render, queryAllByProp, cleanup } from '../';

afterEach(cleanup);

// This is to ensure custom queries can be passed to render. In most cases, you
// wouldn't/shouldn't need to do this, but we do allow it so we'll test to
// make sure that it works for those who use it.
test('returns the queries passed as options bound to the container', () => {
  const queryAllBySelectionColor = queryAllByProp.bind(null, 'selectionColor');
  const queries = { queryAllBySelectionColor };

  const { queryAllBySelectionColor: queryAllByImplementationDetail } = render(
    <View>
      <Text selectionColor="blue">hello world</Text>
    </View>,
    { queries },
  );

  expect(queryAllByImplementationDetail('blue')).toHaveLength(1);
});
