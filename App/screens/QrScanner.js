import React from 'react';
import {StyleSheet, Vibration} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AppText from '../components/AppText';
import colors from '../config/colors';
import ViewPropTypes from 'deprecated-react-native-prop-types';

const QrScanner = ({navigation}) => {
  const onSuccess = e => {
    const scannedCode = e.data;
    Vibration.vibrate(200);
    navigation.navigate('DigitalBusinessCard', {scannedCode});
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      reactivate={true}
      reactivateTimeout={500}
      topContent={<AppText style={styles.centerText}>Scan QR Code</AppText>}
      bottomContent={<AppText style={styles.centerText}>Privont</AppText>}
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    fontSize: 18,
    color: colors.pink,
    alignSelf: 'center',
    marginVertical: 16,
  },
});

export default QrScanner;
