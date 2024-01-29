// import React, {useState} from 'react';
// import {View, Text, StyleSheet, Button, TextInput, Modal} from 'react-native';
// import colors from '../config/colors';
// import {showToastWithGravityAndOffset} from '../utilities/ToastMessage';

// const ChangePasswordScreen = () => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isModalVisible, setModalVisible] = useState(false);

//   const handleSave = () => {
//     if (password === confirmPassword) {
//       setModalVisible(true);
//     } else {
//       showToastWithGravityAndOffset('Please Enter Same Password !!');
//     }
//   };

//   const handleVerify = () => {
//     console.log('OTP entered: ', otp);
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         placeholderTextColor={colors.white}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Confirm password"
//         secureTextEntry
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         placeholderTextColor={colors.white}
//       />
//       <Button title="Save" onPress={handleSave} />

//       <Modal
//         visible={isModalVisible}
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalView}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter OTP"
//             keyboardType="numeric"
//             maxLength={4}
//             value={otp}
//             onChangeText={setOtp}
//             placeholderTextColor={colors.white}
//           />
//           <Button title="Verify" onPress={handleVerify} />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: colors.primary,
//   },
//   input: {
//     height: 40,
//     marginBottom: 12,
//     borderWidth: 1,
//     padding: 10,
//     borderColor: '#fff',
//     color: '#fff',
//   },
//   modalView: {
//     flex: 1,
//     justifyContent: 'center',
//     margin: 20,
//     backgroundColor: '#000',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
// });

// export default ChangePasswordScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';
import {showToastWithGravityAndOffset} from '../utilities/ToastMessage';
import {useSelector} from 'react-redux';
import axios from 'axios';
import BaseUrl from '../config/BaseUrl';
import Loader from '../utilities/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePasswordScreen = ({navigation}) => {
  let {UserType, UserID, UserName} = useSelector(state => state.user.data);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleSave = async () => {
    if (password === confirmPassword) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BaseUrl}ChangePassword/ChangePassword?Password=${password}&UserID=${UserID}&UserType=${UserType}`,
        );
        console.log('Hello', response.data.Status);
        if (response.data.Status === 200) {
          //   setModalVisible(true);
          showToastWithGravityAndOffset('Password Changed Successfully !!');
          await AsyncStorage.removeItem('bioMetricShown');
          await AsyncStorage.removeItem('biometricUsername');
          await AsyncStorage.removeItem('biometricPassword');
          navigation.reset({
            index: 0,
            routes: [{name: 'StackGroup', initialRouteName: 'SignIn'}],
          });
        }
      } catch (error) {
        console.error('Password Not Changed', error);
      } finally {
        setLoading(false);
      }
    } else {
      showToastWithGravityAndOffset('Please Enter Same Password !!');
    }
  };

  //   const formatOtp = input => {

  //     const numericInput = input.replace(/\D/g, '');

  //     const formattedInput = numericInput.split('').join('-');

  //     setOtp(formattedInput);
  //   };

  const handleVerify = () => {
    // Add your OTP verification logic here
    console.log('OTP entered: ', otp);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text
            style={{color: colors.pink, bottom: 100, left: 100, fontSize: 30}}>
            {UserName.toUpperCase()}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter New Password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              placeholderTextColor={colors.white}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry={!isConfirmPasswordVisible}
              value={confirmPassword}
              placeholderTextColor={colors.white}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
              <Ionicons
                name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <Button title="Save" onPress={handleSave} />
        </>
      )}

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.inputOpt}
            placeholder="Enter OTP"
            keyboardType="numeric"
            maxLength={4}
            value={otp}
            onChangeText={setOtp}
            placeholderTextColor={colors.white}
          />
          <Button title="Verify" onPress={handleVerify} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.primary,
  },
  inputOpt: {
    height: 40,
    color: '#fff',
    borderWidth: 1,
    padding: 10,
    borderColor: '#fff',
    marginBottom: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    // margin: 1,
    backgroundColor: colors.primary,
    // borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#fff',
  },
});

export default ChangePasswordScreen;
