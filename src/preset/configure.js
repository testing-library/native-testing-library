import { asyncAct } from '../act-compat';
import { configure as configureNTL } from '../lib';

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
  displayValueComponents: ['TextInput', 'Picker'],
  textComponents: ['Button', 'Text', 'TextInput'],
  titleComponents: ['Button', 'RefreshControl'],
});
