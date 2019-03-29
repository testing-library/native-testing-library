import { act as trAct } from 'react-test-renderer';

function actPolyfill(callback) {
  callback();
}

const act = trAct || actPolyfill;

function rntlAct(callback) {
  return act(callback);
}

export default rntlAct;
