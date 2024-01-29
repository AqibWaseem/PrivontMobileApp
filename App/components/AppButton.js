// import React from 'react';
// import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import FontAwesome1 from 'react-native-vector-icons/FontAwesome';
// import FontAwesome from 'react-native-vector-icons/FontAwesome6';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import colors from '../config/colors';
// import AppText from './AppText';
// const AppButton = ({
//   title,
//   onPress,
//   color = 'black',
//   iconName,
//   iconFont,
//   iconFont1,
//   mIcons,
//   textColor = 'black',
//   imageIcon,
//   fontisto,
//   backgroundColor,
//   Evil,
//   selected,
// }) => {
//   return (
//     <View style={styles.container}>
//       <View>
//         <TouchableOpacity
//           style={[
//             styles.button,
//             {
//               backgroundColor: colors.primary,
//               backgroundColor: backgroundColor,
//               borderColor: selected ? colors.secondary : colors.white,
//             },
//           ]}
//           onPress={onPress}>
//           {iconName && (
//             <AntDesign
//               style={{marginVertical: 10}}
//               name={iconName}
//               size={35}
//               color={colors.white}
//             />
//           )}
//           {fontisto && (
//             <Fontisto
//               style={{marginVertical: 10}}
//               name={fontisto}
//               size={35}
//               color={colors.white}
//             />
//           )}
//           {iconFont && (
//             <FontAwesome
//               style={{marginVertical: 10}}
//               name={iconFont}
//               size={35}
//               color={colors.white}
//             />
//           )}
//           {mIcons && (
//             <MaterialIcons
//               style={{marginVertical: 10}}
//               name={mIcons}
//               size={35}
//               color={colors.white}
//             />
//           )}
//           {iconFont1 && (
//             <FontAwesome1
//               style={{marginVertical: 10}}
//               name={iconFont1}
//               size={35}
//               color={colors.white}
//             />
//           )}
//           {imageIcon && (
//             <Image
//               source={imageIcon}
//               style={{
//                 width: 40,
//                 height: 40,
//                 marginVertical: 10,
//                 backgroundColor: '#fff',
//               }}
//             />
//           )}
//           {Evil && (
//             <EvilIcons
//               style={{marginVertical: 10}}
//               name={Evil}
//               size={40}
//               color={colors.white}
//             />
//           )}
//         </TouchableOpacity>
//       </View>
//       <View>
//         <AppText style={[styles.text, {color: textColor, fontSize: 13}]}>
//           {title}
//         </AppText>
//       </View>
//     </View>
//   );
// };

// export default AppButton;

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: colors.black,
//     width: 68,
//     height: 68,
//     borderRadius: 34,
//     borderColor: colors.white,
//     borderWidth: 2,
//     alignItems: 'center',
//     marginVertical: 5,
//     padding: 4,
//   },
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     color: colors.black,
//     alignSelf: 'center',
//   },
// });

import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome1 from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../config/colors';
import AppText from './AppText';

const AppButton = ({
  title,
  onPress,
  color = 'black',
  iconName,
  iconFont,
  iconFont1,
  mIcons,
  textColor = 'black',
  imageIcon,
  fontisto,
  backgroundColor,
  Evil,
  selected,
  badgeCount,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.primary,
              backgroundColor: backgroundColor,
              borderColor: selected ? colors.secondary : colors.white,
            },
          ]}
          onPress={onPress}>
          {iconName && (
            <AntDesign
              style={{marginVertical: 10}}
              name={iconName}
              size={35}
              color={colors.white}
            />
          )}
          {fontisto && (
            <Fontisto
              style={{marginVertical: 10}}
              name={fontisto}
              size={35}
              color={colors.white}
            />
          )}
          {iconFont && (
            <FontAwesome
              style={{marginVertical: 10}}
              name={iconFont}
              size={35}
              color={colors.white}
            />
          )}
          {mIcons && (
            <MaterialIcons
              style={{marginVertical: 10}}
              name={mIcons}
              size={35}
              color={colors.white}
            />
          )}
          {iconFont1 && (
            <FontAwesome1
              style={{marginVertical: 10}}
              name={iconFont1}
              size={35}
              color={colors.white}
            />
          )}
          {imageIcon && (
            <Image
              source={imageIcon}
              style={{
                width: 40,
                height: 40,
                marginVertical: 10,
                backgroundColor: '#fff',
              }}
            />
          )}
          {Evil && (
            <EvilIcons
              style={{marginVertical: 10}}
              name={Evil}
              size={40}
              color={colors.white}
            />
          )}

          {badgeCount > 0 && (
            <View style={styles.badgeContainer}>
              <AppText style={styles.badgeText}>{badgeCount}</AppText>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View>
        <AppText style={[styles.text, {color: textColor, fontSize: 13}]}>
          {title}
        </AppText>
      </View>
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.black,
    width: 68,
    height: 68,
    borderRadius: 34,
    borderColor: colors.white,
    borderWidth: 2,
    alignItems: 'center',
    marginVertical: 5,
    padding: 4,
    position: 'relative', // Add this style to make sure badge stays relative to the button
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.black,
    alignSelf: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: 10, // Adjust the top position as needed to align the badge
    right: 10, // Adjust the right position as needed to align the badge
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
