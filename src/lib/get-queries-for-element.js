import * as defaultQueries from './queries';

function getQueriesForElement(container, queries = defaultQueries) {
  return Object.keys(queries).reduce((helpers, key) => {
    const fn = queries[key];
    helpers[key] = fn.bind(null, container);
    return helpers;
  }, {});
}

export { getQueriesForElement, getQueriesForElement as within };
