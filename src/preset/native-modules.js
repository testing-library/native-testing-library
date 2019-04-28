const NativeModules = require('NativeModules');

jest.doMock('NativeModules', () => ({
  ...NativeModules,
  NativeAnimatedModule: {
    addAnimatedEventToView: jest.fn(),
    createAnimatedNode: jest.fn(),
    connectAnimatedNodes: jest.fn(),
    connectAnimatedNodeToView: jest.fn(),
  },
}));
