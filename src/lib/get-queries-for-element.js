import * as defaultQueries from './queries';

function getQueriesForElement(baseElement, queries = defaultQueries) {
  return Object.keys(queries).reduce((helpers, key) => {
    const fn = queries[key];
    helpers[key] = fn.bind(null, baseElement);
    return helpers;
  }, {});
}

export { getQueriesForElement, getQueriesForElement as within };
