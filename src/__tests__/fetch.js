import React from 'react';
import { Button, Text, View } from 'react-native';

import { render, fireEvent, wait } from '../';

global.fetch = require('jest-fetch-mock');

class Fetch extends React.Component {
  state = {};
  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.fetch();
    }
  }
  fetch = async () => {
    const response = await fetch(this.props.url);
    const json = await response.json();
    this.setState({ data: json.data });
  };
  render() {
    const { data } = this.state;
    return (
      <View>
        <Button onPress={this.fetch} title="Fetch" />
        {data ? <Text>{data.greeting}</Text> : null}
      </View>
    );
  }
}

test('Fetch makes an API call and displays the greeting when load-greeting is clicked', async () => {
  // Arrange
  fetch.mockResponseOnce(JSON.stringify({ data: { greeting: 'hello there' } }));
  const url = '/greeting';
  const { container, getByText } = render(<Fetch url={url} />);

  // Act
  fireEvent.press(getByText('Fetch'));

  await wait();

  // Assert
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(url);
  // this assertion is funny because if the textContent were not "hello there"
  // then the `getByText` would throw anyway... 🤔
  expect(getByText('hello there').props.children).toEqual('hello there');
  expect(container).toMatchSnapshot();
});
