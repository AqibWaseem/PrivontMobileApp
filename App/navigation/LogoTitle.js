import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TextInput, View} from 'react-native';

import colors from '../config/colors';

const LogoTitle = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    navigation.navigate('Member', {search: searchText});
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search by name, phone, or email .."
        placeholderTextColor={colors.white}
        onChangeText={text => setSearchText(text)}
        value={searchText}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: '#fff',
  },
});

export default LogoTitle;
