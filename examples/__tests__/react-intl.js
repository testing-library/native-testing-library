import React from 'react';
import { View } from 'react-native';
import { IntlProvider } from 'react-intl';
import { FormattedDate } from 'react-intl-native';
import IntlPolyfill from 'intl';
import 'intl/locale-data/jsonp/pt';

import { getByText, render } from '../../src';

const setupTests = () => {
  if (global.Intl) {
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  } else {
    global.Intl = require('intl');
  }
};

const FormatDateView = () => {
  return (
    <View testID="date-display">
      <FormattedDate
        value="2019-03-11"
        timeZone="utc"
        day="2-digit"
        month="2-digit"
        year="numeric"
      />
    </View>
  );
};

const renderWithReactIntl = component => {
  return {
    ...render(<IntlProvider locale="pt">{component}</IntlProvider>),
  };
};

setupTests();

test('it should render FormattedDate and have a formatted pt date', () => {
  const { container } = renderWithReactIntl(<FormatDateView />);

  getByText(container, '11/03/2019');
});
