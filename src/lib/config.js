/* istanbul ignore next */
let config = {
  asyncWrapper: cb => cb(),
};

function configure(newConfig) {
  if (typeof newConfig === 'function') {
    // Pass the existing config out to the provided function
    // and accept a delta in return
    newConfig = newConfig(config);
  }

  // Merge the incoming config delta
  config = {
    ...config,
    ...newConfig,
  };
}

function getConfig(key) {
  return key ? config[key] : config;
}

export { configure, getConfig };
