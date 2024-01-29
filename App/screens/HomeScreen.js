import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import Share from 'react-native-share';

import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import colors from '../config/colors';
import {showToastWithGravityAndOffset} from '../utilities/ToastMessage';
import {
  AllLenderInfo,
  GetAllOrganization,
  PendingLenderInfo,
  UserProfile,
  GetPriceRange,
  GetReferType,
  selectGetFeaturedVendors,
  GetFeaturedVendors,
  UsersReview,
  GetFavVendors,
  AddMembersInfo,
  setChoosenColorAction,
} from '../store/userSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../utilities/Loader';
import AnimatedLoader from '../utilities/AnimatedLoader';
import {GetAllMembersInfo, GetPendingMembers} from '../store/memberSlice';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [choosenColor, setChoosenColor] = useState('');
  const textColor = useSelector(state => state.user.choosenColorText);
  console.log('Choosen color Home', textColor);
  //////////////////////////////// initial APIs call //////////////////////////////////
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const storedColor = await AsyncStorage.getItem('choosenColor');
        if (storedColor !== null) {
          setChoosenColor(storedColor);
        }
        const UserType = JSON.parse(await AsyncStorage.getItem('UserType'));
        const UserID = JSON.parse(await AsyncStorage.getItem('UserID'));
        dispatch(GetFeaturedVendors({UserType, UserID}));
        dispatch(GetFavVendors({UserType, UserID}));
        await dispatch(PendingLenderInfo());
        dispatch(AllLenderInfo({UserID}));
        await dispatch(GetAllOrganization());
        dispatch(UserProfile({UserType, UserID}));
        // dispatch(UsersReview({UserType, UserID}));
        await dispatch(GetPriceRange());
        await dispatch(GetReferType());
        // await dispatch(GetAllMembersInfo({UserType, UserID}));
        // await dispatch(GetPendingMembers({UserType, UserID}));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, choosenColor]);

  const calculateTextColor = () => {
    console.log('redux color', textColor);
    console.log('async color', choosenColor);
    if (textColor !== '') {
      return textColor;
    } else if (choosenColor !== '') {
      return choosenColor;
    } else {
      return '#c499a3';
    }
  };

  const textColorValue = calculateTextColor();
  //////////////////////////////////////////////////
  const [tierOne, setTierOne] = useState(false);
  const [tierTwo, setTierTwo] = useState(false);
  const [tierThree, setTierThree] = useState(false);
  const [tierFour, setTierFour] = useState(false);
  const userData = useSelector(state => state.user.data);

  let {UserType, FirstName} = userData;

  const name = FirstName.toUpperCase();
  // UserType = 3;
  // console.log(UserType);

  useEffect(() => {
    if (UserType === 2) {
      setTierOne(true);
      setTierTwo(false);
      setTierThree(false);
      setTierFour(false);
    }
    if (UserType === 3) {
      setTierOne(false);
      setTierTwo(true);
      setTierThree(false);
      setTierFour(false);
    }
    if (UserType === 4) {
      setTierOne(false);
      setTierTwo(false);
      setTierThree(true);
      setTierFour(false);
    }

    if (UserType === 5) {
      setTierOne(false);
      setTierTwo(false);
      setTierThree(true);
      setTierFour(false);
    }
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleShare = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      try {
        await Share.open({
          url: image.path,
        });
      } catch (error) {
        showToastWithGravityAndOffset(`Oops! Nothing Shared Yet !!`);
      }

      setModalVisible(false);
    } catch (error) {
      showToastWithGravityAndOffset(`Select An Image And Try Again !!`);
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/FullLandingPage.jpg')}>
      {modalVisible ? null : <StatusBar hidden />}
      <View style={styles.centerContainer}>
        <View style={styles.circle}>
          <AppText style={styles.welcomeText}>Welcome</AppText>
          <AppText style={[styles.nameText, {color: textColorValue}]}>
            {name}
          </AppText>
        </View>
      </View>
      {loading && (
        <ActivityIndicator
          size="large"
          color={'#fff'}
          style={{position: 'absolute', bottom: 140, left: '46.5%'}}
        />
      )}
      <View style={styles.buttonContainer}>
        {tierOne && (
          <>
            <AppButton
              title="Dashboard"
              onPress={() => navigation.navigate('DashboardNavigation')}
              iconName="setting"
              textColor="#fff"
            />
            <AppButton
              title="My Card"
              onPress={() => setModalVisible(!modalVisible)}
              iconName="qrcode"
              textColor="#fff"
            />
            <AppButton
              title=""
              onPress={() => navigation.navigate('ReferMemberScreen')}
              iconName="adduser"
            />
          </>
        )}
        {tierFour && (
          <>
            {/* <AppButton
              title="Dashboard"
              onPress={() => navigation.navigate('DashboardNavigation')}
              iconName="setting"
              textColor="#fff"
            /> */}
            <AppButton
              title="Directory"
              onPress={() =>
                navigation.navigate('DashboardNavigation', {
                  screen: 'DirectoryScreen',
                })
              }
              iconName="setting"
              textColor="#fff"
            />
            <AppButton
              title="My Card"
              onPress={() => setModalVisible(!modalVisible)}
              iconName="qrcode"
              textColor="#fff"
            />
            <AppButton
              title=""
              onPress={() => navigation.navigate('ReferMemberScreen')}
              iconName="adduser"
            />
          </>
        )}
        {tierTwo && (
          <>
            <AppButton
              title="Dashboard"
              onPress={() =>
                navigation.navigate('DashboardNavigation', {
                  screen: 'DirectoryScreen',
                })
              }
              iconName="setting"
              textColor="#fff"
            />
            <AppButton
              title="My Card"
              onPress={() => setModalVisible(!modalVisible)}
              iconName="qrcode"
              textColor="#fff"
            />
            <AppButton
              title="Notifications"
              onPress={() => navigation.navigate('Notification')}
              iconFont="bell"
              badgeCount={5} // Replace with the actual notification count
            />
          </>
        )}
        {tierThree && (
          <>
            <AppButton
              title=""
              onPress={handleShare}
              iconName="sharealt"
              textColor="#fff"
            />
            <AppButton
              title="My Card"
              onPress={() => navigation.navigate('MyCardScreen')}
              iconName="qrcode"
              textColor="#fff"
            />
            <AppButton
              title="Directory"
              onPress={() =>
                navigation.navigate('DashboardNavigation', {
                  screen: 'DirectoryScreen',
                })
              }
              iconFont="bars"
              textColor="#fff"
            />
          </>
        )}
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <StatusBar hidden />
            <View style={styles.modalContent}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: 'pink',
                    borderWidth: 1,
                    borderColor: colors.white,
                  }}></View>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    handleShare(), setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.modalButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: 'green',
                    borderWidth: 1,
                    borderColor: colors.white,
                  }}></View>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    navigation.navigate('MyCardScreen'),
                      setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.modalButtonText}>QR Code</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: '#40E0D0',
                    borderWidth: 1,
                    borderColor: colors.white,
                  }}></View>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    navigation.navigate('QrScanner'),
                      setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.modalButtonText}>Scan QR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#fff',
  },
  nameText: {
    fontSize: 24,
    color: '#c499a3',
    // fontFamily: 'Raleway-Regular',
  },

  modalContainer: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalContent: {
    width: 170,
    padding: 10,
    backgroundColor: colors.black,
    borderRadius: 30,
  },
  modalButton: {
    marginVertical: 4,
    padding: 5,
    backgroundColor: colors.black,
    borderRadius: 5,
    width: '60%',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
