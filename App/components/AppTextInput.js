import React, {useState} from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const AppTextInput = ({
  icon,
  secureTextEntry,
  color,
  disabled,
  value,
  ...otherProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {icon && (
        <Icons name={icon} size={25} color={color} style={styles.icon} />
      )}
      <TextInput
        style={styles.textInput}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        editable={!disabled}
        value={value}
        {...otherProps}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icons
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={25}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#494949',
    borderRadius: 10,
    width: '85%',
    padding: 3,
    marginVertical: 10,
    marginHorizontal: '8%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: '#fff',
  },
});

export default AppTextInput;
