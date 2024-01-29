import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const InputWithCross = () => {
  const [inputText, setInputText] = useState('');

  const handleClearText = () => {
    setInputText('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        value={inputText}
        onChangeText={text => setInputText(text)}
      />
      {inputText.length > 0 && (
        <TouchableOpacity onPress={handleClearText} style={styles.clearButton}>
          <AntDesign name="close" size={20} color="#555" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 8,
  },
});

export default InputWithCross;
