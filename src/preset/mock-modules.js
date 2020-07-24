import { getConfig } from '../lib';
import { mockComponent } from './mock-component';

import { mockScrollView } from './mock-scroll-view';
import RefreshControlMock from './mock-refresh-control';

// Un-mock the react-native components so we can do it ourselves
getConfig('coreComponents').forEach(component => {
  try {
    // try to un-mock the component
    jest.unmock(component);
  } catch (e) {
    // do nothing if we can't
  }
});

// Un-mock ReactNative so we can hide annoying `console.warn`s
jest.unmock('react-native/Libraries/Renderer/shims/ReactNative');

// Mock the components we want mocked
getConfig('coreComponents').forEach(component => {
  try {
    jest.doMock(component, () => mockComponent(component));
  } catch (e) {}
});

// Mock the Picker one-off because it's kinda weird
jest.doMock('react-native/Libraries/Components/Picker/Picker', () => {
  const React = jest.requireActual('react');
  const Picker = mockComponent('react-native/Libraries/Components/Picker/Picker');
  Picker.Item = ({ children, ...props }) => React.createElement('Picker.Item', props, children);
  return Picker;
});

// Mock some other tricky ones
jest.doMock('react-native/Libraries/Components/ScrollView/ScrollView', () => {
  const baseComponent = mockComponent('react-native/Libraries/Components/ScrollView/ScrollView', {
    instanceMethods: {
      getScrollResponder: jest.fn(),
      getScrollableNode: jest.fn(),
      getInnerViewNode: jest.fn(),
      getInnerViewRef: jest.fn(),
      getNativeScrollRef: jest.fn(),
      scrollTo: jest.fn(),
      scrollToEnd: jest.fn(),
      flashScrollIndicators: jest.fn(),
      scrollResponderZoomTo: jest.fn(),
      scrollResponderScrollNativeHandleToKeyboard: jest.fn(),
    },
  });
  return mockScrollView(baseComponent);
});

jest.doMock(
  'react-native/Libraries/Components/RefreshControl/RefreshControl',
  () => RefreshControlMock,
);

jest.doMock('react-native/Libraries/Components/TextInput/TextInput', () =>
  mockComponent('react-native/Libraries/Components/TextInput/TextInput', {
    instanceMethods: {
      isFocused: jest.fn(),
      clear: jest.fn(),
      getNativeRef: jest.fn(),
    },
  }),
);

jest.doMock('react-native/Libraries/Components/Touchable/TouchableHighlight', () =>
  mockComponent('react-native/Libraries/Components/Touchable/TouchableHighlight', {
    displayName: 'TouchableHighlight',
  }),
);

jest.doMock('react-native/Libraries/Components/Touchable/TouchableOpacity', () =>
  mockComponent('react-native/Libraries/Components/Touchable/TouchableOpacity', {
    displayName: 'TouchableOpacity',
  }),
);

// Re-mock ReactNative
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Renderer/shims/ReactNative');

// Mock LogBox
jest.mock('react-native/Libraries/LogBox/LogBox');
