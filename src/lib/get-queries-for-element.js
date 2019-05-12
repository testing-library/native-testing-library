import * as defaultQueries from './queries';

function getQueriesForElement(element, queries = defaultQueries) {
  return Object.keys(queries).reduce((helpers, key) => {
    const fn = queries[key];
    helpers[key] = fn.bind(null, element);
    return helpers;
  }, {});
}

export { getQueriesForElement };
