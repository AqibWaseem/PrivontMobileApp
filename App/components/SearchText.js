import React, {useState} from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchText = ({icon, secureTextEntry, color, ...otherProps}) => {
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
    width: '92%',
    marginVertical: 10,
    marginHorizontal: '4%',
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    // flex: 1,
    color: '#fff',
    width: '92%',
  },
});

export default SearchText;
