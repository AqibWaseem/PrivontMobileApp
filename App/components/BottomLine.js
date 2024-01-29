import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../config/colors';

const BottomLine = ({
  height = 1,
  width = '100%',
  color = colors.black,
  marginVertical = 0,
  ...otherProps
}) => {
  return (
    <View
      style={{
        height: height,
        backgroundColor: color,
        marginVertical: marginVertical,
        width: width,
        ...otherProps,
      }}></View>
  );
};

export default BottomLine;

const styles = StyleSheet.create({});
