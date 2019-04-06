let reactAct;
let actSupported = false;
let asyncActSupported = false;

try {
  reactAct = require('react-test-renderer').act;
  actSupported = reactAct !== undefined;

  const originalError = console.error;
  let errorCalled = false;
  console.error = () => {
    errorCalled = true;
  };
  console.error.calls = [];
  /* istanbul ignore next */
  reactAct(() => ({ then: () => {} })).then(() => {});
  /* istanbul ignore next */
  if (!errorCalled) {
    asyncActSupported = true;
  }
  console.error = originalError;
} catch (error) {
  // ignore, this is to support old versions of react
}

function actPolyfill(callback) {
  callback();
}

const act = reactAct || actPolyfill;

async function asyncActPolyfill(cb) {
  await cb();
  // make all effects resolve after
  act(() => {});
}

// istanbul ignore next
const asyncAct = asyncActSupported ? reactAct : asyncActPolyfill;

export default act;
export { asyncAct };
