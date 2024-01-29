// // import React, {useState} from 'react';
// // import {
// //   ActivityIndicator,
// //   StyleSheet,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import axios from 'axios';

// // import AppTextInput from '../components/AppTextInput';
// // import LoginButton from '../components/LoginButton';
// // import colors from '../config/colors';
// // import AppText from '../components/AppText';
// // import {useDispatch} from 'react-redux';
// // import {setUser} from '../store/userSlice';

// // function SignInScreen({navigation}) {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const dispatch = useDispatch();

// //   const handlePress = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.get(
// //         `${BaseUrl}GeneralApis/GetUserInfo?UserName=${username}&Password=${password}`,
// //       );

// //       if (response.data && response.data.Status) {
// //         dispatch(setUser(response.data.Data[0]));
// //         navigation.navigate('Welcome');
// //       } else {
// //         console.log('API Error:', response.data.Message);
// //       }
// //     } catch (error) {
// //       console.error('API Error:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const signupHandler = () => {
// //     navigation.navigate('SignUp');
// //   };
// //   return (
// //     <View style={styles.background}>
// //       {/* <Image style={styles.logo} source={require('../assets/logo.png')} /> */}
// //       <AppTextInput
// //         icon="account"
// //         placeholder="Username"
// //         placeholderTextColor="gray"
// //         color="#fff"
// //         value={username}
// //         onChangeText={text => setUsername(text)}
// //       />
// //       <AppTextInput
// //         icon="lock"
// //         placeholder="Password"
// //         placeholderTextColor="gray"
// //         secureTextEntry
// //         color="#fff"
// //         value={password}
// //         onChangeText={text => setPassword(text)}
// //       />
// //       <View style={styles.buttonsContainer}>
// //         <LoginButton title="Sign In" color="blue" onPress={handlePress} />
// //         {loading && <ActivityIndicator size="large" color="#fff" />}
// //       </View>
// //       <View style={{flexDirection: 'row'}}>
// //         <AppText>Don't Have An Account?</AppText>
// //         <TouchableOpacity
// //           style={{
// //             marginLeft: 5,
// //             alignSelf: 'center',
// //           }}
// //           onPress={signupHandler}>
// //           <AppText
// //             style={{
// //               color: colors.secondary,
// //               fontSize: 18,
// //             }}>
// //             Sign Up
// //           </AppText>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   background: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: colors.primary,
// //   },
// //   buttonsContainer: {
// //     padding: 20,
// //     width: '96%',
// //   },

// //   inputStyles: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     color: '#fff',
// //     width: '100%',
// //   },
// //   //   logo: {
// //   //     width: 120,
// //   //     height: 120,
// //   //     resizeMode: 'contain',
// //   //     position: 'absolute',
// //   //     top: 20,
// //   //   },
// // });

// // export default SignInScreen;

// import React, {useState} from 'react';
// import {
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Image,
//   StatusBar,
// } from 'react-native';
// import axios from 'axios';

// import AppTextInput from '../components/AppTextInput';
// import LoginButton from '../components/LoginButton';
// import colors from '../config/colors';
// import AppText from '../components/AppText';
// import {useDispatch} from 'react-redux';
// import {setUser} from '../store/userSlice';
// import {showToastWithGravityAndOffset} from '../utilities/ToastMessage';

// import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

// function SignInScreen({navigation}) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const biometric = async () => {
//     const rnBiometrics = new ReactNativeBiometrics();

//     rnBiometrics
//       .simplePrompt({promptMessage: 'Confirm fingerprint'})
//       .then(resultObject => {
//         const {success} = resultObject;

//         if (success) {
//           console.log('successful biometrics provided');
//           handleBiometricAuthentication('realadmin', 'realadmin');
//         } else {
//           console.log('user cancelled biometric prompt');
//         }
//       })
//       .catch(() => {
//         console.log('biometrics failed');
//       });
//   };

//   const handleBiometricAuthentication = async (
//     biometricUsername,
//     biometricPassword,
//   ) => {
//     try {
//       setLoading(true);

//       const response = await axios.get(
//         `${BaseUrl}GeneralApis/GetUserInfo?UserName=${biometricUsername}&Password=${biometricPassword}`,
//       );

//       if (
//         response.data &&
//         response.data.Status &&
//         response.data.Data.length > 0
//       ) {
//         const userData = response.data.Data[0];
//         dispatch(setUser(userData));
//         navigation.reset({
//           index: 0,
//           routes: [{name: 'TabGroup', initialRoute: 'Home'}],
//         });
//       } else {
//         showToastWithGravityAndOffset('Biometric authentication failed.');
//       }
//     } catch (error) {
//       showToastWithGravityAndOffset('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
//   biometric();

//   const handlePress = async () => {
//     Keyboard.dismiss();

//     if (!username || !password) {
//       showToastWithGravityAndOffset(`Provide Username and Password!`);
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${BaseUrl}GeneralApis/GetUserInfo?UserName=${username}&Password=${password}`,
//       );
//       if (
//         response.data &&
//         response.data.Status &&
//         response.data.Data.length > 0
//       ) {
//         const userData = response.data.Data[0];
//         dispatch(setUser(userData));
//         navigation.reset({
//           index: 0,
//           routes: [{name: 'TabGroup', initialRoute: 'Home'}],
//         });
//       } else {
//         showToastWithGravityAndOffset(`Incorrect Username or Password !!`);
//       }
//     } catch (error) {
//       showToastWithGravityAndOffset(`An error occurred. Please try again.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signupHandler = () => {
//     navigation.navigate('SignUp');
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <View style={styles.background}>
//         <StatusBar hidden />
//         <View style={styles.logoContainer}>
//           <Image style={styles.logo} source={require('../assets/logo.png')} />
//           <AppText style={styles.tagline}>Privont</AppText>
//         </View>
//         <AppTextInput
//           icon="account"
//           placeholder="Username"
//           placeholderTextColor="gray"
//           color="#fff"
//           value={username}
//           onChangeText={text => setUsername(text)}
//         />
//         <AppTextInput
//           icon="lock"
//           placeholder="Password"
//           placeholderTextColor="gray"
//           secureTextEntry
//           color="#fff"
//           value={password}
//           onChangeText={text => setPassword(text)}
//         />
//         <View style={styles.buttonsContainer}>
//           <LoginButton title="Sign In" color="blue" onPress={handlePress} />
//           {loading && <ActivityIndicator size="large" color={'#808080'} />}
//         </View>
//         <View style={{flexDirection: 'row'}}>
//           <AppText>Don't Have An Account?</AppText>
//           <TouchableOpacity
//             style={{
//               marginLeft: 5,
//               alignSelf: 'center',
//             }}
//             onPress={signupHandler}>
//             <AppText
//               style={{
//                 color: colors.secondary,
//                 fontSize: 18,
//               }}>
//               Sign Up
//             </AppText>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: colors.primary,
//   },
//   buttonsContainer: {
//     padding: 20,
//     width: '96%',
//   },
//   logo: {
//     width: 120,
//     height: 120,
//     resizeMode: 'contain',
//   },
//   logoContainer: {
//     alignItems: 'center',
//   },
//   tagline: {
//     fontSize: 52,
//     paddingVertical: 20,
//   },
// });

// export default SignInScreen;

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {useDispatch} from 'react-redux';
import {setChoosenColorAction, setUser} from '../store/userSlice';

import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import LoginButton from '../components/LoginButton';
import colors from '../config/colors';
import {showToastWithGravityAndOffset} from '../utilities/ToastMessage';
import AnimatedLoader from '../utilities/AnimatedLoader';
import BaseUrl from '../config/BaseUrl';

function SignInScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [biometricPromptShown, setBiometricPromptShown] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkBiometric = async () => {
      try {
        const biometricShown = JSON.parse(
          await AsyncStorage.getItem('bioMetricShown'),
        );
        const biometricEnabled = JSON.parse(
          await AsyncStorage.getItem('biometricEnabled'),
        );
        console.log('Enabled', biometricEnabled);

        if (biometricShown && biometricEnabled) {
          setBiometricPromptShown(true);
          biometric();
        }
      } catch (error) {
        console.error('Error reading biometric data:', error);
      }
    };

    checkBiometric();
  }, []);

  const biometric = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    try {
      const availableBiometrics = await rnBiometrics.isSensorAvailable();

      if (
        availableBiometrics.biometryType === BiometryTypes.Biometrics ||
        availableBiometrics.biometryType === BiometryTypes.FaceID ||
        availableBiometrics.biometryType === BiometryTypes.TouchID
      ) {
        const resultObject = await rnBiometrics.simplePrompt({
          promptMessage: `Confirm ${
            availableBiometrics.biometryType === BiometryTypes.Biometrics
              ? 'fingerprint'
              : availableBiometrics.biometryType === BiometryTypes.FaceID
              ? 'face recognition'
              : 'TouchID'
          }`,
          cancelButtonText: 'Use Password',
        });
        const {success} = resultObject;

        if (success) {
          console.log('Successful biometrics provided');
          const storedUserName = await AsyncStorage.getItem(
            'biometricUsername',
          );
          const storedPassword = await AsyncStorage.getItem(
            'biometricPassword',
          );
          handleBiometricAuthentication(storedUserName, storedPassword);
        } else {
          console.log('User cancelled biometric prompt');
        }
      } else {
        console.log('Biometrics not available');
      }
    } catch (error) {
      console.log('Biometrics failed:', error);
    }
  };

  const handleBiometricAuthentication = async (
    biometricUsername,
    biometricPassword,
  ) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${BaseUrl}GeneralApis/GetUserInfo?UserName=${biometricUsername}&Password=${biometricPassword}`,
      );

      if (
        response.data &&
        response.data.Status &&
        response.data.Data.length > 0
      ) {
        const userData = response.data.Data[0];
        dispatch(setUser(userData));
        navigation.reset({
          index: 0,
          routes: [{name: 'TabGroup', initialRoute: 'Home'}],
        });
      } else {
        showToastWithGravityAndOffset('Biometric authentication failed.');
      }
    } catch (error) {
      showToastWithGravityAndOffset('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePress = async () => {
    Keyboard.dismiss();

    if (!username || !password) {
      showToastWithGravityAndOffset('Provide Username and Password!');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${BaseUrl}GeneralApis/GetUserInfo?UserName=${username}&Password=${password}`,
      );

      if (
        response.data &&
        response.data.Status &&
        response.data.Data.length > 0
      ) {
        const userData = response.data.Data[0];
        dispatch(setUser(userData));
        await AsyncStorage.setItem(
          'UserType',
          JSON.stringify(userData.UserType),
        );
        await AsyncStorage.setItem('UserID', JSON.stringify(userData.UserID));
        await AsyncStorage.setItem('biometricUsername', username);
        await AsyncStorage.setItem('biometricPassword', password);
        await AsyncStorage.setItem('bioMetricShown', JSON.stringify(true));

        navigation.reset({
          index: 0,
          routes: [{name: 'TabGroup', initialRoute: 'Home'}],
        });
      } else {
        showToastWithGravityAndOffset('Incorrect Username or Password !!');
      }
    } catch (error) {
      showToastWithGravityAndOffset('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signupHandler = () => {
    navigation.navigate('SignUp');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.background}>
        <StatusBar hidden />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
          <AppText style={styles.tagline}>Privont</AppText>
        </View>
        <AppTextInput
          icon="account"
          placeholder="Username"
          placeholderTextColor="gray"
          color="#fff"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <AppTextInput
          icon="lock"
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          color="#fff"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <View style={styles.buttonsContainer}>
          <LoginButton title="Sign In" color="blue" onPress={handlePress} />
          {loading && <ActivityIndicator size="large" color={'#808080'} />}
        </View>
        {/* <View style={{flexDirection: 'row'}}>
          <AppText>Don't Have An Account?</AppText>
          <TouchableOpacity
            style={{
              marginLeft: 5,
              alignSelf: 'center',
            }}
            onPress={signupHandler}>
            <AppText
              style={{
                color: colors.secondary,
                fontSize: 18,
              }}>
              Sign Up
            </AppText>
          </TouchableOpacity>
        </View> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  buttonsContainer: {
    padding: 20,
    width: '96%',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  logoContainer: {
    alignItems: 'center',
  },
  tagline: {
    fontSize: 52,
    paddingVertical: 20,
  },
});

export default SignInScreen;
