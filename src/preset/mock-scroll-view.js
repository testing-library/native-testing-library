import React from 'react';
const View = require('react-native/Libraries/Components/View/View');

const requireNativeComponent = jest.requireActual(
  'react-native/Libraries/ReactNative/requireNativeComponent',
);
const RCTScrollView = requireNativeComponent('RCTScrollView');

function mockScrollView(BaseComponent) {
  class ScrollViewMock extends BaseComponent {
    render() {
      return (
        <RCTScrollView {...this.props}>
          {this.props.refreshControl}
          <View>{this.props.children}</View>
        </RCTScrollView>
      );
    }
  }
  return ScrollViewMock;
}

export { mockScrollView };
