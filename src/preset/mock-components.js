'use strict';

import React from 'react';

import { getCoreComponents } from './core-components';

function mockComponent(component, path = component) {
  const RealComponent = jest.requireActual(path);
  const { mockNativeMethods } = jest.requireActual('./mock-native-methods');

  const displayName =
    RealComponent.displayName ||
    RealComponent.name ||
    (RealComponent.render // handle React.forwardRef
      ? RealComponent.render.displayName || RealComponent.render.name
      : 'Unknown');

  const SuperClass = typeof RealComponent === 'function' ? RealComponent : React.Component;

  class Component extends SuperClass {
    static displayName = displayName;

    render() {
      const props = Object.assign({}, RealComponent.defaultProps);

      if (this.props) {
        Object.keys(this.props).forEach(prop => {
          // We can't just assign props on top of defaultProps
          // because React treats undefined as special and different from null.
          // If a prop is specified but set to undefined it is ignored and the
          // default prop is used instead. If it is set to null, then the
          // null value overwrites the default value.
          if (this.props[prop] !== undefined) {
            props[prop] = this.props[prop];
          }
        });
      }

      return React.createElement(displayName, props, this.props.children);
    }
  }

  Object.keys(RealComponent).forEach(classStatic => {
    Component[classStatic] = RealComponent[classStatic];
  });

  Object.assign(Component.prototype, mockNativeMethods);

  return Component;
}

getCoreComponents().forEach(component => {
  try {
    jest.doMock(component, () => mockComponent(component));
  } catch (e) {
    //
  }
});

jest.doMock('Picker', () => {
  const Picker = mockComponent('Picker');
  Picker.Item = ({ children, ...props }) => React.createElement('Picker.Item', props, children);
  return Picker;
});

export { mockComponent };
