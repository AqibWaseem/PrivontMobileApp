import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import AppTextInput from '../components/AppTextInput';
import LoginButton from '../components/LoginButton';
import colors from '../config/colors';
import AppText from '../components/AppText';
import axios from 'axios';
import {showToastWithGravityAndOffset} from '../utilities/ToastMessage';
import BaseUrl from '../config/BaseUrl';

function RegisterScreen({navigation, route}) {
  const params = route?.params || {};
  console.log(params);
  const link = `https://privont.com/InvitationReference/Refer?q=${encodeURIComponent(
    params.q,
  )}&d=${encodeURIComponent(params.d)}&ti=${encodeURIComponent(
    params.ti,
  )}&fiy=${encodeURIComponent(params.fiy)}&s=${encodeURIComponent(
    params.s,
  )}&tuti=${encodeURIComponent(params.tuti)}&v=${encodeURIComponent(
    params.v,
  )}&futy=${encodeURIComponent(params.futy)}`;

  // console.log(link);

  // const {d, fiy, futy, q, s, ti, tuti, v} = route?.params || {};
  // console.log(route.params);

  // const link = `https://privont.com/InvitationReference/Refer?q=${encodeURIComponent(
  //   q,
  // )}&d=${encodeURIComponent(d)}&ti=${encodeURIComponent(
  //   ti,
  // )}&fiy=${encodeURIComponent(fiy)}&s=${encodeURIComponent(
  //   s,
  // )}&tuti=${encodeURIComponent(tuti)}&v=${encodeURIComponent(
  //   v,
  // )}&futy=${encodeURIComponent(futy)}`;

  // console.log('hello', link);

  const [signupData, setSignupData] = useState();
  const [loading, setLoading] = useState(false);
  const invitedFromFirstName = signupData?.InvitedFrom[0]?.FirstName;
  const invitedFromLastName = signupData?.InvitedFrom[0]?.LastName;
  const FirstName = signupData?.dbInvitedTo[0]?.FirstName;
  const LastName = signupData?.dbInvitedTo[0]?.LastName;
  const EmailAddress = signupData?.dbInvitedTo[0]?.EmailAddress;
  const Contact1 = signupData?.dbInvitedTo[0]?.Contact1;
  const UserID = signupData?.dbInvitedTo[0]?.UserID;
  const UserType = signupData?.dbInvitedTo[0]?.UserType;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const GetSignupData = async () => {
    try {
      const response = await axios.get(`${link}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.data.Status === 302) {
        showToastWithGravityAndOffset('User already exist. Please Sign In!');
        navigation.reset({
          index: 0,
          routes: [{name: 'StackGroup', initialRouteName: 'SignIn'}],
        });
      } else {
        setSignupData(response.data.Data);
      }
    } catch (error) {
      console.error('Signup Error', error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(signupData);
  useEffect(() => {
    GetSignupData();
  }, []);

  const HandlePress = async () => {
    if (password === confirmPassword) {
      setLoading(true);
      console.log(
        `${BaseUrl}InvitationReference/PostSignUp?UserName=${userName}&Password=${password}&UserID=${UserID}&UserType=${UserType}`,
      );
      try {
        const response = await axios.get(
          `${BaseUrl}InvitationReference/PostSignUp?UserName=${userName}&Password=${password}&UserID=${UserID}&UserType=${UserType}`,
        );
        console.log('Hello', response.data);
        if (response.data.Status === 409) {
          showToastWithGravityAndOffset('Username already Exist');
          return;
        }
        if (response.data.Status === 200) {
          showToastWithGravityAndOffset('Welcome To Privont Family !!');
          navigation.reset({
            index: 0,
            routes: [{name: 'StackGroup', initialRouteName: 'SignIn'}],
          });
        }
        // if()
        // if (response.data.Status === 200) {
        //   //   setModalVisible(true);
        //   showToastWithGravityAndOffset('Password Changed Successfully !!');
        //   await AsyncStorage.removeItem('bioMetricShown');
        //   await AsyncStorage.removeItem('biometricUsername');
        //   await AsyncStorage.removeItem('biometricPassword');
        //   navigation.reset({
        //     index: 0,
        //     routes: [{name: 'StackGroup', initialRouteName: 'SignIn'}],
        //   });
        // }
      } catch (error) {
        console.error('Password Not Changed', error);
      } finally {
        setLoading(false);
      }
    } else {
      showToastWithGravityAndOffset('Please Enter Same Password !!');
    }
  };

  const signupHandler = () => {
    navigation.navigate('SignIn');
  };

  // console.log(userName);
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.primary}}>
      <View style={styles.background}>
        <AppText style={{color: 'green', marginVertical: 50}}>
          You Have Been Invited By {invitedFromFirstName} {invitedFromLastName}
        </AppText>
        <AppTextInput
          icon="account"
          placeholder="First Name"
          placeholderTextColor="gray"
          color={colors.white}
          disabled
          value={FirstName}
        />
        <AppTextInput
          icon="account"
          placeholder="Last Name"
          placeholderTextColor="gray"
          color={colors.white}
          disabled
          value={LastName}
        />
        <AppTextInput
          icon="email"
          placeholder="Email"
          placeholderTextColor="gray"
          color={colors.white}
          disabled
          value={EmailAddress}
        />
        <AppTextInput
          icon="phone"
          placeholder="Phone"
          placeholderTextColor="gray"
          color={colors.white}
          disabled
          value={Contact1}
        />
        <AppTextInput
          icon="account"
          placeholder="UserName"
          placeholderTextColor="gray"
          color={colors.white}
          value={userName}
          onChangeText={text => setUserName(text)}
        />
        <AppTextInput
          icon="lock"
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          color={colors.white}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <AppTextInput
          icon="lock"
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          secureTextEntry
          color={colors.white}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        <View style={styles.buttonsContainer}>
          <LoginButton
            title="Sign Up"
            color="secondary"
            onPress={HandlePress}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <AppText>Already Have An Account?</AppText>
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
              Sign In
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '96%',
  },

  inputStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    width: '100%',
  },
});

export default RegisterScreen;
