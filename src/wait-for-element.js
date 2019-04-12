import { getConfig } from './config';
import { getSetImmediate } from './helpers';

function waitForElement(callback, { interval = 50, timeout = 4500 } = {}) {
  return new Promise((resolve, reject) => {
    if (typeof callback !== 'function') {
      reject(new Error('waitForElement requires a callback as the first parameter'));
      return;
    }
    const timer = setTimeout(onTimeout, timeout);
    let observer, lastError;

    function onDone(error, result) {
      const setImmediate = getSetImmediate();
      clearTimeout(timer);
      setImmediate(() => clearTimeout(observer));
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }

    function onMutation() {
      try {
        const result = callback();
        if (result) {
          onDone(null, result);
        }
      } catch (error) {
        lastError = error;
        observer = setTimeout(onMutation, interval);
      }
    }

    function onTimeout() {
      onDone(lastError || new Error('Timed out in waitForElement.'), null);
    }

    observer = setTimeout(onMutation);
  });
}

function waitForElementWrapper(...args) {
  return getConfig().asyncWrapper(() => waitForElement(...args));
}

export { waitForElementWrapper as waitForElement };
