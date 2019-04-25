<div align="center">
  <h1>(React) Native Testing Library</h1>
  
  <a href="https://www.joypixels.com/emoji/1f433">
    <img
      height="80"
      width="80"
      alt="goat"
      src="https://raw.githubusercontent.com/bcarroll22/native-testing-library/master/other/whale.png"
    />
  </a>
    
  <p>Simple and complete React Native testing utilities that encourage good testing practices.</p>
  
  [**Read The Docs**](https://native-testing-library.com/docs/intro) |
  [Edit the docs](https://github.com/bcarroll22/native-testing-library-docs)
</div>

<hr />

[![Build Status](https://travis-ci.org/bcarroll22/native-testing-library.svg?branch=master)](https://travis-ci.org/bcarroll22/native-testing-library)
[![Code Coverage](https://img.shields.io/codecov/c/github/bcarroll22/native-testing-library.svg?style=flat-square)](https://codecov.io/github/bcarroll22/native-testing-library)
[![version](https://img.shields.io/npm/v/native-testing-library.svg?style=flat-square)](https://www.npmjs.com/package/native-testing-library)
[![downloads](https://img.shields.io/npm/dm/native-testing-library.svg?style=flat-square)](http://www.npmtrends.com/native-testing-library)
[![MIT License](https://img.shields.io/npm/l/native-testing-library.svg?style=flat-square)](https://github.com/bcarroll22/native-testing-library/blob/master/LICENSE)

[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/bcarroll22/native-testing-library/blob/master/CODE_OF_CONDUCT.md)

[![Watch on GitHub](https://img.shields.io/github/watchers/bcarroll22/native-testing-library.svg?style=social)](https://github.com/bcarroll22/native-testing-library/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/bcarroll22/native-testing-library.svg?style=social)](https://github.com/bcarroll22/native-testing-library/stargazers)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [The problem](#the-problem)
- [This solution](#this-solution)
- [Example](#example)
- [Guiding principles](#guiding-principles)
- [Installation](#installation)
- [Hooks](#hooks)
- [Inspiration](#inspiration)
- [Other Solutions](#other-solutions)
- [Guiding Principles](#guiding-principles)
- [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The problem

You want to write maintainable tests for your React Native application. You love Kent Dodds' testing
library, and you want to be able to write maintainable tests for your React Native application. You
don't want to use a library that renders components to a fake DOM, and you've had a hard time
finding what you need to write tests using that philosophy in React Native.

## This solution

`native-testing-library` is an implementation of the well-known testing-library API that works for
React Native. The primary goal is to mimic the testing library API as closely as possible while
still accounting for the differences in the platforms.

## Example

```javascript
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { act, fireEvent, render, wait } from 'native-testing-library';

function Example() {
  const [name, setUser] = React.useState('');
  const [show, setShow] = React.useState(false);

  return (
    <View>
      <TextInput value={name} onChangeText={setUser} testID="input" />
      <Button
        title="Print Username"
        onPress={() => {
          // let's pretend this is making a server request, so it's async
          // (you'd want to mock this imaginary request in your unit tests)...
          setTimeout(() => {
            setShow(!show);
          }, Math.floor(Math.random() * 200));
        }}
      />
      {show && <Text testID="printed-username">{name}</Text>}
    </View>
  );
}

test('examples of some things', async () => {
  const { getByTestId, getByText, queryByTestId, rootInstance } = render(<Example />);
  const famousWomanInHistory = 'Ada Lovelace';

  const input = getByTestId('input');
  fireEvent.changeText(input, famousWomanInHistory);

  const button = getByText('Print Username');
  fireEvent.press(button);

  await wait(() => expect(queryByTestId('printed-username')).toBeTruthy());

  expect(getByTestId('printed-username').props.children).toBe(famousWomanInHistory);
  expect(rootInstance).toMatchSnapshot();
});
```

## Guiding principles

> [The more your tests resemble the way your software is used, the more confidence they can give you.](https://twitter.com/kentcdodds/status/977018512689455106)

We try to only expose methods and utilities that encourage you to write tests that closely resemble
how your apps are used.

Utilities are included in this project based on the following guiding principles:

1.  Rendering React Native components ultimately creates native views, and those views should be
    what you test rather than the React component instances you rendered to make them.
2.  In general, test the way your users use your app. There are instances where you'll need to write
    unit tests, but try your best to write with this first -- the more your tests resemble the way
    your app works, the more confident you'll be with your app.
3.  Be responsible, and remember that testing exists to serve you, not the other way around. If the
    library isn't working for you, contribute to make it work or do something more intuitive. Make
    your tests work for you and your team!

In summary, we believe in the principles of `dom-testing-library` and its companion libraries, and
try to adhere to them as closely as possible. Changes to this library should always consider how
they relate to what's happening in the other libraries in this family of tools.

## Installation

This module should be installed in your project's `devDependencies`:

```
npm install --save-dev native-testing-library
```

You will need `react` and `react-native` installed as _dependencies_ in order to run this project.

## Hooks

You can test hooks out of the box with this package as follows:

```javascript
import { renderHook } from 'native-testing-library';
```

Reads more about hooks on the [docs site](https://native-testing-library.com/docs/api-render-hook).

## Inspiration

Huge thanks to Kent C. Dodds for evangelizing this approach to testing. We could have never come up
with this library without him 🙏. Check out his awesome work and learn more about testing with
confidence at [testingjavascript.com](https://testingjavascript.com/) (you won't regret purchasing
it), and of course, use this library's big brother, `react-testing-library` for your DOM
applications as well!

The hook testing ability of this library is the same implementation as
[react-hooks-testing-library](https://github.com/mpeyper/react-hooks-testing-library). The only
reason it was included in this package is because we need you to import render from us, not the
`dom-testing-library`, and that's an important blocker. Some day, maybe we'll try to allow use of
that library with this one somehow.

## Other Solutions

- [`react-native-testing-library`](https://github.com/callstack/react-native-testing-library)
- [`enzyme`](https://airbnb.io/enzyme/docs/guides/react-native.html)

## Guiding Principles

> [The more your tests resemble the way your software is used, the more confidence they can give you.](https://twitter.com/kentcdodds/status/977018512689455106)

We try to only expose methods and utilities that encourage you to write tests that closely resemble
how your apps are used.

Utilities are included in this project based on the following guiding principles:

1.  If it relates to rendering components, it deals with native views rather than component
    instances, nor should it encourage dealing with component instances.
2.  It should be generally useful for testing the application components in the way the user would
    use it. We are making some trade-offs here because we're using a computer and often a simulated
    environment, but in general, utilities should encourage tests that use the components the way
    they're intended to be used.
3.  Utility implementations and APIs should be simple and flexible.

In summary, we believe in the principles of `testing-library`, and adhere to them as closely as
possible. At the end of the day, what we want is for this library to be pretty light-weight, simple,
and understandable.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/bcarroll22"><img src="https://avatars2.githubusercontent.com/u/11020406?v=4" width="100px;" alt="Brandon Carroll"/><br /><sub><b>Brandon Carroll</b></sub></a><br /><a href="https://github.com/bcarroll22/native-testing-library/commits?author=bcarroll22" title="Code">💻</a> <a href="https://github.com/bcarroll22/native-testing-library/commits?author=bcarroll22" title="Documentation">📖</a> <a href="#infra-bcarroll22" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/bcarroll22/native-testing-library/commits?author=bcarroll22" title="Tests">⚠️</a></td><td align="center"><a href="http://tagraves.com"><img src="https://avatars1.githubusercontent.com/u/2263711?v=4" width="100px;" alt="Tommy Graves"/><br /><sub><b>Tommy Graves</b></sub></a><br /><a href="#ideas-TAGraves" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-TAGraves" title="Maintenance">🚧</a> <a href="#review-TAGraves" title="Reviewed Pull Requests">👀</a></td><td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt="Kent C. Dodds"/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="#ideas-kentcdodds" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://github.com/sz-piotr"><img src="https://avatars2.githubusercontent.com/u/17070569?v=4" width="100px;" alt="Piotr Szlachciak"/><br /><sub><b>Piotr Szlachciak</b></sub></a><br /><a href="https://github.com/bcarroll22/native-testing-library/commits?author=sz-piotr" title="Code">💻</a></td><td align="center"><a href="https://github.com/mcgloneleviROOT"><img src="https://avatars3.githubusercontent.com/u/48258981?v=4" width="100px;" alt="mcgloneleviROOT"/><br /><sub><b>mcgloneleviROOT</b></sub></a><br /><a href="https://github.com/bcarroll22/native-testing-library/issues?q=author%3AmcgloneleviROOT" title="Bug reports">🐛</a> <a href="https://github.com/bcarroll22/native-testing-library/commits?author=mcgloneleviROOT" title="Code">💻</a></td><td align="center"><a href="http://exercism.io/profiles/wolverineks/619ce225090a43cb891d2edcbbf50401"><img src="https://avatars2.githubusercontent.com/u/8462274?v=4" width="100px;" alt="Kevin Sullivan"/><br /><sub><b>Kevin Sullivan</b></sub></a><br /><a href="https://github.com/bcarroll22/native-testing-library/commits?author=wolverineks" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
