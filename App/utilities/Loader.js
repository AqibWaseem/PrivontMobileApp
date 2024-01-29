import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import colors from '../config/colors';

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={'#808080'} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
});

export default Loader;
