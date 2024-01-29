import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import BottomLine from '../../components/BottomLine';
import colors from '../../config/colors';
import QRCode from 'react-native-qrcode-svg';
import {showToastWithGravityAndOffset} from '../../utilities/ToastMessage';
import ImageCropPicker from 'react-native-image-crop-picker';
import ShareIt from 'react-native-share';
import {useSelector} from 'react-redux';
import axios from 'axios';
import BaseUrl from '../../config/BaseUrl';
import RatingScreen from '../RatingScreen';

const MemberProfiles = ({navigation, route}) => {
  let {UserType, UserID} = useSelector(state => state.user.data);
  const [sponserMembers, setSponserMembers] = useState();
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(false);

  const realItems = route.params.item;
  // console.log('Member Profile', realItems);
  const windowHeight = Dimensions.get('window').height;
  const code = realItems.LeadID.toString();
  let LeadID = realItems.LeadID;
  // LeadID = 16220;
  // console.log(LeadID);

  const GetMemberProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}LeadInfo/GetMemberProfile?LeadID=${LeadID}&UserID=${UserID}&UserType=${UserType}`,
      );
      setSponserMembers(response.data.Data);
      console.log('Hello', response.data.Data);
    } catch (error) {
      console.error('Error fetching All Members data:', error);
    } finally {
      setLoading(false); // Reset fetching flag
    }
  };

  console.log(sponserMembers);
  useEffect(() => {
    GetMemberProfile();
  }, []);

  const handleBackPress = () => {
    navigation.goBack('Home');
  };

  items = [
    {label: '250K-300K', value: '1'},
    {label: '200K-250K', value: '2'},
    {label: '100K-200K', value: '3'},
  ];

  const profile = {
    memberID: realItems.UniqueIdentifier,
    phone: realItems.Contact1 || realItems.PhoneNo,
    email: realItems.EmailAddress,
    Source: 'Referral',
    priceRange: realItems.PricePoint,
    // realItems.PriceRangeID == 1
    //   ? '250K-300K'
    //   : realItems.PriceRangeID == 2
    //   ? '250K-300K'
    //   : realItems.PriceRangeID == 3
    //   ? '300K-350K'
    //   : realItems.PriceRangeID == 4
    //   ? '350K-400K'
    //   : realItems.PriceRangeID == 5
    //   ? '400K-450K'
    //   : '450K-500K',
    City: realItems.State,
    firstTimeBuyer: realItems.FirstTimeBuyer ? 'Yes' : 'No',
    military: realItems.IsMilitary ? 'Yes' : 'No',
    type:
      realItems.TypeID == 1
        ? 'First Home'
        : realItems.TypeID == 2
        ? 'Second Home'
        : 'Third Home',
    bestTimeToCall: realItems.BestTimeToCall == 1 ? 'Immediately' : 'Later',
  };

  items2 = [
    {label: 'First Home', value: '1'},
    {label: 'Second Home', value: '2'},
    {label: 'Third Home', value: '3'},
  ];

  items3 = [
    {label: 'Immediately', value: '1'},
    {label: 'Later', value: '2'},
  ];
  const data = [
    {
      id: '1',
      newMember: 'A New Member Approved Near You',
      title: 'Mellisa Gardner Green',
      discription: 'Faiway Landing',
      rating: 4.5,
      users: 30,
      isJoin: true,
      isArrow: true,
    },
    {
      id: '2',
      title: 'Danielle HouseCleaning',
      discription: 'Danielle Smith-Vendor',
      isApproved: true,
      isPending: false,
    },
    {
      id: '3',
      title: 'Claudia Hill',
      discription: 'Evora Capital',
      rating: 5.0,
      users: 30,
      isApproved: true,
      isPending: false,
      isArrow: true,
    },
    {
      id: '4',
      title: 'ACH Deposited ',
      discription: 'Transaction ID',
      ids: 'M10232023110558798',
      isApproved: false,
      isPending: false,
      isCompleted: true,
    },
    {
      id: '5',
      title: 'Rick Carpentar ',
      discription: 'Member',
      date: '10/21/2023 - temple,TX',
      isApproved: false,
      isPending: true,
    },
  ];
  const handleKeyPress = event => {
    if (event.nativeEvent.key === 'Enter') {
      Keyboard.dismiss();
    }
  };

  const renderInputField = (label, value) => (
    <View style={styles.inputContainer}>
      <AppText style={styles.label}>{label}</AppText>
      <AppText style={styles.input}>{value}</AppText>
    </View>
  );
  const onShare = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      try {
        await ShareIt.open({
          url: image.path,
        });
      } catch (error) {
        showToastWithGravityAndOffset(`Oops! Nothing Shared Yet !!`);
      }
    } catch (error) {
      showToastWithGravityAndOffset(`Select An Image And Try Again !!`);
    }
  };

  const renderItem = ({item}) => (
    <>
      <View style={styles.featuredContainer}>
        {!item?.isCompleted && (
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/modern-furniture-designs.jpg')}
              style={styles.image}
            />
          </View>
        )}
        <View style={styles.featuredDiscription}>
          {/* <AppText style={styles.smallText}></AppText> */}
          <AppText style={styles.title}>
            {item?.FirstName}
            {item?.LastName}
          </AppText>
          <AppText style={styles.description}>{item?.Remarks}</AppText>

          <View style={styles.rating}>
            <AppText style={styles.ratingText}>{5.0}</AppText>
            <RatingScreen value={5.0} color="#e5634d" />
            <AppText style={styles.ratingUsers}>({19})</AppText>

            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => console.log('hello')}>
              <MaterialIcons name="arrow-forward-ios" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {/* <AppText style={styles.pendingText}>Completed</AppText> */}
      </View>
      <View style={styles.separator} />
    </>
  );
  const onCopy = async () => {
    try {
      const result = await Share.share({
        message: 'Message Copy here',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden={true} />

      <View>
        <ImageBackground
          source={require('../../assets/modern-furniture-designs.jpg')}
          style={{
            width: '100%',
            height: 220,
          }}
        />
        <Image
          source={require('../../assets/profile2.png')}
          style={styles.imagesContainer}
        />
        <TouchableOpacity
          onPress={handleBackPress}
          style={{position: 'absolute', top: 45, left: 12}}>
          <MaterialIcons name="arrow-back-ios-new" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <AppText
        style={{
          textAlign: 'center',
          color: '#fff',
          fontSize: 20,
          margin: 5,
          marginHorizontal: '22%',
        }}>
        {realItems.FirstName} {realItems.LastName}
      </AppText>
      {realItems.isClaimLead === 1 && (
        <AppText
          style={{
            textAlign: 'center',
            borderColor: 'green',
            textAlign: 'center',
            borderWidth: 1,
            color: 'green',
            fontSize: 16,
            marginHorizontal: '40%',
          }}>
          Approved
        </AppText>
      )}
      {(realItems.isClaimLead === null || realItems.isClaimLead === 0) && (
        <AppText
          style={{
            color: colors.danger,
            width: 80,
            fontSize: 14,
            paddingLeft: 6,
            fontWeight: 'bold',
            marginHorizontal: '40%',
          }}>
          Pending
        </AppText>
      )}

      <View style={styles.formBody}>
        {renderInputField('Member ID:', profile.memberID)}
        {renderInputField('Phone :', profile.phone)}
        {renderInputField('Email', profile.email)}
        {renderInputField('Source', profile.Source)}
        {renderInputField('Price Range', profile.priceRange)}
        {renderInputField('City / State', profile.City)}
        {renderInputField('First Time Buyer', profile.firstTimeBuyer)}
        {renderInputField('Military', profile.military)}
        {renderInputField('Type', profile.type)}
        {renderInputField('Best Time To Call', profile.bestTimeToCall)}
      </View>
      <AppText
        style={{
          color: '#dd604c',
          fontSize: 20,
          marginHorizontal: 18,
          marginTop: 10,
        }}>
        Referral
      </AppText>
      <BottomLine width="100%" height={2} marginTop={10} marginBottom={15} />
      <View style={styles.buttonContainer}>
        <AppButton
          title="Copy"
          onPress={onCopy}
          iconFont="copy"
          textColor="#fff"
        />
        <AppButton
          title="My Card"
          onPress={() => setQrCode(!qrCode)}
          iconName="qrcode"
          textColor="#fff"
        />
        <AppButton
          title="Share"
          onPress={onShare}
          Evil="share-google"
          textColor="#fff"
        />
      </View>
      <BottomLine width="100%" height={2} marginVertical={10} />
      {qrCode && (
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          style={{flex: 1}}>
          <View
            style={{
              //   flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
              backgroundColor: colors.white,
              padding: 20,
              borderRadius: 20,
              width: 'auto',
            }}>
            <QRCode size={windowHeight / 3.1} value={code} />
          </View>
        </ScrollView>
      )}
      {sponserMembers?.length > 0 && (
        <AppText
          style={{
            color: '#dd604c',
            fontSize: 20,
            marginHorizontal: 18,
            marginTop: 10,
            marginBottom: 20,
          }}>
          Sponser Members
        </AppText>
      )}
      {sponserMembers?.map((item, index) => (
        <React.Fragment key={item.LenderId}>
          {renderItem({item})}
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  formBody: {
    marginTop: 20,
  },
  featuredContainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
  },
  imagesContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: '75%',
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
    fontSize: 14,
    fontWeight: 'normal',
    width: 140,
  },
  input: {
    flex: 1,
    fontSize: 16,
    // fontWeight: 'bold',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginVertical: 10,
  },
  featuredDiscription: {
    flex: 1,
    flexDirection: 'column',
    // marginTop: 5,
  },
  smallText: {
    fontSize: 11,
    color: '#e5e5e5',
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
  },
  rating: {
    flexDirection: 'row',
    marginTop: 2,
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
  ratingUsers: {
    marginLeft: 5,
    marginTop: 4,
    color: '#fff',
    fontSize: 14,
  },
  approvedText: {
    borderColor: 'green',
    borderWidth: 1,
    color: 'green',
    fontSize: 14,
    height: 26,
    paddingLeft: 7,
    paddingRight: 7,
  },
  pendingText: {
    color: colors.white,
    fontSize: 14,
  },
  completedText: {
    color: colors.white,
    // width: 80,
    fontSize: 14,
  },
  joinButton: {
    marginTop: 50,
    shadowRadius: 20,
    shadowColor: '#212121',
    borderRadius: 10,
    borderWidth: 1,
    borderBottomColor: '#000',
    borderBottomWidth: 5,
    borderRightColor: '#000',
    borderRightWidth: 5,
    width: 70,
    height: 35,
    backgroundColor: '#212121',
    paddingBottom: 2,
  },
  joinButtonText: {
    color: '#fff',
    alignSelf: 'center',
    paddingTop: 2,
    // paddingBottom: 5,
    fontSize: 16,
  },
  arrowButton: {
    width: 70,
    height: 30,
    marginLeft: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
});
export default MemberProfiles;
