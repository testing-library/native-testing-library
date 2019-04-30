import * as defaultQueries from './queries';

function getQueriesForElement(testRenderer, queries = defaultQueries) {
  return Object.keys(queries).reduce((helpers, key) => {
    const fn = queries[key];
    helpers[key] = fn.bind(null, testRenderer);
    return helpers;
  }, {});
}

export { getQueriesForElement };
