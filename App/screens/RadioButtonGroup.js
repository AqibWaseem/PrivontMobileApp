import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome or another icon library
import colors from '../config/colors';
import {useSelector} from 'react-redux';

const RadioButtonGroup = ({selectedOption, setSelectedOption}) => {
  const handleOptionChange = id => {
    setSelectedOption(id);
  };
  let {UserType, UserID, UserName} = useSelector(state => state.user.data);

  return (
    <View style={styles.radioButtonContainer}>
      {UserType === 2 && (
        <>
          <TouchableOpacity onPress={() => handleOptionChange(2)}>
            <View
              style={[
                styles.radioButton,
                selectedOption === 2 && styles.radioButtonChecked,
              ]}>
              {selectedOption === 2 && (
                <FontAwesome name="check" size={15} color="#fff" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>Real Estate</Text>

          <TouchableOpacity onPress={() => handleOptionChange(3)}>
            <View
              style={[
                styles.radioButton,
                selectedOption === 3 && styles.radioButtonChecked,
              ]}>
              {selectedOption === 3 && (
                <FontAwesome name="check" size={15} color="#fff" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>Lender</Text>

          <TouchableOpacity onPress={() => handleOptionChange(4)}>
            <View
              style={[
                styles.radioButton,
                selectedOption === 4 && styles.radioButtonChecked,
              ]}>
              {selectedOption === 4 && (
                <FontAwesome name="check" size={15} color="#fff" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>Lead</Text>

          <TouchableOpacity onPress={() => handleOptionChange(5)}>
            <View
              style={[
                styles.radioButton,
                selectedOption === 5 && styles.radioButtonChecked,
              ]}>
              {selectedOption === 5 && (
                <FontAwesome name="check" size={15} color="#fff" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>Vendor</Text>
        </>
      )}
      {UserType === 3 && (
        <>
          <TouchableOpacity onPress={() => handleOptionChange(5)}>
            <View
              style={[
                styles.radioButton,
                selectedOption === 5 && styles.radioButtonChecked,
              ]}>
              {selectedOption === 5 && (
                <FontAwesome name="check" size={15} color="#fff" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.labelVendor}>Vendor</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
    marginHorizontal: 10,
  },
  radioButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonChecked: {
    backgroundColor: 'green',
  },
  label: {
    color: '#fff',
  },
  labelVendor: {
    color: '#fff',
    paddingRight: 320,
  },
});

export default RadioButtonGroup;
