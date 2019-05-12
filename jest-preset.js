const jestPreset = require('react-native/jest-preset');

module.exports = Object.assign(jestPreset, {
  transformIgnorePatterns: [
    ...jestPreset.transformIgnorePatterns,
    'node_modules/(?!(react-native.*|@?react-navigation.*)/)',
  ],
  snapshotSerializers: [require.resolve('./dist/preset/serializer.js')],
  setupFiles: [...jestPreset.setupFiles, require.resolve('./dist/preset/setup.js')],
});
