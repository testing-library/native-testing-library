let config = {
  // no default config in NTL...
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

function getConfig() {
  return config;
}

export { configure, getConfig };
