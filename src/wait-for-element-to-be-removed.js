import { getConfig } from './config';
import { getSetImmediate } from './helpers';

function waitForElementToBeRemoved(callback, { interval = 50, timeout = 4500 } = {}) {
  return new Promise((resolve, reject) => {
    if (typeof callback !== 'function') {
      reject(new Error('waitForElementToBeRemoved requires a callback as the first parameter'));
      return;
    }
    const timer = setTimeout(onTimeout, timeout);
    let observer;

    // Check if the element is not present
    /* istanbul ignore next */
    const result = callback();
    if (!result || (Array.isArray(result) && !result.length)) {
      onDone(
        new Error(
          'The callback function which was passed did not return an element or non-empty array of elements. waitForElementToBeRemoved requires that the element(s) exist before waiting for removal.',
        ),
      );
    }

    observer = setTimeout(onMutation);

    function onDone(error, result) {
      const setImmediate = getSetImmediate();
      clearTimeout(timer);
      /* istanbul ignore next */
      setImmediate(() => clearTimeout(observer));
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }

    function onMutation() {
      try {
        /* istanbul ignore next */
        const result = callback();
        if (!result || (Array.isArray(result) && !result.length)) {
          onDone(null, true);
        } else {
          observer = setTimeout(onMutation, interval);
        }
      } catch (error) {
        onDone(null, true);
      }
    }

    function onTimeout() {
      onDone(new Error('Timed out in waitForElementToBeRemoved.'), null);
    }
  });
}

function waitForElementToBeRemovedWrapper(...args) {
  return getConfig().asyncWrapper(() => waitForElementToBeRemoved(...args));
}

export { waitForElementToBeRemovedWrapper as waitForElementToBeRemoved };
