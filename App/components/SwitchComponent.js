import React from 'react';
import {Switch} from 'react-native';
import colors from '../config/colors';

const CustomSwitch = ({value, onValueChange}) => {
  return (
    <Switch
      style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
      trackColor={{
        false: 'white',
        true: '#e5634d',
      }}
      thumbColor={'white'}
      ios_backgroundColor="#e5634d"
      onValueChange={onValueChange}
      value={value}
    />
  );
};

export default CustomSwitch;
