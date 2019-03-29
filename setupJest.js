const MockNativeMethods = jest.requireActual('react-native/jest/MockNativeMethods');
const mockComponent = jest.requireActual('./mockComponent');

jest
  .mock('Image', () => mockComponent('Image'))
  .mock('Text', () => mockComponent('Text', MockNativeMethods))
  .mock('TextInput', () => mockComponent('TextInput'))
  .mock('Modal', () => mockComponent('Modal'))
  .mock('View', () => mockComponent('View', MockNativeMethods))
  .mock('ActivityIndicator', () => mockComponent('ActivityIndicator'));

jest.doMock('requireNativeComponent', () => {
  const React = require('react');

  return viewName =>
    class extends React.Component {
      render() {
        console.log(viewName);
        return React.createElement(viewName, this.props, this.props.children);
      }
    };
});
