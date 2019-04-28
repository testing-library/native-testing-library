import { getCoreComponents } from './core-components';

getCoreComponents().forEach(component => {
  try {
    // try to un-mock the component
    jest.unmock(component);
  } catch (e) {
    // do nothing if we can't
  }
});
