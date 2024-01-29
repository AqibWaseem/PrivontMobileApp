import React, {useEffect, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../components/AppText';
import SimpleButton from '../../components/SimpleButton';
import colors from '../../config/colors';
import axios from 'axios';
import BaseUrl from '../../config/BaseUrl';
import {showToastWithGravityAndOffset} from '../../utilities/ToastMessage';
import Loader from '../../utilities/Loader';
const DigitalBusinessCard = ({route}) => {
  const data = route?.params?.scannedCode;
  const dataString = JSON.parse(data);
  const UserID = dataString?.UserID;
  const UserType = dataString?.UserType;
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);

  const email = userData?.[0]?.EmailAddress;
  const phone = userData?.[0]?.Contact1;
  const firstName = userData?.[0]?.FirstName;
  const lastName = userData?.[0]?.LastName;
  const Remarks = userData?.[0]?.Remarks;
  const [Users, setUsers] = useState('');

  const socialMediaInfo = userData?.[0]?.lstSocialMediaInfo;

  // Initialize an object to store social media data
  const socialMediaData = {};
  // Loop through the social media info and organize the data
  socialMediaInfo?.forEach(item => {
    const {SocialMediaTitle, ProfileLink} = item;
    // Check if the title already exists in the object
    if (!socialMediaData[SocialMediaTitle]) {
      // If not, create an array for the title
      socialMediaData[SocialMediaTitle] = [];
    }
    // Add the title and link to the corresponding array
    socialMediaData[SocialMediaTitle].push({
      title: SocialMediaTitle,
      link: ProfileLink,
    });
  });

  // Display the separated data
  const Facebook = socialMediaData?.Facebook?.[0]?.link;
  const Linkedin = socialMediaData?.Linkedin?.[0]?.link;
  const Instagram = socialMediaData?.Instagram?.[0]?.link;
  const Pinterest = socialMediaData?.Pinterest?.[0]?.link;
  const Snapchat = socialMediaData?.Snapchat?.[0]?.link;

  const GetUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}UserProfile/UserProfileInfo?UserID=${UserID}&UserType=${UserType}`,
      );
      if (response.data.Data) {
        setUserData(response.data.Data);
      }
    } catch (error) {
      console.error('Error Fetching User Details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (UserType === 2) {
      setUsers('Real Estate');
    }
    if (UserType === 3) {
      setUsers('Lender');
    }
    if (UserType === 4) {
      setUsers('Lead');
    }
    if (UserType === 5) {
      setUsers('Vendor');
    }
    GetUserDetails();
  }, [UserType]);

  const openContactApp = phoneNumber => {
    const contactAppLink = `tel:${phoneNumber}`;

    Linking.openURL(contactAppLink).catch(err => {
      showToastWithGravityAndOffset('Invaild Phone !!');
    });
  };
  const openEmailApp = emailAddress => {
    const emailAppLink = `mailto:${emailAddress}`;

    Linking.openURL(emailAppLink).catch(err => {
      showToastWithGravityAndOffset('Invaild Email !!');
    });
  };

  const openInstagramApp = profileUrl => {
    Linking.openURL(profileUrl).catch(err => {
      showToastWithGravityAndOffset('Invaild Link !!');

      // If Instagram app is not available, you may want to provide a fallback
      // For example, opening the Instagram website
      Linking.openURL(profileUrl.replace('www', 'web')).catch(webErr => {
        showToastWithGravityAndOffset('Invaild Link !!');
      });
    });
  };
  const openPinterestApp = profileUrl => {
    Linking.openURL(profileUrl).catch(err => {
      showToastWithGravityAndOffset('Invaild Link !!');

      // If Pinterest app is not available, you may want to provide a fallback
      // For example, opening the Pinterest website
      Linking.openURL(profileUrl.replace('www', 'www2')).catch(webErr => {
        showToastWithGravityAndOffset('Invaild Link !!');
      });
    });
  };
  const openSnapchatApp = profileUrl => {
    Linking.openURL(profileUrl).catch(err => {
      showToastWithGravityAndOffset('Invaild Link !!');

      // If Snapchat app is not available, you may want to provide a fallback
      // For example, opening the Snapchat website
      Linking.openURL(profileUrl.replace('www', 'www2')).catch(webErr => {
        showToastWithGravityAndOffset('Invaild Link !!');
      });
    });
  };

  const openFacebookApp = profileUrl => {
    Linking.openURL(profileUrl).catch(err => {
      showToastWithGravityAndOffset('Invaild Link !!');

      // If Facebook app is not available, you may want to provide a fallback
      // For example, opening the Facebook website
      Linking.openURL(profileUrl.replace('www', 'www2')).catch(webErr => {
        showToastWithGravityAndOffset('Invaild Link !!');
      });
    });
  };
  const openLinkedInApp = profileUrl => {
    Linking.openURL(profileUrl).catch(err => {
      showToastWithGravityAndOffset('Invaild Link !!');

      // If Facebook app is not available, you may want to provide a fallback
      // For example, opening the Facebook website
      Linking.openURL(profileUrl.replace('www', 'www2')).catch(webErr => {
        showToastWithGravityAndOffset('Invaild Link !!');
      });
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require('../../assets/beach.jpg')}
        style={styles.topImage}
      />
      <View
        style={{
          flex: 0.5,
          bottom: 30,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.primary,
        }}>
        <Image
          source={require('../../assets/profile2.png')}
          style={styles.imagesContainer}
        />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: '15%',
            alignSelf: 'center',
          }}>
          <AppText>
            {firstName} {lastName}
          </AppText>
          <AppText style={{fontSize: 14}}>{Users}</AppText>
          <AppText style={{fontSize: 15}}>{Remarks}</AppText>
        </View>
        <View
          style={{
            flexDirection: 'column',
            // marginLeft: '15%',
            alignSelf: 'center',
            marginVertical: '10%',
          }}>
          <SimpleButton
            label="Save Contact"
            width="50%"
            buttonStyle={{
              backgroundColor: colors.black,
              width: 350,
              height: 70,
            }}
            labelStyle={{marginTop: 20}}
            onPress={() => openContactApp(phone)}
            marginVertical={20}
          />
        </View>
      </View>
      <View style={styles.iconsRow}>
        <TouchableOpacity onPress={() => openEmailApp(email)}>
          <Icon
            name="email"
            size={70}
            color={colors.white}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openInstagramApp(Instagram)}>
          <Icon
            name="instagram"
            size={70}
            color={colors.pink}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openPinterestApp(Pinterest)}>
          <Icon
            name="pinterest"
            size={70}
            color={'#E60023'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsRow2}>
        <TouchableOpacity onPress={() => openSnapchatApp(Snapchat)}>
          <Icons
            name="snapchat"
            size={70}
            color={'yellow'}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openFacebookApp(Facebook)}>
          <Icon name="facebook" size={70} color={'blue'} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLinkedInApp(Linkedin)}>
          <Icon
            name="linkedin"
            size={70}
            color={colors.blue}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  topImage: {
    height: '40%',
    width: '100%',
    resizeMode: 'cover',
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.primary,
    bottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginRight: 20,
    marginLeft: 10,
    borderRadius: 60,
    position: 'absolute',
    bottom: 5,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#777',
  },
  saveContactsButton: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
  },
  saveContactsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  iconsRow2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  icon: {
    width: 70,
    height: 70,
  },
  imagesContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    position: 'absolute',
    top: '-40%',
    marginLeft: 5,
    borderRadius: 75,
    borderColor: '#fff',
    borderWidth: 1,
  },
});

export default DigitalBusinessCard;
