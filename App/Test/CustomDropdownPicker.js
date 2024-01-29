import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDropdownPicker = ({options, onSelect, selectedValue, zIndex}) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = option => {
    onSelect(option);
    toggleOptions();
  };

  return (
    <View style={[styles.container, {zIndex}]}>
      <TouchableWithoutFeedback onPress={toggleOptions}>
        <View style={styles.selectedOption}>
          <Text
            style={
              selectedValue !== undefined && selectedValue !== ''
                ? styles.selectedText
                : styles.placeholderText
            }>
            {selectedValue !== undefined && selectedValue !== ''
              ? selectedValue
              : 'Select An Item'}
          </Text>

          <Ionicons
            name={showOptions ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={20}
            color="#fff"
          />
        </View>
      </TouchableWithoutFeedback>

      {showOptions && (
        <View style={styles.optionsContainer}>
          {options.map(option => (
            <TouchableWithoutFeedback
              key={option}
              onPress={() => handleOptionSelect(option)}>
              <View style={styles.option}>
                <Text style={{color: '#fff'}}>{option}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 200,
  },
  selectedOption: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#808080',
  },
  selectedText: {
    color: '#fff',
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    zIndex: 1,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CustomDropdownPicker;
