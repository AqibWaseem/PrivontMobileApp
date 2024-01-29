import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import BottomLine from '../../../components/BottomLine';
import colors from '../../../config/colors';
import RatingScreen from '../../RatingScreen';
import SocialMediaSection from './SocialMediaSection';
import ProfileListItem from './ProfileListItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetFavVendors,
  GetFeaturedVendors,
  UsersReview,
  selectUserProfile,
  setVendorID,
} from '../../../store/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLoader from '../../../utilities/AnimatedLoader';
import axios from 'axios';
import {showToastWithGravityAndOffset} from '../../../utilities/ToastMessage';
import BaseUrl from '../../../config/BaseUrl';

const DirectoryProfile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userDetails = route.params.item;
  const {Favourite} = userDetails;
  const VendorID = userDetails.VendorID;
  const [loading, setLoading] = useState(false);

  const [isStarFilled, setStarFilled] = useState(Favourite === 1);
  const handleStarClick = () => {
    setStarFilled(!isStarFilled);
    const fetchData = async () => {
      const UserType = await AsyncStorage.getItem('UserType');
      const UserID = await AsyncStorage.getItem('UserID');
      try {
        setLoading(true);
        const response = await axios.get(
          `${BaseUrl}VendorInfo/PostFavouriteVendorInfo?VendorID=${VendorID}&UserID=${UserID}&UserType=${UserType}&IsFavourite=${!isStarFilled}`,
        );
        // console.log('API Response:', response.data);
      } catch (error) {
        console.error('API Error:', error);
        showToastWithGravityAndOffset('An error occurred. Please try again.');
      } finally {
        if (isStarFilled) {
          showToastWithGravityAndOffset('Removed From Favorite !!');
        } else {
          showToastWithGravityAndOffset('Added To Favorite !!');
        }
        dispatch(GetFavVendors({UserType, UserID}));
        dispatch(GetFeaturedVendors({UserType, UserID}));
        setLoading(false);
      }
    };

    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const UserType = JSON.parse(await AsyncStorage.getItem('UserType'));
        const UserID = JSON.parse(await AsyncStorage.getItem('UserID'));
        dispatch(UsersReview({UserType, UserID, VendorID}));
        dispatch(setVendorID(VendorID));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const city = `${userDetails.StreetName} ${userDetails.StreetNo} ${userDetails.VendorID}`;
  const userProfile = useSelector(selectUserProfile);
  const firstName = userProfile[0]?.FirstName;
  const lastName = userProfile[0]?.LastName;
  const ContactNo = userProfile[0]?.Contact1;
  const StreetNo = userProfile[0]?.StreetNo;
  const StreetName = userProfile[0]?.StreetName;
  const Website = userProfile[0]?.Website;
  const EmailAddress = userProfile[0]?.EmailAddress;
  const description = userProfile[0]?.Remarks;

  const [isInfo, setIsInfo] = useState(true);
  const [isQrCode, setIsQrCode] = useState(false);
  const [promo, setPromo] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef();
  const [images] = useState([
    require('../../../assets/beach.jpg'),
    require('../../../assets/modern-furniture-designs.jpg'),
    require('../../../assets/background3.jpg'),
  ]);
  const code = 'https://www.github.com/chelseafarley';
  item = {
    rating: 4.5,
    users: 20,
    open: 'Open',
  };

  // const profile = {
  //   contact: `${firstName} ${lastName}`,
  //   phone: ContactNo,
  //   direction: `${StreetNo}, ${StreetName}`,
  //   email: EmailAddress,
  //   website: Website,
  // };

  const renderInputField = (label, value, isBlue) => (
    <View style={styles.inputContainer}>
      <AppText style={styles.label}>{label}</AppText>
      <AppText style={[styles.input, isBlue && styles.blueText]}>
        {value}
      </AppText>
    </View>
  );

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

  const handleBackPress = () => {
    navigation.goBack();
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
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <View style={{marginHorizontal: 10, marginVertical: 5}}>
            <AppText style={{fontSize: 20, marginHorizontal: 5}}>
              {userDetails.CompanyName}
            </AppText>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.ratingText}>
                {userDetails.AverageRating}
              </AppText>
              <RatingScreen value={userDetails.AverageRating} color="#e5634d" />
              <Text style={styles.ratingUsers}>
                ({userDetails.TotalFeedBack})
              </Text>
              <AppText style={styles.open}>{item.open}</AppText>
            </View>
          </View>
          {loading && <ActivityIndicator size="large" color={'#808080'} />}
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginRight: 30,
              marginBottom: 10,
            }}>
            <TouchableOpacity onPress={handleStarClick}>
              <Ionicons
                name={isStarFilled ? 'star-sharp' : 'star-outline'}
                size={45}
                color={isStarFilled ? 'gold' : 'gold'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <AppText
          style={{
            fontSize: 12,
            width: '95%',
            marginLeft: 15,
            marginVertical: 5,
          }}>
          {description}
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <AppButton
            title="Info"
            onPress={() => {
              setIsInfo(true),
                setIsQrCode(false),
                setIsReview(false),
                setPromo(false);
            }}
            iconFont="exclamation"
            textColor="#fff"
          />
          <AppButton
            title="QR Code"
            onPress={() => {
              setIsInfo(false),
                setIsQrCode(true),
                setIsReview(false),
                setPromo(false);
            }}
            iconName="qrcode"
            textColor="#fff"
          />
          <AppButton
            title="Promo"
            onPress={() => {
              setIsInfo(false),
                setIsQrCode(false),
                setIsReview(false),
                setPromo(true);
            }}
            iconFont="bullhorn"
            textColor="white"
          />
          <AppButton
            title="Reviews"
            onPress={() => navigation.navigate('Reviews')}
            iconFont="message"
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
            {renderInputField(
              'Contact :',
              userDetails.Contact1 || userDetails.Contact2,
            )}
            {renderInputField('Phone :', userDetails.PhoneNo, true)}
            {renderInputField('Direction:', city, true)}
            {renderInputField('Email:', userDetails.EmailAddress)}
            {renderInputField('Website:', userDetails.Website)}
            <View style={{flexDirection: 'row'}}>
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
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="linkedin"
                size={20}
                color="#fff"
                style={styles.icon}
              />
              <AppText style={styles.text}>Linkedin</AppText>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 280}}>
              <FontAwesome
                name="clock-o"
                size={20}
                color="#fff"
                style={styles.icon}
              />
              <AppText style={styles.text}>
                Opens 8:00Am - 5:00Pm{'   '}
                <AppText
                  style={{color: 'green', fontSize: 16, fontWeight: 'bold'}}>
                  {' '}
                  * Open Now
                </AppText>
              </AppText>
            </View>
          </ScrollView>
        )}
        {isQrCode && (
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            style={{flex: 1}}>
            <View style={styles.qrCodeContainer}>
              <QRCode size={windowHeight / 4} value={code} />
            </View>
            <Text style={{marginBottom: 300}}></Text>
          </ScrollView>
        )}
        {promo && (
          <ScrollView style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: '#000', // Background color of the container
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 70,
                  width: 140,
                  height: 140,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome6 name="bell" size={100} color="#000" />
              </View>
              <AppText style={{marginVertical: 10}}>
                No Promos At This Time
              </AppText>
            </View>
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
  ratingUsers: {
    marginLeft: 5,
    marginTop: 4,
    color: '#fff',
    fontSize: 14,
  },
  open: {
    width: 50,
    fontSize: 14,
    height: 23,
    borderColor: 'green',
    borderWidth: 1,
    marginLeft: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 2,
    paddingLeft: 5,
    color: 'green',
    marginTop: 2,
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
  blueText: {
    color: 'blue',
  },
  qrCodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    width: 'auto',
  },
});

export default DirectoryProfile;
