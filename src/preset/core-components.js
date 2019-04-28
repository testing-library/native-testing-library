const CoreComponents = [
  'ActivityIndicator',
  'Button',
  'DrawerLayoutAndroid',
  'Image',
  'Modal',
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
];

function setCoreComponents(components) {
  return [...CoreComponents, ...components];
}

function getCoreComponents() {
  return [...CoreComponents, 'Picker'];
}

export { getCoreComponents, setCoreComponents };
