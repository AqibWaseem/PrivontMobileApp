import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../../components/AppText';
import SimpleButton from '../../components/SimpleButton';
import colors from '../../config/colors';
import {
  selectGetPriceRange,
  selectGetReferType,
  setUserReferDetails,
} from '../../store/userSlice';
import {showToastWithGravityAndOffset} from '../../utilities/ToastMessage';
import RadioButtonGroup from '../RadioButtonGroup';
import AnimatedLoader from '../../utilities/AnimatedLoader';
import BaseUrl from '../../config/BaseUrl';

const RealAdminRefer = ({navigation, route}) => {
  const userDetails = route.params.item;
  console.log(userDetails);
  const leadFirstName = userDetails.FirstName;
  const leadLastName = userDetails.LastName;
  const leadContact1 = userDetails.Contact1;
  const leadEmailAddress = userDetails.EmailAddress;
  const leadState = userDetails.State;
  const dispatch = useDispatch();
  const priceRange = useSelector(selectGetPriceRange);
  const referType = useSelector(selectGetReferType);
  const PriceRanges = priceRange?.map(item => ({
    label: item.PricePoint,
    value: item.PricePointID.toString(),
  }));
  const ReferTypes = referType?.map(item => ({
    label: item.TypeTitle,
    value: item.TypeID.toString(),
  }));

  const [firstName, setFirstName] = useState(leadFirstName);
  const [lastName, setLastName] = useState(leadLastName);
  const [phone, setPhone] = useState(leadContact1);
  const [email, setEmail] = useState(leadEmailAddress);
  const [stateValue, setStateValue] = useState(leadState);
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const [isOpenType, setIsOpenType] = useState(false);
  const [currentValueType, setCurrentValueType] = useState();
  const [isOpenCall, setIsOpenCall] = useState();
  const [currentValueCall, setCurrentValueCall] = useState();
  const [switchValue, setSwitchValue] = useState(false);
  const [militarySwitch, setMilitarySwitch] = useState(false);
  const [selectedOption, setSelectedOption] = useState(2);
  const [userId, setUserId] = useState(0);
  const [userType, setUserType] = useState(0);
  const [referdata, setReferData] = useState(0);
  const [loading, setLoading] = useState(false);

  const a = async () => {
    setUserType(JSON.parse(await AsyncStorage.getItem('UserType')));
    setUserId(JSON.parse(await AsyncStorage.getItem('UserID')));
  };
  a();
  // console.log(selectedOption);
  const toggleSwitch = () => {
    setSwitchValue(!switchValue);
  };

  const toggleSwitchMilitary = () => {
    setMilitarySwitch(!militarySwitch);
  };

  items3 = [
    {label: 'Immediately', value: '1'},
    {label: 'Later', value: '2'},
  ];

  const handleKeyPress = event => {
    if (event.nativeEvent.key === 'Enter') {
      Keyboard.dismiss();
    }
  };

  const renderInputField = (
    label,
    maxLengthValue,
    state,
    setState,
    keyboardType,
  ) => (
    <View style={styles.inputContainer}>
      <AppText style={styles.label}>{label}:</AppText>
      <TextInput
        style={styles.input}
        placeholderTextColor="#fff"
        onChangeText={text => setState(text)}
        value={state}
        // editable={false}
        onKeyPress={handleKeyPress}
        maxLength={maxLengthValue}
        keyboardType={keyboardType}
      />
    </View>
  );

  const userData = {
    firstName: leadFirstName,
    lastName: leadLastName,
    EmailAddress: leadEmailAddress,
    Contact1: leadContact1,
    UserID: userId,
    UserType: userType,
    IsApproved: false,
    IsEmailVerified: 0,
    UniqueIdentifier: 0,
    SourceID: 1,
    PriceRangeID: currentValue,
    State: leadState,
    FirstTimeBuyer: switchValue ? 1 : 0,
    IsMilitary: militarySwitch ? 1 : 0,
    TypeID: currentValueType,
    BestTimeToCall: currentValueCall,
  };

  const saveButtonHandler = async () => {
    dispatch(setUserReferDetails(userData));
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !stateValue ||
      currentValue === undefined ||
      currentValueType === undefined ||
      currentValueCall === undefined
    ) {
      showToastWithGravityAndOffset('Please Provide Complete Details !!');
      return;
    }
    if (email) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValidEmail) {
        alert('Invalid email entered. Please enter a valid email address.');
        return;
      }
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BaseUrl}InvitationReference/Invite?TypeUser=${4}`,
        userData,
      );
      console.log('Error', response.data);
      if (response.data.Data) {
        console.log('refer data', response.data.Data);
        setLoading(false);
        showToastWithGravityAndOffset('Refered Successfully !!');
        navigation.navigate('RealAdminProfile', {
          data: response.data.Data,
        });
      }
    } catch (error) {
      showToastWithGravityAndOffset('Error Occured !!');
      // throw error;
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar hidden={true} />
        <View>
          <Image
            source={require('../../assets/modern-furniture-designs.jpg')}
            style={{
              width: '100%',
              height: 130,
            }}
          />
          <Image
            source={require('../../assets/Fahad.jpg')}
            style={styles.imagesContainer}
          />
        </View>
        <AppText
          style={{textAlign: 'center', color: '#fff', fontSize: 16, margin: 5}}>
          Refer Member
        </AppText>

        <View style={styles.formBody}>
          {renderInputField(
            'First Name',
            15,
            firstName,
            setFirstName,
            'default',
          )}
          {renderInputField('Last Name', 15, lastName, setLastName, 'default')}
          {renderInputField('Phone', 13, phone, setPhone, 'numeric')}
          {renderInputField('Email', 35, email, setEmail, 'email-address')}
          {renderInputField('State', 20, stateValue, setStateValue, 'default')}
        </View>
        <View
          style={{
            height: 2.5,
            backgroundColor: 'black',
            width: '100%',
            marginVertical: 10,
          }}></View>
        {/* .................................. */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{marginTop: 12, marginLeft: 20, marginRight: 20}}>
            <AppText style={styles.label}>Price Range</AppText>
          </View>
          <View>
            <DropDownPicker
              items={PriceRanges}
              open={isOpen}
              setOpen={() => {
                setIsOpen(!isOpen), setIsOpenCall(false), setIsOpenType(false);
              }}
              value={currentValue}
              setValue={val => setCurrentValue(val)}
              maxHeight={80}
              autoScroll
              theme="DARK"
              dropDownDirection="BOTTOM"
              dropDownContainerStyle={{position: 'relative', top: 0}}
              listMode="SCROLLVIEW"
              style={{
                maxHeight: 10,
                width: 200,
                minWidth: 150,
                backgroundColor: colors.dark,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <View style={{marginTop: 12, marginLeft: 20, marginRight: 20}}>
            <AppText style={styles.label}>Type</AppText>
          </View>
          <View>
            <DropDownPicker
              items={ReferTypes}
              open={isOpenType}
              setOpen={() => {
                setIsOpenType(!isOpenType),
                  setIsOpen(false),
                  setIsOpenCall(false);
              }}
              value={currentValueType}
              setValue={val => setCurrentValueType(val)}
              maxHeight={80}
              autoScroll
              theme="DARK"
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              dropDownContainerStyle={{position: 'relative', top: 0}}
              style={{
                maxHeight: 10,
                width: 200,
                minWidth: 150,
                backgroundColor: colors.dark,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <AppText style={[styles.label, , {marginLeft: 20, width: '35%'}]}>
            First Time Buyer
          </AppText>
          <Switch
            style={{transform: [{scaleX: 1.2}, {scaleY: 1}]}}
            trackColor={{false: 'white', true: '#e5634d'}}
            thumbColor={switchValue ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={switchValue}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <AppText style={[styles.label, , {marginLeft: 20}]}>Military</AppText>
          <Switch
            style={{transform: [{scaleX: 1.2}, {scaleY: 1}]}}
            trackColor={{false: 'white', true: '#e5634d'}}
            thumbColor={militarySwitch ? 'white' : 'white'}
            ios_backgroundColor="#e5634d"
            onValueChange={toggleSwitchMilitary}
            value={militarySwitch}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <View style={{marginTop: 12, marginLeft: 20, marginRight: 20}}>
            <AppText style={[styles.label, {width: 'auto'}]}>
              Best Time To Call
            </AppText>
          </View>
          <View style={styles.modalContainer}>
            <DropDownPicker
              items={items3}
              open={isOpenCall}
              setOpen={() => {
                setIsOpenCall(!isOpenCall),
                  setIsOpen(false),
                  setIsOpenType(false);
              }}
              value={currentValueCall}
              setValue={val => setCurrentValueCall(val)}
              autoScroll
              theme="DARK"
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              dropDownContainerStyle={{position: 'relative', top: 0}}
              style={{
                maxHeight: 10,
                width: 200,
                minWidth: 150,
                backgroundColor: colors.dark,
              }}
            />
          </View>
        </View>
        {/* <RadioButtonGroup
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        /> */}
        {loading && <AnimatedLoader top={2} />}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SimpleButton
            onPress={() => saveButtonHandler()}
            label="SAVE"
            buttonStyle={{
              backgroundColor: 'blue',
              height: 50,
              width: 200,
              borderRadius: 25,
              justifyContent: 'center',
              alignContent: 'center',
              // marginVertical: 50,
              marginTop: 30,
            }}
            labelStyle={{color: '#fff', alignSelf: 'center'}}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    width: 100,
  },
  input: {
    flex: 1,
    height: 27,
    backgroundColor: 'black',
    color: 'white',
    padding: 5,
  },
});
export default RealAdminRefer;
