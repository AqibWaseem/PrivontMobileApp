import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// ... (your import statements remain the same)

const SearchablePicker = () => {
  const [searchText, setSearchText] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleSearch = text => {
    setSearchText(text);
    // Fetch data only if searchText is not empty
    if (text.trim() !== '') {
      fetchData(text);
    } else {
      // If searchText is empty, hide the menu
      setMenuVisible(false);
    }
  };

  const fetchData = async text => {
    try {
      const response = await axios.get(
        `https://privont.com/ZipCode/GetZipCodeInfo?ZipCodeID=${text}`,
      );
      console.log(response.data.Data);
      setMenuItems(response.data.Data);
      setMenuVisible(response.data.Data.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error and maybe setMenuVisible(false) here if necessary
    }
  };

  const handleItemPress = value => {
    console.log('Item pressed:', value);
    // Do something with the selected item
    setMenuVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setMenuVisible(!isMenuVisible)}>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: 'rgba(0, 0, 0, 0)',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={{
                height: 30,
                borderRadius: 4,
                width: 245,
                borderWidth: 1,
                borderColor: 'gray',
                padding: 5,
              }}
              placeholder="Search..."
              value={searchText}
              onChangeText={text => handleSearch(text)}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isMenuVisible && (
        <ScrollView style={{width: 246, marginTop: 5}}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.ZipCodeID}
              onPress={() => handleItemPress(item.value)}>
              <View style={{padding: 10}}>
                <Text>
                  <Text style={{fontWeight: 'bold', color: '#000'}}>
                    {item.ZipCode}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchablePicker;
