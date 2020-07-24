import React, { useEffect, useRef } from 'react';
import {
  Button,
  Picker,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { toMatchDiffSnapshot } from 'snapshot-diff';

import { cleanup, fireEvent, render } from '../';

afterEach(cleanup);

test('<Pressable /> works', () => {
  const fireZeMissiles = jest.fn();

  function Wrapper() {
    return (
      <Pressable onPress={fireZeMissiles}>
        <Text>missiles</Text>
      </Pressable>
    );
  }
  const { getByText } = render(<Wrapper />);

  fireEvent.press(getByText('missiles'));
  expect(fireZeMissiles).toBeCalledTimes(1);
});

test('<Picker /> works', () => {
  function Wrapper() {
    const [value, setValue] = React.useState('js');

    return (
      <Picker selectedValue={value} onValueChange={itemValue => setValue(itemValue)}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    );
  }
  const { findByDisplayValue, getByDisplayValue } = render(<Wrapper />);

  fireEvent.valueChange(getByDisplayValue('js'), 'java');
  expect(() => findByDisplayValue('js')).not.toThrow();
});

test('<ScrollView /> instance methods are mocked', () => {
  function Wrapper() {
    const ref = useRef();

    useEffect(() => {
      ref.current.scrollTo(0);
    }, []);

    return (
      <ScrollView ref={ref}>
        <Text>Some content</Text>
      </ScrollView>
    );
  }
  const { getByText, debug } = render(<Wrapper />);

  expect(() => getByText('Some content')).not.toThrow();
});

test('<TextInput /> instance methods are mocked', () => {
  function Wrapper() {
    const ref = useRef();

    useEffect(() => {
      ref.current.clear();
    }, []);

    return <TextInput ref={ref} value={'yo'} />;
  }
  const { getByDisplayValue } = render(<Wrapper />);

  expect(() => getByDisplayValue('yo')).not.toThrow();
});

test('calling a handler if a Touchable is disabled does not work', () => {
  const handleEvent = jest.fn();
  const { getByText } = render(
    <Pressable disabled onPress={handleEvent}>
      <Text>touchable</Text>
    </Pressable>,
  );
  expect(() => fireEvent.press(getByText('touchable'))).not.toThrow();
  expect(handleEvent).toBeCalledTimes(0);
});

test('calling a TouchableHighlight handler works', () => {
  const handleEvent = jest.fn();
  const { getByText } = render(
    <TouchableHighlight onPress={handleEvent}>
      <Text>touchable</Text>
    </TouchableHighlight>,
  );
  expect(() => fireEvent.press(getByText('touchable'))).not.toThrow();
  expect(handleEvent).toBeCalledTimes(1);
});

test('calling a TouchableNativeFeedback handler works', () => {
  const handleEvent = jest.fn();
  const { getByText } = render(
    <TouchableNativeFeedback onPress={handleEvent}>
      <Text>touchable</Text>
    </TouchableNativeFeedback>,
  );
  expect(() => fireEvent.press(getByText('touchable'))).not.toThrow();
  expect(handleEvent).toBeCalledTimes(1);
});

test('calling a TouchableOpacity handler works', () => {
  const handleEvent = jest.fn();
  const { getByText } = render(
    <TouchableOpacity onPress={handleEvent}>
      <Text>touchable</Text>
    </TouchableOpacity>,
  );
  expect(() => fireEvent.press(getByText('touchable'))).not.toThrow();
  expect(handleEvent).toBeCalledTimes(1);
});

test('calling a TouchableWithoutFeedback handler works ', () => {
  const handleEvent = jest.fn();
  const { getByText } = render(
    <TouchableWithoutFeedback onPress={handleEvent}>
      <Text>touchable</Text>
    </TouchableWithoutFeedback>,
  );
  expect(() => fireEvent.press(getByText('touchable'))).not.toThrow();
  expect(handleEvent).toBeCalledTimes(1);
});

test('fragments can show diffs', () => {
  function TestComponent() {
    const [count, setCount] = React.useState(0);

    return (
      <Button onPress={() => setCount(count => count + 1)} title={`Click to increase: ${count}`} />
    );
  }

  expect.extend({ toMatchDiffSnapshot });

  const { getByText, asJSON } = render(<TestComponent />);
  const firstRender = asJSON();

  fireEvent.press(getByText(/Click to increase/));

  // This will snapshot only the difference between the first render, and the
  // state of the DOM after the click event.
  // See https://github.com/jest-community/snapshot-diff
  expect(firstRender).toMatchDiffSnapshot(asJSON());
});

test('finds only valid children', () => {
  const Wrapper = ({ children }) => <View>{children}</View>;

  const { container } = render(
    <View>
      <Wrapper>
        <Text>hey</Text>
        <Text>sup</Text>
        <View />
      </Wrapper>
    </View>,
  );

  expect(
    // AppContainer
    // => node text
    // => Text
    // => View (from Wrapper)
    // => View
    container.children[0].children[0].children[0].children[0],
  ).toBe('hey');
});

test('it finds only valid parents', () => {
  const Wrapper = ({ children }) => <View>{children}</View>;

  const { baseElement, getByText } = render(
    <View testID="view">
      <Wrapper>
        <Text>hey</Text>
        <Text>sup</Text>
      </Wrapper>
    </View>,
  );

  expect(getByText('hey').parentNode.parentNode.props.testID).toBe('view');
  expect(baseElement.parentNode).toBeNull();
});

test('it finds <Switch /> by value={false}', () => {
  const { getByDisplayValue } = render(<Switch value={false} />);

  getByDisplayValue(false);
});

test("it finds <TextInput /> by value={'hey'} when another a Switch with value={true} is present", () => {
  const { getByDisplayValue } = render(
    <View>
      <Switch value={true} />
      <TextInput value={'hey'} />
    </View>,
  );

  getByDisplayValue('hey');
});

test("it finds <Picker /> by value={'java'} when another a Switch with value={true} is present", () => {
  const { getByDisplayValue } = render(
    <View>
      <Switch value={true} />
      <Picker selectedValue={'java'} onValueChange={itemValue => setValue(itemValue)}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>,
  );

  getByDisplayValue('java');
});
