import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

const Screen = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // backgroundColor: 'yellow',
    // flex: 1,
  },
});
