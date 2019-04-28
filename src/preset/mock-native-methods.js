'use strict';

const mockNativeMethods = {
  measure: jest.fn(),
  measureInWindow: jest.fn(),
  measureLayout: jest.fn(),
  setNativeProps: jest.fn(),
  focus: jest.fn(),
  blur: jest.fn(),
};

export { mockNativeMethods };
