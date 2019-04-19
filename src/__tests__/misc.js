import React from 'react';
import { View } from 'react-native';

import { render } from '../';
import { queryByProp } from '../';

// we used to use queryByAttribute internally, but we don't anymore. Some people
// use it as an undocumented part of the API, so we'll keep it around.
test('queryByAttribute', () => {
  const { container } = render(
    <View>
      <View pointerEvents="none" />
      <View collapsable />
    </View>,
  );
  expect(queryByProp('pointerEvents', container, 'none')).not.toBeNull();
  expect(queryByProp('collapsable', container, false)).toBeNull();
});
