import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppText from '../../components/AppText';
import BottomLine from '../../components/BottomLine';
import ProfileButton from '../../components/ProfileButton';
import colors from '../../config/colors';

const SecurePayment = () => {
  const profile = {
    memberID: 'P1289811',
    phone: '206-555-1212',
    email: 'Eswanson436@gmail.com',
    Source: 'Referral',
    priceRange: '250K-300K',
    City: 'Temple, TX',
    firstTimeBuyer: 'Yes',
    military: 'Yes',
    type: 'Second Home',
    bestTimeToCall: 'Immediately',
    TranscationFee: '$150.00',
  };
  const renderInputField = (label, value, maxLengthValue, state, setState) => (
    <View style={styles.inputContainer}>
      <AppText style={styles.label}>{label}</AppText>
      <AppText style={styles.input}>{value}</AppText>
    </View>
  );
  return (
    <View style={styles.container}>
      <AppText style={styles.fundsText}>Funds</AppText>
      <View style={styles.cardDetails}>
        {/* Insert Visa icon or image here */}
        <View style={styles.visaIcon}>
          <Icon
            name="cc-visa"
            size={30}
            color={colors.white}
            style={{alignSelf: 'center', marginTop: 5}}
          />
        </View>

        <View style={styles.cardEndingContainer}>
          <AppText style={styles.cardEndingText}>Card Ending: 5656</AppText>
        </View>

        <TouchableOpacity onPress={() => console.log('Change pressed')}>
          <AppText style={styles.changeText}>Change</AppText>
        </TouchableOpacity>
      </View>
      <BottomLine marginVertical={20} height={3} />
      <AppText style={{fontSize: 16}}>Transaction Details</AppText>
      <View>
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
        {renderInputField('Transaction Fee', profile.TranscationFee)}
      </View>
      <View style={{marginTop: 'auto'}}>
        <ProfileButton
          title="Confirm"
          color="secondary"
          width="85%"
          marginHorizontal={27}
          marginVertical={50}
          borderRadius={50}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: colors.primary},
  fundsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.white,
  },
  cardDetails: {
    flexDirection: 'row',
    backgroundColor: '#212121',
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  visaIcon: {
    marginRight: 10,
    width: 60,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.grey, // Placeholder background color
  },
  cardEndingContainer: {
    flex: 1,
  },
  cardEndingText: {
    color: 'white',
  },
  changeText: {
    color: '#28c0e2',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  label: {
    color: colors.grey,
    fontSize: 14,

    width: 140,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
});

export default SecurePayment;
