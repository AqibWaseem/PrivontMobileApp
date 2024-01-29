// import React from 'react';
// import {
//   ImageBackground,
//   StyleSheet,
//   View,
//   Image,
//   Text,
//   StatusBar,
// } from 'react-native';
// import LoginButton from '../components/LoginButton';
// import AppText from '../components/AppText';
// import colors from '../config/colors';

// function HomeScreen({navigation}) {
//   return (
//     <View
//       // blurRadius={10}
//       style={styles.background}
//       source={require('../assets/background.jpg')}>
//       <StatusBar hidden />
//       <View style={styles.logoContainer}>
//         <Image style={styles.logo} source={require('../assets/logo.png')} />
//         <AppText style={styles.tagline}>Privont</AppText>
//       </View>
//       <View style={styles.buttonsContainer}>
//         <LoginButton
//           title="Sign In"
//           color="blue"
//           onPress={() => navigation.navigate('SignIn')}
//         />
//         <LoginButton
//           title="Sign Up"
//           color="secondary"
//           onPress={() => navigation.navigate('SignUp')}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     backgroundColor: colors.primary,
//   },
//   buttonsContainer: {
//     padding: 20,
//     width: '100%',
//   },
//   logo: {
//     width: 120,
//     height: 120,
//     resizeMode: 'contain',
//   },
//   logoContainer: {
//     position: 'absolute',
//     top: 70,
//     alignItems: 'center',
//   },
//   tagline: {
//     fontSize: 52,
//     // fontWeight: 'bold',
//     paddingVertical: 20,
//   },
// });

// export default HomeScreen;
