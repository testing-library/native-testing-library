import * as defaultQueries from './queries';

/**
 * @typedef {{[key: string]: Function}} FuncMap
 */

/**
 * @param {HTMLElement} container container
 * @param {FuncMap} queries object of functions
 * @returns {FuncMap} returns object of functions bound to container
 */
function getQueriesForElement(container, queries = defaultQueries) {
  return Object.keys(queries).reduce((helpers, key) => {
    const fn = queries[key];
    helpers[key] = fn.bind(null, container);
    return helpers;
  }, {});
}

export { getQueriesForElement };
