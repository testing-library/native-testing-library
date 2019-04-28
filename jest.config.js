const jestPreset = require('react-native/jest-preset');

const ignores = ['/node_modules/', '/__tests__/helpers/', '__mocks__'];

module.exports = Object.assign(jestPreset, {
  collectCoverageFrom: ['**/src/lib/**/*.js', '!**/src/preset/**/*.js'],
  setupFiles: [...jestPreset.setupFiles, require.resolve('./src/preset/setup.js')],
  testPathIgnorePatterns: [...ignores],
  transformIgnorePatterns: ['node_modules/(?!(react-native.*|@?react-navigation.*)/)'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
});
