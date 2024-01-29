// import React, {useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   View,
//   TextInput,
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import Entypo from 'react-native-vector-icons/Entypo';
// import colors from '../../config/colors';
// import imgPlaceHolder from '../../assets/profile2.png';
// import AppText from '../../components/AppText';
// import AppTextInput from '../../components/AppTextInput';
// import ProfileButton from '../../components/ProfileButton';

// const EditProfileScreen = () => {
//   const [profile, setProfile] = useState(null);

//   const imagePick = () => {
//     ImagePicker.openPicker({
//       width: 400,
//       height: 400,
//       cropping: true,
//     }).then(image => {
//       console.log(image);
//       setProfile(image.path);
//     });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.profileContainer}>
//         <Image
//           style={styles.image}
//           source={profile ? {uri: profile} : imgPlaceHolder}
//         />
//         <TouchableOpacity
//           onPress={imagePick}
//           style={{alignItems: 'flex-end', bottom: 50, left: 30}}>
//           <Entypo name="camera" size={30} color={colors.white} />
//         </TouchableOpacity>
//       </View>
//       <AppText style={{marginLeft: 35}}>Name</AppText>
//       <AppTextInput style={styles.inputStyles} placeholderTextColor="gray" />
//       <AppText style={{marginLeft: 35}}>Email</AppText>
//       <AppTextInput style={styles.inputStyles} placeholderTextColor="gray" />
//       <AppText style={{marginLeft: 35}}>Address</AppText>
//       <AppTextInput style={styles.inputStyles} placeholderTextColor="gray" />
//       <AppText style={{marginLeft: 35}}>Website</AppText>
//       <AppTextInput style={styles.inputStyles} placeholderTextColor="gray" />
//       <AppText style={{marginLeft: 35}}>Information</AppText>
//       <TextInput
//         style={styles.inputStylesDiscription}
//         placeholder="Input Your Information"
//         placeholderTextColor="gray"
//         textAlignVertical="top" // Set this property to 'top'
//         multiline={true}
//       />
//       <ProfileButton title="Confirm" color="secondary" />
//     </ScrollView>
//   );
// };

// export default EditProfileScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.primary,
//   },
//   profileContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     marginTop: 10,
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     // borderColor: colors.black,
//     borderWidth: 3,
//   },
//   inputStyles: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: '#fff',
//   },
//   inputStylesDiscription: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: '#fff',
//     height: 100,
//     width: '85%',
//     marginLeft: 30,
//     backgroundColor: '#494949',
//     borderRadius: 10,
//     marginVertical: 10,
//     marginHorizontal: '8%',
//   },
// });

// EditProfileScreen.js

import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import imgPlaceHolder from '../../assets/profile2.png';
import AppText from '../../components/AppText';
import ClearableTextInput from '../../components/ClearableTextInput';
import ProfileButton from '../../components/ProfileButton';
import BaseUrl from '../../config/BaseUrl';
import colors from '../../config/colors';
import {UserProfile, selectUserProfile, setUser} from '../../store/userSlice';
import {showToastWithGravityAndOffset} from '../../utilities/ToastMessage';
import BottomLine from '../../components/BottomLine';

const EditProfileScreen = ({navigation, route}) => {
  const userData = useSelector(selectUserProfile);
  let {UserType, UserID} = useSelector(state => state.user.data);
  let {
    EmailAddress,
    FirstName,
    LastName,
    Remarks,
    StreetName,
    StreetNo,
    Website,
    Contact1,
    Contact2,
    OfficeNo,
    LicenseNo,
    // Password,
    // Username, // Corrected property name
    ZipCode,
  } = userData[0];

  const [profile, setProfile] = useState(null);
  const [firstName, setFirstName] = useState(FirstName);
  const [lastName, setLastName] = useState(LastName);
  const [email, setEmail] = useState(EmailAddress);
  const [website, setWebsite] = useState(Website);
  const [streetNo, setStreetNo] = useState(StreetNo);
  const [streetName, setStreetName] = useState(StreetName);
  const [licenceNo, setLicenceNo] = useState(LicenseNo);
  const [officeNo, setOfficeNo] = useState(OfficeNo);
  const [contactNo, setContactNo] = useState(Contact1);
  const [personalNo, setPersonalNo] = useState(Contact2);
  const [zipCode, setZipCode] = useState(ZipCode);
  const [address, setAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [snapchat, setSnapchat] = useState('');
  const [pinterest, setPinterest] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [information, setInformation] = useState(Remarks);
  const [selectedField, setSelectedField] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [zipCodeSuggestions, setZipCodeSuggestions] = useState([]);

  const key = 'AIzaSyA7ks8X2YnLcxTuEC3qydL2adzA0NYbl6c';

  const {latitude, longitude} = route?.params?.location
    ? route?.params?.location
    : 0;

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`,
      );

      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const addressComponents = response.data.results[0].address_components;
        let streetNo, streetName, city;

        const formattedAddress = response.data.results[1].formatted_address;
        setAddress(formattedAddress);

        // Extract street number, street name, and city from address components
        addressComponents.forEach(component => {
          if (component.types.includes('street_number')) {
            streetNo = component.long_name;
          } else if (component.types.includes('route')) {
            streetName = component.long_name;
          } else if (component.types.includes('locality')) {
            city = component.long_name;
          }
        });
      } else {
        console.error('Unable to fetch address details');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  if (longitude !== undefined && latitude !== undefined) {
    getAddressFromCoordinates(latitude, longitude);
  }

  const chooseLocationOnMap = () => {
    navigation.navigate('MapScreen');
  };

  const imagePick = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      setProfile(image.path);
    });
  };

  useEffect(() => {
    if (userData && userData[0].lstSocialMediaInfo) {
      userData[0].lstSocialMediaInfo.forEach(item => {
        switch (item.SocialMediaTitle) {
          case 'Facebook':
            setFacebook(item.ProfileLink || ''); // Use ProfileLink as the default value
            break;
          case 'Instagram':
            setInstagram(item.ProfileLink || '');
            break;
          case 'Snapchat':
            setSnapchat(item.ProfileLink || '');
            break;
          case 'Pinterest':
            setPinterest(item.ProfileLink || '');
            break;
          case 'Linkedin':
            setLinkedIn(item.ProfileLink || '');
            break;
          default:
            break;
        }
      });
    }
  }, [userData]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Make the API call with the current zipCode value
  //       const response = await axios.get(
  //         `https://privont.com/ZipCode/GetZipCodeInfo?ZipCodeID=${zipCode}`,
  //       );

  //       // Process the API response as needed
  //       console.log(response.data);
  //       // Update your component state or take any other necessary actions based on the response
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   // Only make the API call if zipCode is not an empty string
  //   if (zipCode.trim() !== '') {
  //     fetchData();
  //   }
  // }, [zipCode]);
  useEffect(() => {
    const fetchZipCodeSuggestions = async () => {
      try {
        if (zipCode && zipCode.trim() !== '') {
          // Add a null check here
          const response = await axios.get(
            `https://privont.com/ZipCode/GetZipCodeInfo?ZipCodeID=${zipCode}`,
          );
          setZipCodeSuggestions(response.data.Data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (zipCode && zipCode.trim() !== '') {
      // Add a null check here as well
      fetchZipCodeSuggestions();
    }
  }, [zipCode]);
  // if (longitude !== undefined && latitude !== undefined) {
  //   showToastWithGravityAndOffset('Location Added Successfully');
  //   return;
  // }

  const onPressHandler = async () => {
    try {
      setLoading(true);
      if (UserType === 5) {
        if (latitude === undefined && latitude === undefined) {
          showToastWithGravityAndOffset('Please Select Location first !!');
          return;
        }
      }

      const response = await axios.post(
        `${BaseUrl}UserProfile/Update_UserProfileInformation`,
        {
          RealEstateAgentId: UserID,
          LeadID: UserID,
          LenderId: UserID,
          VendorID: UserID,
          UserType: UserType,
          Longitude: latitude,
          Latitude: longitude,
          CompanyName: companyName,
          FirstName: firstName,
          LastName: lastName,
          LicenseNo: licenceNo,
          OrganizationID: selectedField,
          ZipCode: zipCode,
          OfficeNo: officeNo,
          StreetName: streetName,
          StreetNo: streetNo,
          Website: website,
          EmailAddress: email,
          Contact1: contactNo,
          Contact2: personalNo,
          Remarks: information,
          lstSocialMediaInfo: [
            {
              SocialMediaID: 1,
              SocialMediaTitle: 'Facebook',
              UserID: UserID,
              UserTypeID: UserType,
              ProfileName: '',
              ProfileLink: facebook,
            },
            {
              SocialMediaID: 2,
              SocialMediaTitle: 'Instagram',
              UserID: UserID,
              UserTypeID: UserType,
              ProfileName: '',
              ProfileLink: instagram,
            },
            {
              SocialMediaID: 3,
              SocialMediaTitle: 'Pinterest',
              UserID: UserID,
              UserTypeID: UserType,
              ProfileName: '',
              ProfileLink: pinterest,
            },
            {
              SocialMediaID: 4,
              SocialMediaTitle: 'Snapchat',
              UserID: UserID,
              UserTypeID: UserType,
              ProfileName: '',
              ProfileLink: snapchat,
            },
            {
              SocialMediaID: 5,
              SocialMediaTitle: 'Linkedin',
              UserID: UserID,
              UserTypeID: UserType,
              ProfileName: '',
              ProfileLink: linkedIn,
            },
          ],
        },
      );
      console.log('status', response.data.Status);
      if (response.data.Status === 404) {
        showToastWithGravityAndOffset(`Please Provide Valid ZipCode !!`);
        return;
      }
      if (response.data.Status === 200) {
        console.log('APi response', response.data);
        setLoading(false);
        showToastWithGravityAndOffset(`Profile Updated Successfully !!`);
        dispatch(UserProfile({UserType, UserID}));
        return;
      }
      // let {
      //   Contact1,
      //   EmailAddress,
      //   FirstName,
      //   Inactive,
      //   LastName,
      //   Remarks,
      //   StreetName,
      //   StreetNo,
      //   UserID,
      //   RealEstateAgentId,
      //   LenderId,
      //   UserName,
      //   UserType,
      //   Website,
      // } = response.data.Data[0];

      // const userData = {
      //   Contact1,
      //   EmailAddress,
      //   FirstName,
      //   Inactive,
      //   LastName,
      //   Remarks,
      //   StreetName,
      //   StreetNo,
      //   UserID: RealEstateAgentId ? RealEstateAgentId : LenderId,
      //   UserName,
      //   UserType,
      //   Website,
      // };
      // dispatch(setUser(userData));
      // }
    } catch (error) {
      showToastWithGravityAndOffset(`An error occurred. Please try again.`);
    } finally {
      setLoading(false);
    }
  };
  // UserType = 5;
  // console.log(latitude, longitude);
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.profileContainer}>
        <Image
          style={styles.image}
          source={profile ? {uri: profile} : imgPlaceHolder}
        />
        <TouchableOpacity
          onPress={imagePick}
          style={{alignItems: 'flex-end', bottom: 50, left: 30}}>
          <Entypo name="camera" size={30} color={colors.white} />
        </TouchableOpacity>
      </View> */}
      {(UserType === 2 ||
        UserType === 3 ||
        UserType === 4 ||
        UserType === 5) && (
        <>
          <AppText style={{marginLeft: 35, marginTop: 20}}>
            First Name<Text style={{color: 'tomato', fontSize: 20}}>*</Text>
          </AppText>
          <ClearableTextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            value={firstName}
            onTextChange={newText => setFirstName(newText)}
            clearText={() => setFirstName('')}
          />
          <AppText style={{marginLeft: 35}}>
            Last Name<Text style={{color: 'tomato', fontSize: 20}}>*</Text>
          </AppText>
          <ClearableTextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            value={lastName}
            onTextChange={newText => setLastName(newText)}
            clearText={() => setLastName('')}
          />
          <AppText style={{marginLeft: 35}}>Email</AppText>
          <ClearableTextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            keyboardType="email-address"
            value={email}
            onTextChange={newText => setEmail(newText)}
            clearText={() => setEmail('')}
          />
          <AppText style={{marginLeft: 35}}>
            Contact No<Text style={{color: 'tomato', fontSize: 20}}>*</Text>
          </AppText>
          <ClearableTextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            keyboardType="phone-pad"
            value={contactNo}
            onTextChange={newText => setContactNo(newText)}
            clearText={() => setContactNo('')}
          />
          <AppText style={{marginLeft: 35}}>Personal No</AppText>
          <ClearableTextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            keyboardType="phone-pad"
            value={personalNo}
            onTextChange={newText => setPersonalNo(newText)}
            clearText={() => setPersonalNo('')}
          />
          <View>
            <AppText style={{marginLeft: 35}}>
              ZipCode<Text style={{color: 'tomato', fontSize: 20}}>*</Text>
            </AppText>
            <ClearableTextInput
              style={styles.inputStyles}
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={zipCode}
              onTextChange={newText => setZipCode(newText)}
              clearText={() => setZipCode('')}
            />
            {zipCodeSuggestions.length > 0 && (
              <Picker
                selectedValue={zipCode}
                onValueChange={(itemValue, itemIndex) => setZipCode(itemValue)}
                style={styles.pickerStyles}>
                {zipCodeSuggestions.map(item => (
                  <Picker.Item
                    key={item.ZipCodeID.toString()}
                    label={item.ZipCode}
                    value={item.ZipCode}
                  />
                ))}
              </Picker>
            )}
          </View>
          <AppText style={{marginLeft: 35}}>Information</AppText>
          <ClearableTextInput
            style={styles.inputStylesDiscription}
            placeholderTextColor="gray"
            textAlignVertical="top"
            value={information}
            multiline={true}
            onTextChange={newText => setInformation(newText)}
            clearText={() => setInformation('')}
          />
        </>
      )}

      {(UserType === 2 || UserType === 3 || UserType === 5) && (
        <>
          <AppText style={{marginLeft: 35}}>License No</AppText>
          <ClearableTextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            keyboardType="phone-pad"
            value={licenceNo}
            onTextChange={newText => setLicenceNo(newText)}
            clearText={() => setLicenceNo('')}
          />
          <AppText style={{marginLeft: 35}}>Office No</AppText>
          <ClearableTextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            keyboardType="phone-pad"
            value={officeNo}
            onTextChange={newText => setOfficeNo(newText)}
            clearText={() => setOfficeNo('')}
          />
          <AppText style={{marginLeft: 35}}>Website</AppText>
          <ClearableTextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            value={website}
            onTextChange={newText => setWebsite(newText)}
            clearText={() => setWebsite('')}
          />
          <AppText style={{marginLeft: 35}}>
            Organization<Text style={{color: 'tomato', fontSize: 20}}>*</Text>
          </AppText>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedField}
              dropdownIconColor="white"
              onValueChange={(itemValue, itemIndex) =>
                setSelectedField(itemValue)
              }
              style={styles.picker}>
              <Picker.Item label="Restaurant" value={1} />
              <Picker.Item label="Home" value={2} />
              <Picker.Item label="Pet Service" value={3} />
            </Picker>
          </View>

          <AppText style={{marginLeft: 35}}>Street No</AppText>
          <ClearableTextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            value={streetNo}
            onTextChange={newText => setStreetNo(newText)}
            clearText={() => setStreetNo('')}
          />
          <AppText style={{marginLeft: 35}}>Street Name</AppText>
          <ClearableTextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            value={streetName}
            onTextChange={newText => setStreetName(newText)}
            clearText={() => setStreetName('')}
          />
          {/* <AppText style={{marginLeft: 35}}>
            UserName<Text style={{color: 'tomato', fontSize: 20}}>*</Text>
          </AppText>
          <ClearableTextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            value={userName}
            onTextChange={newText => setUserName(newText)}
            clearText={() => setUserName('')}
          />
          <AppText style={{marginLeft: 35}}>
            Password<Text style={{color: 'tomato', fontSize: 20}}>*</Text>
          </AppText>
          <ClearableTextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            secureTextEntry
            value={password}
            onTextChange={newText => setPassword(newText)}
            clearText={() => setPassword('')}
          /> */}
        </>
      )}
      {UserType === 5 && (
        <>
          <AppText style={{marginLeft: 35}}>
            Company Name<Text style={{color: 'tomato', fontSize: 20}}>*</Text>
          </AppText>
          <ClearableTextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            value={companyName}
            onTextChange={newText => setCompanyName(newText)}
            clearText={() => setCompanyName('')}
          />
        </>
      )}
      {UserType === 5 && (
        <>
          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={chooseLocationOnMap}>
            <Text style={styles.currentLocationButtonText}>
              Choose Location On Map
            </Text>
          </TouchableOpacity>

          {longitude !== undefined && latitude !== undefined && (
            <>
              <Text style={{marginHorizontal: 35, color: 'tomato'}}>
                {address}
              </Text>
              <BottomLine
                color="white"
                marginVertical={20}
                width="85%"
                marginHorizontal={35}
              />
            </>
          )}
        </>
      )}
      <AppText
        style={{
          marginVertical: 20,
          // alignSelf: 'center',
          marginLeft: 35,
          color: colors.pink,
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        SOCIAL MEDIA
      </AppText>
      <AppText style={{marginLeft: 35}}>Facebook</AppText>
      <ClearableTextInput
        style={styles.inputStyles}
        placeholderTextColor="gray"
        value={facebook}
        onTextChange={newText => setFacebook(newText)}
        clearText={() => setFacebook('')}
      />
      <AppText style={{marginLeft: 35}}>Snapchat</AppText>
      <ClearableTextInput
        style={styles.inputStyles}
        placeholderTextColor="gray"
        value={snapchat}
        onTextChange={newText => setSnapchat(newText)}
        clearText={() => setSnapchat('')}
      />
      <AppText style={{marginLeft: 35}}>Pinterest</AppText>
      <ClearableTextInput
        style={styles.inputStyles}
        placeholderTextColor="gray"
        value={pinterest}
        onTextChange={newText => setPinterest(newText)}
        clearText={() => setPinterest('')}
      />
      <AppText style={{marginLeft: 35}}>Instagram</AppText>
      <ClearableTextInput
        style={styles.inputStyles}
        placeholderTextColor="gray"
        value={instagram}
        onTextChange={newText => setInstagram(newText)}
        clearText={() => setInstagram('')}
      />
      <AppText style={{marginLeft: 35}}>LinkedIn</AppText>
      <ClearableTextInput
        style={styles.inputStyles}
        placeholderTextColor="gray"
        value={linkedIn}
        onTextChange={newText => setLinkedIn(newText)}
        clearText={() => setLinkedIn('')}
      />

      {/* <View>
        <TextInput
          style={styles.inputStylesDiscription}
          placeholder="Input Your Information"
          placeholderTextColor="gray"
          textAlignVertical="top"
          multiline={true}
          value={information}
          onChangeText={newText => setInformation(newText)}
        />
        {information.length > 0 && (
          <TouchableOpacity onPress={clearText} style={styles.closeButton}>
            <Text style={{color: '#fff', fontSize: 24}}>X</Text>
          </TouchableOpacity>
        )}
      </View> */}
      {loading && <ActivityIndicator size="large" color={'#808080'} />}

      <ProfileButton
        title="Update"
        color="tomato"
        width="90%"
        marginHorizontal={22}
        marginVertical={10}
        borderRadius={10}
        onPress={onPressHandler}
      />
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 10,
    width: 120,
    height: 120,
    borderRadius: 60,
    // borderColor: colors.black,
    borderWidth: 3,
  },
  inputStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    marginHorizontal: '2%',
  },
  inputStylesDiscription: {
    color: '#fff',
    height: 100,
    borderRadius: 10,
    marginHorizontal: '2%',
    marginRight: '7%',
  },
  closeButton: {
    position: 'absolute',
    top: 45,
    right: 50,
  },

  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 35,
    width: '85%',
    color: '#fff',
    borderRadius: 10,
  },
  picker: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#494949',
    marginBottom: 10,
  },
  currentLocationButton: {
    width: '50%',
    marginLeft: 35,
    padding: 10,
    backgroundColor: 'tomato',
    borderRadius: 5,
    elevation: 5,
    marginVertical: 20,
    alignItems: 'center',
  },
  currentLocationButtonText: {
    color: 'white',
    // fontWeight: 'bold',
  },
  suggestionItem: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: '20%',
    marginHorizontal: 20,
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  pickerStyles: {
    height: 50,
    width: '85%',
    marginLeft: 35,
    marginBottom: 20,
    // paddingHorizontal: 12,
    color: '#fff',
    backgroundColor: '#494949',
    borderRadius: 8,
  },
});
