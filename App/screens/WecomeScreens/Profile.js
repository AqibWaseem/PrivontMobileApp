import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../components/AppText';
import BottomLine from '../../components/BottomLine';
import ProfileButton from '../../components/ProfileButton';
import colors from '../../config/colors';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <>
          <Image
            source={require('../../assets/Fahad.jpg')}
            style={styles.profileImage}
          />
          <AppText style={styles.ratingText}>4.5</AppText>
        </>
        <View style={styles.userInfoContainer}>
          <AppText style={styles.userName}>Fahad Musadiq</AppText>
          <AppText style={styles.countryText}>from Pakistan, Multan</AppText>
          <AppText style={styles.handleText}>@fahadmusadiq</AppText>
        </View>
      </View>
      <TouchableOpacity
        style={styles.editProfileContainer}
        onPress={() => console.log('Edit Profile')}>
        <View style={styles.editProfileContent}>
          <View style={styles.editProfileLeft}>
            <AppText style={styles.editProfileText}>Edit Profile</AppText>
          </View>
          <View style={styles.editProfileRight}>
            <MaterialIcons
              name="arrow-forward-ios"
              size={26}
              color={colors.white}
            />
          </View>
        </View>
      </TouchableOpacity>
      <BottomLine marginTop={10} color="grey" />
      <TouchableOpacity
        style={styles.editProfileContainer}
        onPress={() => console.log('Edit Profile')}>
        <View style={styles.editProfileContent}>
          <View style={styles.editProfileLeft}>
            <AppText style={styles.editProfileText}>Change Password</AppText>
          </View>
          <View style={styles.editProfileRight}>
            <MaterialIcons
              name="arrow-forward-ios"
              size={26}
              color={colors.white}
            />
          </View>
        </View>
      </TouchableOpacity>
      <BottomLine marginTop={10} color="grey" />
      <TouchableOpacity
        style={styles.editProfileContainer}
        onPress={() => console.log('Edit Profile')}>
        <View style={styles.editProfileContent}>
          <View style={styles.editProfileLeft}>
            <AppText style={styles.editProfileText}>Contact Us</AppText>
          </View>
          <View style={styles.editProfileRight}>
            <MaterialIcons
              name="arrow-forward-ios"
              size={26}
              color={colors.white}
            />
          </View>
        </View>
      </TouchableOpacity>
      <BottomLine marginTop={10} color="grey" />
      <TouchableOpacity
        style={styles.editProfileContainer}
        onPress={() => console.log('Edit Profile')}>
        <View style={styles.editProfileContent}>
          <View style={styles.editProfileLeft}>
            <AppText style={styles.editProfileText}>About Us</AppText>
          </View>
          <View style={styles.editProfileRight}>
            <MaterialIcons
              name="arrow-forward-ios"
              size={26}
              color={colors.white}
            />
          </View>
        </View>
      </TouchableOpacity>
      <BottomLine marginTop={10} color="grey" />
      <TouchableOpacity
        style={styles.editProfileContainer}
        onPress={() => console.log('Edit Profile')}>
        <View style={styles.editProfileContent}>
          <View style={styles.editProfileLeft}>
            <AppText style={styles.editProfileText}>Settings</AppText>
          </View>
          <View style={styles.editProfileRight}>
            <MaterialIcons
              name="arrow-forward-ios"
              size={26}
              color={colors.white}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ProfileButton title="Sign Out" color="secondary" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primary,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 20,
    // marginLeft: 20,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5,
  },
  ratingText: {
    color: colors.white,
    position: 'absolute',
    backgroundColor: 'orange',
    borderRadius: 15,
    paddingLeft: 5,
    paddingTop: 1,
    left: 65,
    bottom: 10,
    width: 30,
    height: 30,
    fontSize: 14,
  },
  userInfoContainer: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  countryText: {
    fontSize: 16,
  },
  handleText: {
    fontSize: 14,
    // color: 'gray',
  },
  editProfileContainer: {
    marginTop: 30,
  },
  editProfileContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editProfileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editProfileRight: {
    marginLeft: 'auto',
  },
  editProfileText: {
    fontSize: 18,
    color: colors.white,
    marginRight: 10,
  },
});

export default Profile;
