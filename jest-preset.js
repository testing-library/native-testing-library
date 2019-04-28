const jestPreset = require('react-native/jest-preset');

module.exports = Object.assign(jestPreset, {
  transformIgnorePatterns: ['node_modules/(?!(react-native.*|@?react-navigation.*)/)'],
  setupFiles: [...jestPreset.setupFiles, require.resolve('./src/preset/setup.js')],
});
