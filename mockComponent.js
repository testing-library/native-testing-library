/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

module.exports = (moduleName, instanceMethods) => {
  const RealComponent = jest.requireActual(moduleName);
  const React = require('react');

  const SuperClass = typeof RealComponent === 'function' ? RealComponent : React.Component;

  const Component = class extends SuperClass {
    static displayName =
      RealComponent.displayName ||
      RealComponent.name ||
      (RealComponent.render // handle React.forwardRef
        ? RealComponent.render.displayName || RealComponent.render.name
        : 'Unknown');

    render() {
      if (Component.displayName === 'View') {
        return React.createElement(Component.displayName, this.props);
      }
      return null;
    }
  };

  Object.keys(RealComponent).forEach(classStatic => {
    Component[classStatic] = RealComponent[classStatic];
  });

  if (instanceMethods != null) {
    Object.assign(Component.prototype, instanceMethods);
  }

  return Component;
};
