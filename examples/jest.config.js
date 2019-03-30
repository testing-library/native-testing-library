module.exports = {
  displayName: 'example',
  preset: 'react-native',
  roots: [__dirname],
  rootDir: __dirname,
  moduleNameMapper: {
    'rn-testing-library': '<rootDir>src',
  },
};
