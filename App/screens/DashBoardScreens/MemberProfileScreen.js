import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';
import ShareIt from 'react-native-share';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import BottomLine from '../../components/BottomLine';
import colors from '../../config/colors';
import QRCode from 'react-native-qrcode-svg';
import ImageCropPicker from 'react-native-image-crop-picker';
import {showToastWithGravityAndOffset} from '../../utilities/ToastMessage';
import {useSelector} from 'react-redux';
import {selectUserReferDetails} from '../../store/userSlice';

const MemberProfileScreen = ({navigation, route}) => {
  const userData = useSelector(selectUserReferDetails);
  const referdata = route?.params?.data?.[0];
  console.log('Refer Data', referdata);
  const windowHeight = Dimensions.get('window').height;
  const code = '1234';
  const [qrCode, setQrCode] = useState(false);
  const handleBackPress = () => {
    navigation.popToTop();
  };

  items = [
    {label: '250K-300K', value: '1'},
    {label: '200K-250K', value: '2'},
    {label: '100K-200K', value: '3'},
  ];

  const profile = {
    memberID: referdata?.UniqueIdentifier,
    phone: userData.Contact1,
    email: userData.EmailAddress,
    Source: 'Referral',
    priceRange: referdata?.PricePoint,
    // userData.PriceRangeID == 1
    //   ? '250K-300K'
    //   : userData.PriceRangeID == 2
    //   ? '300K-350K'
    //   : userData.PriceRangeID == 3
    //   ? '350K-400K'
    //   : userData.PriceRangeID == 4
    //   ? '400K-450K'
    //   : userData.PriceRangeID == 5
    //   ? '450K-500K'
    //   : '450K-500K',
    City: userData.State,
    firstTimeBuyer: userData.FirstTimeBuyer === 1 ? 'Yes' : 'No',
    military: userData.IsMilitary ? 'Yes' : 'No',
    type: referdata?.TypeTitle,
    // userData.TypeID == 1
    //   ? 'First Home'
    //   : userData.TypeID == 2
    //   ? 'Second Home'
    //   : 'Third Home',
    bestTimeToCall: userData.BestTimeToCall == 1 ? 'Immediately' : 'Later',
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

  const handleKeyPress = event => {
    if (event.nativeEvent.key === 'Enter') {
      Keyboard.dismiss();
    }
  };

  const renderInputField = (label, value, maxLengthValue, state, setState) => (
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
          marginHorizontal: '20%',
        }}>
        {userData.firstName} {userData.lastName}
      </AppText>
      {userData.IsApproved === false && (
        <AppText style={styles.pendingText}>Pending</AppText>
      )}
      {/* <AppText
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
      </AppText> */}
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
  pendingText: {
    color: colors.danger,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: '40%',
  },
});
export default MemberProfileScreen;
