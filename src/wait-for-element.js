function waitForElement(callback, { container, interval = 50, timeout = 4500 } = {}) {
  return new Promise((resolve, reject) => {
    if (typeof callback !== 'function') {
      reject(new Error('waitForElement requires a callback as the first parameter'));
      return;
    }
    const timer = setTimeout(onTimeout, timeout);
    let lastError;

    function onDone(error, result) {
      clearTimeout(timer);

      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }

    function onMutation() {
      try {
        const result = container ? callback({ container: container.root }) : callback();
        if (result) {
          onDone(null, result);
        }
        // If `callback` returns falsy value, wait for the next mutation or timeout.
      } catch (error) {
        // Save the callback error to reject the promise with it.
        lastError = error;
        // If `callback` throws an error, wait for the next mutation or timeout.
        setTimeout(onMutation, interval);
      }
    }

    function onTimeout() {
      onDone(lastError || new Error('Timed out in waitForElement.'), null);
    }

    setTimeout(onMutation, 0);
  });
}

export { waitForElement };
