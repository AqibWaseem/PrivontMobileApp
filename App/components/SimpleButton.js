import React from 'react';
import {TouchableOpacity} from 'react-native';
import AppText from './AppText';

const SimpleButton = ({onPress, label, buttonStyle, labelStyle, loading}) => (
  <TouchableOpacity
    style={{
      backgroundColor: 'blue',
      height: 50,
      width: 200,
      borderRadius: 25,
      ...buttonStyle,
    }}
    onPress={onPress}>
    <AppText style={{color: '#fff', alignSelf: 'center', ...labelStyle}}>
      {label}
    </AppText>
  </TouchableOpacity>
);

export default SimpleButton;
