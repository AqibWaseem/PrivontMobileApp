// import React from 'react';
// import {ImageBackground, StatusBar, StyleSheet, View} from 'react-native';
// import {useSelector} from 'react-redux';

// import AppButton from '../../components/AppButton';
// import AppText from '../../components/AppText';

// const WelcomeScreen = ({navigation}) => {
//   const userData = useSelector(state => state.user.data);
//   console.log('UserDetail', userData);
//   const {UserID, UserName, UserType} = userData;
//   const name = UserName.toUpperCase();
//   return (
//     <ImageBackground
//       style={styles.background}
//       source={require('../../assets/background4.jpg')}>
//       <StatusBar hidden />
//       <View style={styles.centerContainer}>
//         <View style={styles.circle}>
//           <AppText style={styles.welcomeText}>Welcome</AppText>
//           <AppText style={styles.nameText}>{name}</AppText>
//         </View>
//       </View>
//       <View style={styles.buttonContainer}>
//         <AppButton
//           title="Dashboard"
//           onPress={() =>
//             navigation.navigate('TabGroup', {
//               initialRoute: 'DashboardNavigation',
//             })
//           }
//           iconName="setting"
//           textColor="#fff"
//         />
//         <AppButton
//           title="My Card"
//           onPress={() =>
//             navigation.navigate('StackGroup', {
//               initialRoute: 'MyCardScreen',
//             })
//           }
//           iconName="qrcode"
//           textColor="#fff"
//         />
//         <AppButton
//           title=""
//           onPress={() => navigation.navigate('ReferMemberScreen')}
//           iconName="adduser"
//         />
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     overflow: 'hidden',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 5,
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   circle: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   welcomeText: {
//     fontSize: 20,
//     color: '#fff',
//   },
//   nameText: {
//     fontSize: 36,
//     color: '#c499a3',
//     fontFamily: 'Raleway-Regular',
//   },
// });

// export default WelcomeScreen;
