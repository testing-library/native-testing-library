const jestPreset = require('react-native/jest-preset');

const ignores = ['/node_modules/', '/__tests__/helpers/', '__mocks__'];

module.exports = Object.assign(jestPreset, {
  transformIgnorePatterns: ['node_modules/(?!(react-native.*|@?react-navigation.*)/)'],
  setupFiles: [...jestPreset.setupFiles, require.resolve('./src/preset/setup.js')],
  testPathIgnorePatterns: [...ignores],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
});
