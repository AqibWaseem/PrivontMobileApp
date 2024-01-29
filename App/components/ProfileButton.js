import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import colors from '../config/colors';
import AppText from './AppText';
const ProfileButton = ({
  title,
  onPress,
  color = 'primary',
  width,
  marginHorizontal,
  marginVertical,
  marginTop,
  height,
  borderRadius,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: color,
          width,
          marginHorizontal,
          marginVertical,
          marginTop,
          height,
          borderRadius,
        },
      ]}
      onPress={onPress}>
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
  },
});
