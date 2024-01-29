import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const ClearableTextInput = ({
  icon,
  onTextChange,
  clearText,
  multiline = false,
  keyboardType,
  ...otherProps
}) => {
  const [text, setText] = useState('');

  // const clearText = () => {
  //   setText('');
  // };

  return (
    <View style={styles.container}>
      {icon && <Icons name={icon} size={25} color="#000" style={styles.icon} />}
      <TextInput
        style={styles.textInput}
        value={text}
        multiline={multiline}
        keyboardType={keyboardType}
        onChangeText={newText => {
          setText(newText);
          onTextChange && onTextChange(newText);
        }}
        {...otherProps}
      />
      {text.length > 0 && (
        <TouchableOpacity onPress={clearText} style={styles.clearButton}>
          <Icons name="close" size={20} color="#fff" />
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
    marginVertical: 10,
    marginHorizontal: '8%',
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    color: '#fff',
    borderWidth: 1,
  },
  clearButton: {
    padding: 10,
    position: 'absolute',
    right: 0,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
});

export default ClearableTextInput;
