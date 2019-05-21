import { asyncAct } from '../act-compat';
import { NativeTestEvent } from '../lib/events';
import { configure as configureNTL } from '../lib';

// Make this global for convenience, just like browser events
global.NativeTestEvent = NativeTestEvent;

configureNTL({
  asyncWrapper: async cb => {
    let result;
    await asyncAct(async () => {
      result = await cb();
    });
    return result;
  },

  // Query lists
  coreComponents: [
    'ActivityIndicator',
    'Button',
    'DrawerLayoutAndroid',
    'Image',
    'Modal',
    'Picker',
    'RefreshControl',
    'SafeAreaView',
    'ScrollView',
    'Switch',
    'Text',
    'TextInput',
    'TouchableHighlight',
    'TouchableNativeFeedback',
    'TouchableOpacity',
    'TouchableWithoutFeedback',
    'View',
  ],
  displayValueComponents: ['TextInput', 'Picker', 'Switch'],
  textComponents: ['Button', 'Text', 'TextInput'],
  titleComponents: ['Button', 'RefreshControl'],
});
