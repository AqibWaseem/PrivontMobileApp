// YourScreen.js

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Adjust the icon library as needed
import {useNavigation} from '@react-navigation/native';

const YourScreen = () => {
  const navigation = useNavigation(); // Use the useNavigation hook to access the navigation object

  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Implement your search logic here
    // console.log('Searching for:', searchText);
  };

  const handleNotificationPress = () => {
    // Implement your notification logic here
    console.log('Notification icon pressed');
  };

  // Custom header component
  const CustomHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name="superpowers" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={text => setSearchText(text)}
          value={searchText}
          onSubmitEditing={handleSearch}
        />
      </View>
      <TouchableOpacity onPress={handleNotificationPress}>
        <FontAwesome name="superpowers" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      {/* Use the header prop to set the custom header */}
      <CustomHeader />

      {/* Your main content goes here */}
      <Text>Main Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  searchContainer: {
    flex: 1,
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default YourScreen;
