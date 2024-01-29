import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from '../../components/AppText';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../config/colors';
const CustomeDropdown = ({
  label,
  items,
  isOpen,
  setIsOpen,
  currentValue,
  setCurrentValue,
  dropDownDirection,
  maxHeight = 80,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{marginLeft: 20}}>
        <AppText style={[styles.label, {fontSize: 16}]}>{label}</AppText>
      </View>
      <View>
        <DropDownPicker
          items={items}
          open={isOpen}
          setOpen={() => setIsOpen(!isOpen)}
          value={currentValue}
          setValue={val => setCurrentValue(val)}
          maxHeight={maxHeight}
          autoScroll
          theme="DARK"
          dropDownDirection={dropDownDirection}
          dropDownContainerStyle={{position: 'relative', top: 0}}
          listMode="SCROLLVIEW"
          labelStyle={{fontWeight: 'bold'}}
          style={{
            minWidth: 105,
            backgroundColor: colors.dark,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  formBody: {
    marginTop: 20,
  },
  imagesContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: '65%',
    marginLeft: 5,
    borderRadius: 75,
    borderColor: '#fff',
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 50,
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 27,
    backgroundColor: 'black',
    color: 'white',
    padding: 5,
  },
});

export default CustomeDropdown;
