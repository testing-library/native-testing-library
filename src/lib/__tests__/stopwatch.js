import React from 'react';
import { Button, Text, View } from 'react-native';

import { render, fireEvent } from '../';

class StopWatch extends React.Component {
  state = { lapse: 0, running: false };
  handleRunClick = () => {
    this.setState(state => {
      if (state.running) {
        clearInterval(this.timer);
      } else {
        const startTime = Date.now() - this.state.lapse;
        this.timer = setInterval(() => {
          this.setState({ lapse: Date.now() - startTime });
        });
      }
      return { running: !state.running };
    });
  };
  handleClearClick = () => {
    clearInterval(this.timer);
    this.setState({ lapse: 0, running: false });
  };
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { lapse, running } = this.state;
    return (
      <View>
        <Text>{lapse}ms</Text>
        <Button onPress={this.handleRunClick} title={running ? 'Stop' : 'Start'} />
        <Button onPress={this.handleClearClick} title="Clear" />
      </View>
    );
  }
}

const wait = time => new Promise(resolve => setTimeout(resolve, time));

test('unmounts a component', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  const { unmount, getByTitle, container } = render(<StopWatch />);
  fireEvent.press(getByTitle('Start'));

  unmount();

  expect(container.toJSON()).toBeNull();
  await wait(() => expect(console.error).not.toHaveBeenCalled());
});
