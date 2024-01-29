// SplashScreen.js
import React from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import AppText from '../components/AppText'; // Update the path to your colors file
import colors from '../config/colors';
import AnimatedLoader from '../utilities/AnimatedLoader';

const SplashScreen = () => (
  <View style={[styles.container, {backgroundColor: colors.primary}]}>
    <StatusBar hidden />
    <View style={styles.logoContainer}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <AppText style={styles.tagline}>Privont</AppText>
    </View>
    <ActivityIndicator size="large" color={'#808080'} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  tagline: {
    fontSize: 52,
    marginVertical: 20,
  },
});

export default SplashScreen;
