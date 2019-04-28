import { mockComponent } from './mock-component';
import { getCoreComponents, setCoreComponents } from './core-components';

module.exports = {
  CoreComponents: getCoreComponents(),
  dangerouslyMockComponent: ({ __mock }) => mockComponent({ name: __mock.name, path: __mock.path }),
  dangerouslySetCoreComponents: ({ __components }) => setCoreComponents(__components),
};
