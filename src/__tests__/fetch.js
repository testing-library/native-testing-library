import React from 'react';
import 'jest-native/extend-expect';
import { TouchableOpacity, Text, View } from 'react-native';

import { render, fireEvent, wait, cleanup } from '../';

afterEach(cleanup);

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
        <TouchableOpacity onPress={this.fetch}>
          <Text>Fetch</Text>
        </TouchableOpacity>
        {data ? <Text>{data.greeting}</Text> : null}
      </View>
    );
  }
}

test('Fetch makes an API call and displays the greeting when load-greeting is clicked', async () => {
  fetch.mockResponseOnce(JSON.stringify({ data: { greeting: 'hello there' } }));
  const url = '/greeting';
  const { container, getByText } = render(<Fetch url={url} />);

  fireEvent.press(getByText('Fetch'));

  await wait();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(url);

  expect(getByText('hello there')).toHaveTextContent('hello there');
  expect(container).toMatchSnapshot();
});
