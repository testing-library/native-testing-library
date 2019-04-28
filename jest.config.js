const jestPreset = require('./jest-preset');

const ignores = ['/node_modules/', '/__tests__/helpers/', '__mocks__'];

module.exports = Object.assign(jestPreset, {
  collectCoverageFrom: ['src/lib/**/*.+(js|jsx|ts|tsx)'],
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
