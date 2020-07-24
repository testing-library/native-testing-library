const React = require('react');

const requireNativeComponent = jest.requireActual(
  'react-native/Libraries/ReactNative/requireNativeComponent',
);
const RCTRefreshControl = requireNativeComponent('RCTRefreshControl');

class RefreshControlMock extends React.Component {
  static latestRef;

  componentDidMount() {
    RefreshControlMock.latestRef = this;
  }
  render() {
    return <RCTRefreshControl />;
  }
}

module.exports = RefreshControlMock;
