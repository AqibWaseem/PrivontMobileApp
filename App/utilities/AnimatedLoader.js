import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import colors from '../config/colors';

const AnimatedLoader = ({position, top, left, bottom, right}) => {
  const scale1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;
  const scale3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const scaleAnimation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(scale1, {
          toValue: 0.2,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scale1, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    );

    const scaleAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(scale2, {
          toValue: 0.2,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scale2, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    );

    const scaleAnimation3 = Animated.loop(
      Animated.sequence([
        Animated.timing(scale3, {
          toValue: 0.2,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scale3, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    );

    scaleAnimation1.start();
    scaleAnimation2.start();
    scaleAnimation3.start();

    return () => {
      scaleAnimation1.stop();
      scaleAnimation2.stop();
      scaleAnimation3.stop();
    };
  }, [scale1, scale2, scale3]);

  return (
    <View
      style={[
        styles.container,
        {
          top: top,
          position: position,
          left: left,
          bottom: bottom,
          right: right,
        },
      ]}>
      <Animated.View
        style={[styles.loaderBox, {transform: [{scale: scale1}]}]}
      />
      <Animated.View
        style={[styles.loaderBox1, {transform: [{scale: scale2}]}]}
      />
      <Animated.View
        style={[styles.loaderBox2, {transform: [{scale: scale3}]}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    width: 15,
    height: 15,
    borderRadius: 7.5, // Make it a circle
    backgroundColor: colors.pink,
    margin: 5,
  },
  loaderBox1: {
    width: 15,
    height: 15,
    borderRadius: 7.5, // Make it a circle
    backgroundColor: 'yellow',
    margin: 5,
  },
  loaderBox2: {
    width: 15,
    height: 15,
    borderRadius: 7.5, // Make it a circle
    backgroundColor: 'green',
    margin: 5,
  },
});

export default AnimatedLoader;
