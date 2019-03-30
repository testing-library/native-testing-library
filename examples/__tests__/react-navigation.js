import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';

import { render, fireEvent } from '../../src';

// React Navigation uses some packages that don't play nice with Jest
jest.mock('NativeAnimatedHelper').mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    State: {},
    PanGestureHandler: View,
    BaseButton: View,
    Directions: {},
  };
});

// Even after the mocks, there are some warning message we'll want to filter out
console.warn = (...args) => {
  const finalArgs = args
    .filter(arg => !arg.includes('Calling .measureInWindow()'))
    .filter(arg => !arg.includes('Calling .setNativeProps()'));

  if (finalArgs.length) {
    console.warn(...finalArgs);
  }
};

const Home = ({ navigation }) => (
  <View>
    <Text testID="title">Home page</Text>
    <Button title="About page" onPress={() => navigation.navigate('About')} />
  </View>
);
const About = ({ navigation }) => (
  <View>
    <Text testID="title">About page</Text>
    <Button title="About page" onPress={() => navigation.navigate('Home')} />
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

// this is a handy function that I would utilize for any component
// that relies on the navigation being in context
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

  return { ...render(<App />), navigationContainer: App };
}

test('full app rendering/navigating', async () => {
  const { findByText, getByTestId, getByText } = renderWithNavigation();
  expect(getByTestId('title').props.children).toMatch('Home page');
  fireEvent.press(getByText(/About page/i));
  await expect(findByText('About page')).toBeTruthy();
});

test('rendering a component that uses withNavigation', () => {
  const initialRouteName = 'Location';
  const { getByTestId } = renderWithNavigation({
    navigatorConfig: { initialRouteName },
  });
  expect(getByTestId('location-display').props.children).toBe(initialRouteName);
});
