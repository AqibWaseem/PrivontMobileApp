import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import AppText from '../components/AppText';
import SimpleButton from '../components/SimpleButton';
import colors from '../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {showToastWithGravityAndOffset} from '../utilities/ToastMessage';

const CustomDropdown1 = ({onAddField}) => {
  const [selectedField, setSelectedField] = useState('Name');

  return (
    <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={selectedField}
        onValueChange={(itemValue, itemIndex) => setSelectedField(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Name" value="Name" />
        <Picker.Item label="SubKey" value="SubKey" />
      </Picker>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onAddField(`[${selectedField}]`)}>
        <Text style={styles.buttonText}>Add Field</Text>
      </TouchableOpacity>
    </View>
  );
};
const CustomDropdown2 = ({onAddField}) => {
  const [selectedField, setSelectedField] = useState('Name');

  return (
    <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={selectedField}
        onValueChange={(itemValue, itemIndex) => setSelectedField(itemValue)}
        style={styles.picker}>
        <Picker.Item label="SMSClaimedKey" value="SMSClaimedKey" />
        <Picker.Item label="Name" value="Name" />
      </Picker>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onAddField(`[${selectedField}]`)}>
        <Text style={styles.buttonText}>Add Field</Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomDropdown3 = ({onAddField}) => {
  const [selectedField, setSelectedField] = useState('YourName');

  return (
    <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={selectedField}
        onValueChange={(itemValue, itemIndex) => setSelectedField(itemValue)}
        style={styles.picker}>
        <Picker.Item label="YourName" value="YourName" />
        <Picker.Item label="Name" value="Name" />
        <Picker.Item label="Link" value="Link" />
      </Picker>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onAddField(`[${selectedField}]`)}>
        <Text style={styles.buttonText}>Add Field</Text>
      </TouchableOpacity>
    </View>
  );
};

const SmsFormat = () => {
  const [leadSubscribe, setLeadSubscribe] = useState('');
  const [subKey, setSubKey] = useState('');
  const [sMSDetailKey, setSMSDetailKey] = useState('');
  const [validKey, setValidKey] = useState(false);

  const [sMSDetails, setSMSDetails] = useState('');
  const [sMSDetailInvite, setSMSDetailInvite] = useState('');

  const [selection, setSelection] = useState({start: 0, end: 0});
  const LeadSubscribe = field => {
    const beforeCursor = leadSubscribe.substring(0, selection.start);
    const afterCursor = leadSubscribe.substring(selection.start);
    setLeadSubscribe(beforeCursor + field + afterCursor);
    setSelection({
      start: selection.start + field.length,
      end: selection.start + field.length,
    });
  };
  const handleAddFieldSMS = field => {
    const beforeCursor = sMSDetails.substring(0, selection.start);
    const afterCursor = sMSDetails.substring(selection.start);
    setSMSDetails(beforeCursor + field + afterCursor);
    setSelection({
      start: selection.start + field.length,
      end: selection.start + field.length,
    });
  };
  const handleAddField = field => {
    const beforeCursor = sMSDetailInvite.substring(0, selection.start);
    const afterCursor = sMSDetailInvite.substring(selection.start);
    setSMSDetailInvite(beforeCursor + field + afterCursor);
    setSelection({
      start: selection.start + field.length,
      end: selection.start + field.length,
    });
  };
  const GetSMSSettings = async () => {
    const UserType = JSON.parse(await AsyncStorage.getItem('UserType'));
    const UserID = JSON.parse(await AsyncStorage.getItem('UserID'));

    try {
      const response = await axios.get(
        `https://privont.com/SMSSetting/GetSMSSettings?UserID=${UserID}&UserType=${UserType}`, // Corrected variable name here
      );

      setSMSDetails(response.data.Data[0].SMSDetail);
      setSMSDetailInvite(response.data.Data[0].SMSDetailInvite);
      setLeadSubscribe(response.data.Data[0].SMSDetailSub);
      setSubKey(response.data.Data[0].SMSSubKey);
      setSMSDetailKey(response.data.Data[0].SMSDetailKey);
    } catch (error) {
      console.error('Error fetching All Members data:', error);
    }
  };

  const GetKeyValidation = async () => {
    const UserType = JSON.parse(await AsyncStorage.getItem('UserType'));
    const UserID = JSON.parse(await AsyncStorage.getItem('UserID'));
    try {
      const response = await axios.get(
        `https://privont.com/SMSSetting/GetKeyValidation?Key=${sMSDetailKey}&UserID=${UserID}&UserType=${UserType}`, // Corrected variable name here
      );
      setValidKey(response.data.Data);
    } catch (error) {
      console.error('Error fetching All Members data:', error);
    }
  };

  useEffect(() => {
    GetKeyValidation();
    GetSMSSettings();
  }, []);

  const validateFields = () => {
    const requiredValues1 = ['[Name]', '[SubKey]'];
    const requiredValues2 = ['[Name]', '[SMSClaimedKey]'];
    const requiredValues3 = ['[YourName]', '[Name]', '[Link]'];

    // Check if all required values are present in leadSubscribe, subKey, sMSDetailKey, sMSDetails, and sMSDetailInvite
    const isAllFieldsPresent =
      requiredValues1.every(value => leadSubscribe.includes(value)) &&
      requiredValues2.every(value => sMSDetails.includes(value)) &&
      requiredValues3.every(value => sMSDetailInvite.includes(value));

    return isAllFieldsPresent;
  };
  const onPressHandler = async () => {
    const isAllFieldsPresent = validateFields();
    if (!isAllFieldsPresent) {
      showToastWithGravityAndOffset('Please provide all required details');
      return;
    }
    if (
      !leadSubscribe ||
      !subKey ||
      !sMSDetails ||
      !sMSDetailInvite ||
      !sMSDetailKey
    ) {
      showToastWithGravityAndOffset('Please Provide All Details Here');
      return;
    }
    if (validKey) {
      showToastWithGravityAndOffset('SMS Claim Key Is Same! Try Other');
      return;
    }

    const UserType = JSON.parse(await AsyncStorage.getItem('UserType'));
    const UserID = JSON.parse(await AsyncStorage.getItem('UserID'));

    try {
      const response = await axios.post(
        `https://privont.com/SMSSetting/SaveRecord`,
        {
          SMSDetail: sMSDetails,
          SMSDetailInvite: sMSDetailInvite,
          SMSSubKey: subKey,
          SMSDetailKey: sMSDetailKey,
          SMSDetailSub: leadSubscribe,
          UserID: UserID,
          UserType: UserType,
        },
      );
    } catch (error) {
      console.error('Error fetching All Members data:', error);
    } finally {
      showToastWithGravityAndOffset('SMS Send Successfully !!');
    }

    //     {
    //   "SMSDetail": "Detail text",
    //   "SMSDetailInvite": "Invite text",
    //   "SMSSubKey": "Sub key",
    //   "SMSDetailKey": "1234",
    //   "SMSDetailSub": "7878",
    //   "UserID": 123,
    //   "UserType": 1
    // }
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <AppText style={[styles.label, {marginTop: 30}]}>
        SMS format (Lead Subscribe)
      </AppText>
      <View style={{flexDirection: 'row', margin: 10}}>
        <AppText style={{alignSelf: 'center', fontSize: 18}}>
          Subscribe Key
        </AppText>
        <TextInput
          style={{
            width: '40%',
            backgroundColor: '#fff',
            alignSelf: 'center',
            marginLeft: 10,
            color: 'black',
          }}
          value={sMSDetailKey}
          onChangeText={setSMSDetailKey}
        />
      </View>
      <CustomDropdown1 onAddField={LeadSubscribe} />
      <TextInput
        style={styles.input}
        multiline
        value={leadSubscribe}
        onChangeText={setLeadSubscribe}
        onSelectionChange={event => {
          setSelection(event.nativeEvent.selection);
        }}
        selection={selection}
      />

      <AppText style={[styles.label, {marginTop: 50}]}>
        SMS format (Lead Invitation):
      </AppText>
      <View style={{flexDirection: 'row', margin: 10}}>
        <AppText style={{alignSelf: 'center', fontSize: 18}}>
          SMS Claimed Key
        </AppText>
        <TextInput
          style={{
            width: '40%',
            backgroundColor: '#fff',
            alignSelf: 'center',
            marginLeft: 10,
            color: 'black',
          }}
          value={subKey}
          onChangeText={setSubKey}
        />
      </View>
      <CustomDropdown2 onAddField={handleAddFieldSMS} />
      <TextInput
        style={styles.input}
        multiline
        value={sMSDetails}
        onChangeText={setSMSDetails}
        onSelectionChange={event => {
          setSelection(event.nativeEvent.selection);
        }}
        selection={selection}
      />
      <AppText style={[styles.label, {marginTop: 50}]}>
        SMS format for Invitation:
      </AppText>
      <CustomDropdown3 onAddField={handleAddField} />
      <TextInput
        style={styles.input}
        multiline
        value={sMSDetailInvite}
        onChangeText={setSMSDetailInvite}
        onSelectionChange={event => {
          setSelection(event.nativeEvent.selection);
        }}
        selection={selection}
      />

      <SimpleButton
        label="Save"
        // width="100%"
        buttonStyle={{
          backgroundColor: '#007bff',
          width: '93%',
          height: 70,
          marginTop: 20,
          marginBottom: 50,
          marginHorizontal: 12,
        }}
        labelStyle={{marginTop: 20}}
        onPress={onPressHandler}
        marginVertical={20}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    padding: 10,
  },
  label: {
    color: colors.pink,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 10,
    minHeight: 200,
    color: 'black',
    textAlignVertical: 'top',
    padding: 5,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
    color: '#fff',
  },
  picker: {
    flex: 0.7,
    color: '#000',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    flex: 0.3,
    height: 57,
    // height: 'auto',
    // marginBottom: 200,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default SmsFormat;
