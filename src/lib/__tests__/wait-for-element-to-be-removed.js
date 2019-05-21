import React from 'react';
import { View } from 'react-native';

import { cleanup, render, waitForElementToBeRemoved } from '../../';

afterEach(cleanup);

test('resolves only when the element is removed', async () => {
  class MutatedElement extends React.Component {
    state = {
      text: 'original',
      visible: true,
    };

    componentDidMount() {
      // mutation
      this.setState({ text: 'mutated' });

      // removal
      setTimeout(() => {
        this.setState({ visible: false });
      }, 100);
    }

    render() {
      return this.state.visible ? <View testID="view">{this.state.text}</View> : null;
    }
  }

  const { queryAllByTestId } = render(<MutatedElement />);

  // the timeout is here for two reasons:
  // 1. It helps test the timeout config
  // 2. The element should be removed immediately
  //    so if it doesn't in the first 100ms then we know something's wrong
  //    so we'll fail early and not wait the full timeout
  await waitForElementToBeRemoved(() => queryAllByTestId('view'), { timeout: 250 });
});

test('resolves on mutation if callback throws an error', async () => {
  class MutatedElement extends React.Component {
    state = {
      visible: true,
    };

    componentDidMount() {
      setTimeout(() => {
        this.setState({ visible: false });
      });
    }

    render() {
      return this.state.visible ? <View testID="view" /> : null;
    }
  }

  const { getByTestId } = render(<MutatedElement />);

  await waitForElementToBeRemoved(() => getByTestId('view'), { timeout: 250 });
});
