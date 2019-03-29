const ignores = ['/node_modules/', '/__tests__/helpers/', '__mocks__'];

module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: ['node_modules/(?!(react-native.*|@?react-navigation.*)/)'],
  collectCoverageFrom: ['src/**/*.+(js|jsx|ts|tsx)', '!src/helpers.js', '!src/queries.js', '!src/setup.js'],
  testMatch: ['**/__tests__/**/*.+(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: [...ignores],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
