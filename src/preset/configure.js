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
    'react-native/Libraries/Components/ActivityIndicator/ActivityIndicator',
    'react-native/Libraries/Components/Button',
    'react-native/Libraries/Components/DrawerAndroid/DrawerLayoutAndroid',
    'react-native/Libraries/Image/Image',
    'react-native/Libraries/Modal/Modal',
    'react-native/Libraries/Components/Picker/Picker',
    'react-native/Libraries/Components/RefreshControl/RefreshControl',
    'react-native/Libraries/Components/SafeAreaView/SafeAreaView',
    'react-native/Libraries/Components/ScrollView/ScrollView',
    'react-native/Libraries/Components/Switch/Switch',
    'react-native/Libraries/Text/Text',
    'react-native/Libraries/Components/TextInput/TextInput',
    'react-native/Libraries/Components/Touchable/TouchableHighlight',
    'react-native/Libraries/Components/Touchable/TouchableNativeFeedback',
    'react-native/Libraries/Components/Touchable/TouchableOpacity',
    'react-native/Libraries/Components/Touchable/TouchableWithoutFeedback',
    'react-native/Libraries/Components/View/View',
  ],
  displayValueComponents: ['TextInput', 'Picker', 'Switch'],
  textComponents: ['Button', 'Text', 'TextInput'],
  titleComponents: ['Button', 'RefreshControl'],
});
