import { asyncAct } from './act-compat';

let config = {
  asyncWrapper: async cb => {
    let result;
    asyncAct(() => {
      result = cb();
    });
    return result;
  },
};

export function getConfig() {
  return config;
}
