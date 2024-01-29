import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import AppText from '../../components/AppText';
import ProfileButton from '../../components/ProfileButton';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToastWithGravityAndOffset} from '../../utilities/ToastMessage';
import axios from 'axios';
import BaseUrl from '../../config/BaseUrl';

const PaymentCard = ({navigation}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardInfoData, setCardInfoData] = useState(null);
  const [selectedCardTypeID, setSelectedCardTypeID] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);

  console.log(cardDetails);
  const formatCardNumber = cardNumber => {
    // Remove any existing spaces
    const cleanCardNumber = cardNumber?.replace(/ /g, '');

    // Add a space after every 4 digits
    const formattedCardNumber = cleanCardNumber?.replace(/(.{4})/g, '$1 ');

    return formattedCardNumber?.trim(); // Trim any leading/trailing spaces
  };

  // Dummy data for the card image
  const cardImage = require('../../assets/Card2.jpg');
  const getCardTypeInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}CardInfo/GetCardTypeInfo`);
      setCardInfoData(response.data.Data);
    } catch (error) {
      console.error('API Error:', error);
      showToastWithGravityAndOffset(
        'An error occurred while fetching card information.',
      );
    } finally {
      setLoading(false);
    }
  };

  const getCardInfo = async () => {
    const UserType = await AsyncStorage.getItem('UserType');
    const UserID = await AsyncStorage.getItem('UserID');
    try {
      setLoading(true);
      const response = await axios.get(
        `${BaseUrl}CardInfo/GetCardInfo?UserID=${UserID}&UserType=${UserType}`,
      );
      console.log(response.data);
      const formattedCardInfo = response.data?.Data?.map(cardType => {
        const expiryDateTimestamp = parseInt(
          cardType.ExpiryDate.replace('/Date(', '').replace(')/', ''),
          10,
        );
        const expiryDate = new Date(expiryDateTimestamp);
        return {
          ...cardType,
          ExpiryDate: `${(expiryDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${expiryDate
            .getFullYear()
            .toString()
            .slice(-2)}`,
        };
      });

      setCardDetails(formattedCardInfo);
    } catch (error) {
      console.error('API Error:', error);
      showToastWithGravityAndOffset(
        'An error occurred while fetching card information.',
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCardInfo();
    getCardTypeInfo();
  }, []);
  console.log(selectedCardTypeID);

  const onPressHandler = async () => {
    if (
      !cardNumber ||
      !holderName ||
      !expirationDate ||
      !cvv ||
      !selectedCardTypeID
    ) {
      showToastWithGravityAndOffset('Please Provide Complete Card Details!!');
      return;
    }
    const UserType = await AsyncStorage.getItem('UserType');
    const UserID = await AsyncStorage.getItem('UserID');
    try {
      setLoading(true);
      const response = await axios.post(`${BaseUrl}CardInfo/PostCardInfo`, {
        CardID: 0,
        CardNumber: cardNumber,
        CardHolderName: holderName,
        ExpiryDate: expirationDate,
        CVV: cvv,
        CardTypeID: selectedCardTypeID,
        UserID: UserID,
        UserType: UserType,
      });
      // console.log('API Response:', response.data);
      const formattedCardInfo = response.data?.Data?.map(cardType => {
        const expiryDateTimestamp = parseInt(
          cardType.ExpiryDate.replace('/Date(', '').replace(')/', ''),
          10,
        );
        const expiryDate = new Date(expiryDateTimestamp);
        return {
          ...cardType,
          ExpiryDate: `${(expiryDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${expiryDate
            .getFullYear()
            .toString()
            .slice(-2)}`,
        };
      });

      setCardDetails(formattedCardInfo);
    } catch (error) {
      console.error('API Error:', error);
      showToastWithGravityAndOffset('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100} // Adjust the offset as needed
    >
      <ScrollView style={styles.container}>
        <View style={{flex: 1}}>
          <Image source={cardImage} style={styles.cardImage} />

          <AppText style={styles.cardNumber}>Card Number</AppText>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              onChangeText={text => setCardNumber(text)}
              value={cardNumber}
              maxLength={16}
            />
          </View>
          <AppText style={styles.cardNumber}>Account Holder Name</AppText>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              onChangeText={text => setHolderName(text)}
              value={holderName}
            />
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.column}>
              <AppText style={styles.cardNumber}>Expiration Date</AppText>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  onChangeText={text => setExpirationDate(text)}
                  placeholder="MM/DD/YY"
                  placeholderTextColor={colors.white}
                  value={expirationDate}
                  maxLength={10}
                />
              </View>
            </View>
            <View style={styles.column}>
              <AppText style={styles.cardNumber}>CVV</AppText>
              <View style={styles.searchContainer}>
                <TextInput
                  keyboardType="number-pad"
                  style={styles.searchInput}
                  onChangeText={text => setCvv(text)}
                  value={cvv}
                  maxLength={4}
                />
              </View>
            </View>
          </View>

          <View style={styles.rowContainer}>
            {/* <View style={styles.column}>
              <ProfileButton
                title="Scan Card"
                color="secondary"
                width="95%"
                marginVertical={20}
              />
            </View> */}
            <View style={styles.column}>
              <ProfileButton
                title="Save Card"
                color="blue"
                width="98%"
                marginTop={60}
                // marginVertical={30}
                onPress={onPressHandler}
              />
            </View>
          </View>
          {cardDetails && (
            <View style={styles.cardDetailsContainer}>
              <Text style={[styles.cardDetailsText, {left: 10}]}></Text>

              <Text style={[styles.cardDetailsText, {maxWidth: 230}]}>
                {cardDetails[0]?.CardHolderName}
              </Text>
              <Text
                style={[
                  styles.cardDetailsText,
                  {top: 35, right: 80, fontSize: 24},
                ]}>
                {formatCardNumber(cardDetails[0]?.CardNumber)}
              </Text>
              <Text
                style={[
                  styles.cardDetailsText,
                  {bottom: -40, right: 80, fontSize: 16},
                ]}>
                {cardDetails[0]?.ExpiryDate}
              </Text>
              {/* <View
                style={{
                  // width: 100,
                  // height: 60,
                  left: 110,
                  top: 1,
                  // alignSelf: 'center',
                  // backgroundColor: colors.pink,
                }}>
                <Icon
                  name={cardDetails[0]?.CardIcon}
                  size={30}
                  backgroundColor={colors.white}
                  style={{alignSelf: 'center', padding: 4, borderRadius: 10}}
                />
              </View> */}
            </View>
          )}
        </View>
        <View style={{marginTop: 'auto'}}>
          <View style={styles.bottomButtonsContainer}>
            {cardInfoData?.map(cardType => (
              <TouchableOpacity
                key={cardType.CardTypeID}
                style={[
                  styles.bottomButton,
                  selectedCardTypeID === cardType.CardTypeID && {
                    backgroundColor: colors.pink,
                  },
                ]}
                onPress={() => setSelectedCardTypeID(cardType.CardTypeID)}>
                <Icon name={cardType.CardIcon} size={30} color={colors.white} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.primary,
  },
  cardImage: {
    width: '100%',
    height: 210,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardNumber: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 5,
  },
  searchContainer: {
    width: '100%',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#212121',
    borderRadius: 15,
    width: '99%',
    fontSize: 16,
    height: 35,
    marginTop: 10,
    padding: 2,
    color: colors.white,
    paddingLeft: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  column: {
    flex: 1,
    // marginRight: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.secondary,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    padding: 1,
    marginBottom: 20,
  },
  bottomButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#b6bdc9',
    marginHorizontal: 2,
  },
  bottomButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  cardDetailsContainer: {
    position: 'absolute',
    top: 20,
    left: 110,
    // right: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 10,
  },
  cardDetailsText: {
    color: colors.white,
    fontSize: 16,
  },
});
export default PaymentCard;
