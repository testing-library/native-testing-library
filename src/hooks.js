function TestHook({ callback, hookProps, children }) {
  try {
    children(callback(hookProps));
  } catch (e) {
    children(undefined, e);
  }

  return null;
}

function resultContainer() {
  let value = null;
  let error = null;
  const resolvers = [];

  const result = {
    get current() {
      if (error) {
        throw error;
      }
      return value;
    },
    get error() {
      return error;
    },
  };

  return {
    result,
    addResolver: resolver => {
      resolvers.push(resolver);
    },
    updateResult: (val, err) => {
      value = val;
      error = err;
      resolvers.splice(0, resolvers.length).forEach(resolve => resolve());
    },
  };
}

export { resultContainer, TestHook };
