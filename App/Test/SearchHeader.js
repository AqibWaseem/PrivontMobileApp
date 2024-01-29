// SearchHeader.js

import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const SearchHeader = ({onChangeText, value, onSubmit}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default SearchHeader;
