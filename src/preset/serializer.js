import { toJSON } from '../lib';

module.exports = {
  test(value) {
    return value.$$typeof && Symbol.keyFor(value.$$typeof) === 'ntl.element';
  },
  print(value, serialize) {
    return serialize(toJSON(value));
  },
};
