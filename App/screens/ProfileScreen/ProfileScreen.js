// import React, {useState, useRef} from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   Dimensions,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';

// const CustomImageSlider = () => {
//   const [images] = useState([
//     require('../assets/modern-furniture-designs.jpg'),
//     require('../assets/background2.jpg'),
//     require('../assets/background3.jpg'),
//   ]);

//   const [activeIndex, setActiveIndex] = useState(0);
//   const flatListRef = useRef();

//   const renderItem = ({item}) => <Image source={item} style={styles.image} />;

//   const handleDotPress = index => {
//     flatListRef.current.scrollToIndex({index, animated: true});
//   };

//   const renderPagination = () => (
//     <View style={styles.pagination}>
//       {images.map((_, index) => (
//         <TouchableOpacity
//           key={index}
//           style={[styles.dot, index === activeIndex && styles.selectedDot]}
//           onPress={() => handleDotPress(index)}
//         />
//       ))}
//     </View>
//   );

//   const handleScroll = event => {
//     const contentOffset = event.nativeEvent.contentOffset.x;
//     const index = Math.round(contentOffset / Dimensions.get('window').width);
//     setActiveIndex(index);
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         ref={flatListRef}
//         data={images}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.slider}
//         onScroll={handleScroll}
//         scrollEventThrottle={200}
//       />
//       {renderPagination()}
//     </View>
//   );
// };

// const windowHeight = Dimensions.get('window').height;

// const styles = StyleSheet.create({
//   container: {
//     height: windowHeight * 0.35,
//   },
//   slider: {
//     height: '100%',
//   },
//   image: {
//     width: Dimensions.get('window').width,
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   pagination: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 10,
//     alignSelf: 'center',
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginHorizontal: 5,
//     backgroundColor: 'white',
//     marginBottom: 25,
//   },
//   selectedDot: {
//     backgroundColor: 'yellow',
//   },
// });

// export default CustomImageSlider;

import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import BottomLine from '../../components/BottomLine';
import colors from '../../config/colors';
import RatingScreen from '../RatingScreen';
import SocialMediaSection from './SocialMediaSection';
import ProfileListItem from './ProfileListItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetReferredMembersDetails,
  selectGetReferredMembersDetails,
  selectUserProfile,
} from '../../store/userSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const [UserType, setUserType] = useState(0);
  const userProfile = useSelector(selectUserProfile);
  const referedMembersDetails = useSelector(selectGetReferredMembersDetails);
  const dispatch = useDispatch();
  const TypeOfUser = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const UserType = JSON.parse(await AsyncStorage.getItem('UserType'));
        const UserID = JSON.parse(await AsyncStorage.getItem('UserID'));
        setUserType(UserType);
        console.log(UserID, UserType, TypeOfUser);
        dispatch(GetReferredMembersDetails({UserType, UserID, TypeOfUser}));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const socialMediaInfo = userProfile[0]?.lstSocialMediaInfo;
  console.log('Hello', userProfile);
  const firstName = userProfile[0]?.FirstName;
  const lastName = userProfile[0]?.LastName;
  const ContactNo = userProfile[0]?.Contact1;
  const PhoneNo = userProfile[0]?.PhoneNo;
  const StreetNo = userProfile[0]?.StreetNo;
  const StreetName = userProfile[0]?.StreetName;
  const Website = userProfile[0]?.Website;
  const EmailAddress = userProfile[0]?.EmailAddress;
  const description = userProfile[0]?.Remarks;
  const Company = userProfile[0]?.OrganizationTitle;
  const [isInfo, setIsInfo] = useState(true);
  const [isQrCode, setIsQrCode] = useState(false);
  const [isVendors, setIsVendors] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef();
  const [images] = useState([
    require('../../assets/beach.jpg'),
    require('../../assets/modern-furniture-designs.jpg'),
    require('../../assets/background3.jpg'),
  ]);
  const code = 'https://www.github.com/chelseafarley';
  item = {
    rating: 4.5,
  };

  const profile = {
    phone: ContactNo || PhoneNo,
    email: EmailAddress,
    company: Company,
    website: Website,
  };
  const renderInputField = (label, value) => (
    <View style={styles.inputContainer}>
      <AppText style={styles.label}>{label}</AppText>
      <AppText style={styles.input}>{value}</AppText>
    </View>
  );

  const socialMediaData = {
    icons: ['facebook', 'snapchat', 'pinterest', 'instagram', 'linkedin'],
    usernames: [
      'Swansonmarketing',
      '@Swanson235',
      'ESreelaesteideas',
      'SwansonSellsHomes',
      'SwansonElizabeth',
    ],
  };

  const renderItem = ({item}) => <Image source={item} style={styles.image} />;

  const handleDotPress = index => {
    flatListRef.current.scrollToIndex({index, animated: true});
  };

  const renderPagination = () => (
    <View style={styles.pagination}>
      {images.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.dot, index === activeIndex && styles.selectedDot]}
          onPress={() => handleDotPress(index)}
        />
      ))}
    </View>
  );

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / Dimensions.get('window').width);
    setActiveIndex(index);
  };

  const renderListItems = () => {
    return referedMembersDetails?.Data?.map((item, index) => (
      <ProfileListItem
        key={item.VendorID}
        item={item}
        firstName={firstName}
        onPress={() => console.log('first')}
      />
    ));
  };

  const handleBackPress = () => {
    navigation.goBack('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.imagesContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.slider}
          onScroll={handleScroll}
          scrollEventThrottle={200}
        />
        {renderPagination()}
        <TouchableOpacity
          onPress={handleBackPress}
          style={{position: 'absolute', top: 45, left: 12}}>
          <MaterialIcons name="arrow-back-ios-new" size={40} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../assets/profile2.png')}
            style={{
              width: 120,
              height: 120,
              borderColor: '#fff',
              borderWidth: 4,
              borderRadius: 60,
              marginLeft: 20,
              bottom: 30,
            }}
          />
          <View style={{marginHorizontal: 10, marginVertical: 5}}>
            <AppText style={{fontSize: 20}}>
              {firstName} {lastName}
            </AppText>
            <AppText style={{fontSize: 12, width: 210}}>{description}</AppText>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <RatingScreen value={item.rating} color="#e5634d" />
              <AppText style={styles.ratingText}>{item.rating}</AppText>
              <>
                {/* <TouchableOpacity
                  style={{
                    marginLeft: 30,
                    width: 80,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.blue,
                    borderRadius: 5,
                  }}
                  onPress={() => console.log('first')}>
                  <AppText style={{color: colors.white, fontSize: 16}}>
                    REFER
                  </AppText>
                </TouchableOpacity> */}
              </>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '8%',
            marginTop: 10,
          }}>
          <AppButton
            title="Info"
            onPress={() => {
              setIsInfo(true), setIsQrCode(false), setIsVendors(false);
            }}
            iconFont="exclamation"
            textColor="#fff"
          />
          <AppButton
            title="QR Code"
            onPress={() => {
              setIsInfo(false), setIsQrCode(true), setIsVendors(false);
            }}
            iconName="qrcode"
            textColor="#fff"
          />

          <AppButton
            title="Vendors"
            onPress={() => {
              setIsInfo(false), setIsQrCode(false), setIsVendors(true);
            }}
            iconFont="users"
            textColor="#fff"
          />
        </View>

        <BottomLine
          height={1.5}
          color="#fff"
          marginVertical={10}
          width="95%"
          marginHorizontal={10}
        />
        {isInfo && (
          <ScrollView style={{flex: 1}}>
            {renderInputField('Phone :', profile.phone)}
            {renderInputField('Email:', profile.email)}
            {renderInputField('Company:', profile.company)}
            {renderInputField('Website:', profile.website)}
            <AppText
              style={{
                color: '#dd604c',
                fontSize: 18,
                marginHorizontal: '5%',
                marginTop: 10,
              }}>
              Socials
            </AppText>
            {/* icons: ['facebook', 'snapchat', 'pinterest', 'instagram',
            'linkedin'], */}
            {/* <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="facebook"
                size={20}
                color="#fff"
                style={styles.icon}
              />
              <AppText style={styles.text}>Facebook</AppText>
            </View>

            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="snapchat"
                size={20}
                color="#fff"
                style={styles.icon}
              />
              <AppText style={styles.text}>Snapchat</AppText>
            </View>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="pinterest"
                size={20}
                color="#fff"
                style={styles.icon}
              />
              <AppText style={styles.text}>Pinterest</AppText>
            </View>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="instagram"
                size={20}
                color="#fff"
                style={styles.icon}
              />
              <AppText style={styles.text}>Instagram</AppText>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 150}}>
              <FontAwesome
                name="linkedin"
                size={20}
                color="#fff"
                style={styles.icon}
              />
              <AppText style={[styles.text, {marginBottom: 100}]}>
                Linkedin
              </AppText>
            </View> */}

            <SocialMediaSection socialMediaInfo={socialMediaInfo} />
            <Text style={{marginBottom: 150}}></Text>
          </ScrollView>
        )}

        {isQrCode && (
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            style={{flex: 1}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                backgroundColor: colors.white,
                padding: 20,
                borderRadius: 20,
                width: 'auto',
                // marginBottom: 100,
              }}>
              <QRCode size={windowHeight / 3.5} value={code} />
            </View>
            {/* <Text style={{marginBottom: 180}}></Text> */}
          </ScrollView>
        )}
        {isVendors && UserType !== 3 && (
          <ScrollView style={{flex: 1}}>
            {renderListItems()}
            <Text style={{color: '#fff', marginBottom: 240}}></Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  imagesContainer: {
    height: windowHeight * 0.35,
    position: 'relative',
  },
  slider: {
    height: '100%',
  },
  image: {
    width: Dimensions.get('window').width,
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 40,
  },
  selectedDot: {
    backgroundColor: 'yellow',
  },
  cardContainer: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 700,
    // position: 'absolute',
    bottom: 25,
  },
  card: {
    padding: 10,
  },
  ratingText: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#fff',
    width: '12%',
    marginLeft: 5,
    textAlign: 'center',
    height: 20,
    marginTop: 5,
    marginRight: 5,
    fontSize: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 50,
  },
  label: {
    color: colors.grey,
    fontSize: 16,
    fontWeight: 'normal',
    width: 'auto',
  },
  input: {
    fontSize: 16,
    marginLeft: 3,
    // fontWeight: 'bold',
  },
  icon: {
    marginBottom: -3,
    marginVertical: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 6,
    marginLeft: 20,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 9.5,
  },
});

export default ProfileScreen;
