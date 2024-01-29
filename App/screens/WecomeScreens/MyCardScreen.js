// import React, {useEffect, useState} from 'react';
// import {
//   ImageBackground,
//   StatusBar,
//   StyleSheet,
//   View,
//   Dimensions,
// } from 'react-native';

// import QRCode from 'react-native-qrcode-svg';
// import colors from '../../config/colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useSelector} from 'react-redux';

// const MyCardScreen = ({navigation}) => {
//   const {UserID, UserType} = useSelector(state => state?.user?.data);
//   console.log(UserID, UserType);
//   // UserID=1 and UserType=3
//   const [data, setData] = useState({UserID, UserType});
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setData(JSON.parse(await AsyncStorage.getItem('UserID')).toString());
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <ImageBackground
//       style={styles.background}
//       source={require('../../assets/FullLandingPage.jpg')}>
//       <StatusBar hidden />
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <View
//           style={{
//             backgroundColor: colors.white,
//             width: 'auto',
//             height: 320,
//             alignContent: 'center',
//             justifyContent: 'center',
//             padding: 20,
//             borderRadius: 20,
//           }}>
//           <QRCode
//             size={300}
//             backgroundColor="white"
//             color="black"
//             value={data}
//             style={{marginLeft: 20}}
//           />
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };
// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     resizeMode: 'contain',
//   },
// });
// export default MyCardScreen;

import React from 'react';
import {ImageBackground, StatusBar, StyleSheet, View} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import colors from '../../config/colors';
import {useSelector} from 'react-redux';

const MyCardScreen = () => {
  const {UserID, UserType} = useSelector(state => state?.user?.data);

  // Convert the object to a JSON string
  const dataString = JSON.stringify({UserID, UserType});

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/FullLandingPage.jpg')}>
      <StatusBar hidden />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            width: 'auto',
            height: 320,
            alignContent: 'center',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 20,
          }}>
          <QRCode
            size={300}
            backgroundColor="white"
            color="black"
            value={dataString} // Pass the JSON string
            style={{marginLeft: 20}}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default MyCardScreen;
