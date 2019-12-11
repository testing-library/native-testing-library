import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';

import { render, fireEvent } from '../../src';

jest
  .mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
  .mock('react-native-gesture-handler', () => {
    const View = require('react-native').View;
    return {
      State: {},
      PanGestureHandler: View,
      BaseButton: View,
      Directions: {},
    };
  });

const Home = ({ navigation }) => (
  <View>
    <Text testID="title">Home page</Text>
    <Button title="Go to about" onPress={() => navigation.navigate('About')} />
  </View>
);
const About = ({ navigation }) => (
  <View>
    <Text testID="title">About page</Text>
    <Button title="Go to home" onPress={() => navigation.navigate('Home')} />
  </View>
);
const Location = () => (
  <View>
    <Text testID="title">Location page</Text>
    <LocationDisplay />
  </View>
);

const LocationDisplay = withNavigation(({ navigation }) => (
  <Text testID="location-display">{navigation.state.routeName}</Text>
));

function renderWithNavigation({ screens = {}, navigatorConfig = {} } = {}) {
  const AppNavigator = createStackNavigator(
    {
      Home,
      About,
      Location,
      ...screens,
    },
    { initialRouteName: 'Home', ...navigatorConfig },
  );

  const App = createAppContainer(AppNavigator);

  return { ...render(<App detached />), navigationTestRenderer: App };
}

test('full app rendering/navigating', async () => {
  const { findByText, getByTestId, getByTitle } = renderWithNavigation();

  expect(getByTestId('title')).toHaveTextContent('Home page');
  fireEvent.press(getByTitle(/Go to about/i));

  const result = await findByText('About page');
  expect(result).toHaveTextContent('About page');
});

test('rendering a component that uses withNavigation', () => {
  const initialRouteName = 'Location';
  const { getByTestId } = renderWithNavigation({
    navigatorConfig: { initialRouteName },
  });
  expect(getByTestId('location-display')).toHaveTextContent(initialRouteName);
});
