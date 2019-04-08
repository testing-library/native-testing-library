module.exports = {
  displayName: 'example',
  preset: 'react-native',
  roots: [__dirname],
  rootDir: __dirname,
  moduleNameMapper: {
    'native-testing-library': '<rootDir>src',
  },
};
