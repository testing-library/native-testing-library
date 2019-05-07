import { configure, getConfig } from '../config';

describe('configuration API', () => {
  let originalConfig;
  beforeEach(() => {
    // Grab the existing configuration so we can restore
    // it at the end of the test
    configure(existingConfig => {
      originalConfig = existingConfig;
      // Don't change the existing config
      return {};
    });
  });
  afterEach(() => {
    configure(originalConfig);
  });

  beforeEach(() => {
    configure({ foo: '123', bar: '456' });
  });

  describe('getConfig', () => {
    test('returns existing configuration', () => {
      const conf = getConfig();
      expect(conf.foo).toEqual('123');
    });
  });

  describe('configure', () => {
    test('merges a delta rather than replacing the whole config', () => {
      const conf = getConfig();
      expect(conf).toMatchObject({ foo: '123', bar: '456' });
    });

    test('overrides existing values', () => {
      configure({ foo: '789' });
      const conf = getConfig();
      expect(conf.foo).toEqual('789');
    });

    test('passes existing config out to config function', () => {
      // Create a new config key based on the value of an existing one
      configure(existingConfig => ({
        foo: `${existingConfig.foo}-derived`,
      }));
      const conf = getConfig();

      // The new value should be there, and existing values should be
      // untouched
      expect(conf).toMatchObject({
        foo: '123-derived',
      });
    });

    test('asyncWrapper callback exists by default', () => {
      const callback = jest.fn();
      getConfig().asyncWrapper(callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
