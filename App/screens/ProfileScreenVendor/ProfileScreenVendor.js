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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import BottomLine from '../../components/BottomLine';
import colors from '../../config/colors';
import {
  UsersReview,
  selectUserProfile,
  selectUsersReview,
} from '../../store/userSlice';
import RatingScreen from '../RatingScreen';
import SocialMediaSection from './SocialMediaSection';

const ProfileScreenVendor = ({navigation}) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  const usersReview = useSelector(selectUsersReview);
  const [averageRating, setAverageRating] = useState(0);

  // Check if usersReview is truthy before destructure
  const {Data, RatingDetails} = usersReview || {};
  const socialMediaInfo = userProfile[0]?.lstSocialMediaInfo;
  const firstName = userProfile[0]?.FirstName;
  const lastName = userProfile[0]?.LastName;
  const ContactNo = userProfile[0]?.Contact1;
  const StreetNo = userProfile[0]?.StreetNo;
  const StreetName = userProfile[0]?.StreetName;
  const Website = userProfile[0]?.Website;
  const EmailAddress = userProfile[0]?.EmailAddress;
  const description = userProfile[0]?.Remarks;
  const VendorID = userProfile[0]?.VendorID;
  // console.log(userProfile);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const UserType = JSON.parse(await AsyncStorage.getItem('UserType'));
        const UserID = JSON.parse(await AsyncStorage.getItem('UserID'));
        dispatch(UsersReview({UserType, UserID, VendorID}));
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      // Calculate average rating from RatingDetails
      const totalRating = Data?.reduce((acc, rating) => {
        return acc + rating.Rating;
      }, 0);

      const average = totalRating / Data?.length || 0;
      setAverageRating(average.toFixed(1.0));
    };
    fetchData();
  }, [dispatch]);

  const [isInfo, setIsInfo] = useState(true);
  const [isQrCode, setIsQrCode] = useState(false);
  const [promo, setPromo] = useState(false);
  const [isReview, setIsReview] = useState(false);
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
    users: 20,
    open: 'Open',
  };

  const profile = {
    contact: `${firstName} ${lastName}`,
    phone: ContactNo,
    direction: `${StreetNo}, ${StreetName}`,
    email: EmailAddress,
    website: Website,
  };

  const renderInputField = (label, value, isBlue) => (
    <View style={styles.inputContainer}>
      <AppText style={styles.label}>{label}</AppText>
      <AppText style={[styles.input, isBlue && styles.blueText]}>
        {value}
      </AppText>
    </View>
  );

  const socialMediaData = {
    icons: ['facebook', 'instagram', 'linkedin'],
    usernames: ['Swansonmarketing', 'SwansonSellsHomes', 'SwansonElizabeth'],
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
              {firstName} {lastName}
            </AppText>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.ratingText}>{averageRating}</AppText>
              <RatingScreen value={averageRating} color="#e5634d" />
              <Text style={styles.ratingUsers}>({Data?.length})</Text>
              <AppText style={styles.open}>{item.open}</AppText>
            </View>
          </View>
          {/* <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginRight: 30,
              marginBottom: 10,
            }}>
            <Ionicons name="star-sharp" size={40} color="gold" />
          </View> */}
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
            {renderInputField('Contact :', profile.contact)}
            {renderInputField('Phone :', profile.phone, true)}
            {renderInputField('Direction:', profile.direction, true)}
            {renderInputField('Email:', profile.email)}
            {renderInputField('Website:', profile.website)}
            <SocialMediaSection socialMediaInfo={socialMediaInfo} />
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.text}>
                Opens 8:00Am - 5:00Pm{'   '}
                <AppText
                  style={{color: 'green', fontSize: 16, fontWeight: 'bold'}}>
                  {' '}
                  * Open Now
                </AppText>
              </AppText>
            </View>
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
            <View style={styles.qrCodeContainer}>
              <QRCode size={windowHeight / 3} value={code} />
            </View>
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

export default ProfileScreenVendor;
