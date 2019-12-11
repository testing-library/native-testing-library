import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { createAppContainer, withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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
  })
  .mock('react-native-reanimated', () => {
    const View = require('react-native').View;

    const Easing = {
      linear: jest.fn(),
      ease: jest.fn(),
      quad: jest.fn(),
      cubic: jest.fn(),
      poly: jest.fn(),
      sin: jest.fn(),
      circle: jest.fn(),
      exp: jest.fn(),
      elastic: jest.fn(),
      back: jest.fn(),
      bounce: jest.fn(),
      bezier: jest.fn(),
      in: jest.fn(),
      out: jest.fn(),
      inOut: jest.fn(),
    };

    return {
      Easing,
      Value: jest.fn(),
      event: jest.fn(),
      add: jest.fn(),
      eq: jest.fn(),
      set: jest.fn(),
      cond: jest.fn(),
      interpolate: jest.fn(),
      View: View,
      Extrapolate: { CLAMP: jest.fn() },
      Transition: {
        Together: 'Together',
        Out: 'Out',
        In: 'In',
      },
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
