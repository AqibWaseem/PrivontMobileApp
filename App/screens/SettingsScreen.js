import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; // You can use any icon library of your choice
import Entypo from 'react-native-vector-icons/Entypo'; // You can use any icon library of your choice
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // You can use any icon library of your choice
import Fontisto from 'react-native-vector-icons/Fontisto'; // You can use any icon library of your choice
import Ionicons from 'react-native-vector-icons/Ionicons'; // You can use any icon library of your choice
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // You can use any icon library of your choice
import {useDispatch, useSelector} from 'react-redux';
import CustomSwitch from '../components/SwitchComponent';
import colors from '../config/colors';
import WheelColorPicker from 'react-native-wheel-color-picker';
import {setChoosenColorAction} from '../store/userSlice';

const SettingsScreen = ({navigation}) => {
  const [notification, setNotification] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(false);
  const [biometric, setBiometric] = useState(false);
  const [chosenColor, setChosenColor] = useState('#000');
  const pickerRef = useRef(null);
  const dispatch = useDispatch();
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  let {UserType, UserID} = useSelector(state => state.user.data);
  console.log('setting Screen', chosenColor);
  const handleColorChange = color => {
    setChosenColor(color);
  };

  const openColorPicker = () => {
    setColorPickerVisible(true);
  };

  const closeColorPicker = () => {
    setColorPickerVisible(false);
    setChosenColor('#000');
  };
  const saveColorPicker = () => {
    setColorPickerVisible(false);
    setChosenColor(chosenColor);
    AsyncStorage.setItem('choosenColor', chosenColor);
    dispatch(setChoosenColorAction(chosenColor));
  };

  useEffect(() => {
    const getBiometric = async () => {
      const storedBiometric = JSON.parse(
        await AsyncStorage.getItem('biometricEnabled'),
      );
      if (storedBiometric !== null) {
        setBiometric(storedBiometric);
      }
    };
    getBiometric();
  }, []);

  const toggleBiometric = async () => {
    const newBiometricStatus = !biometric;
    setBiometric(newBiometricStatus);
    AsyncStorage.setItem(
      'biometricEnabled',
      JSON.stringify(newBiometricStatus),
    );
  };

  const logoutHandler = async () => {
    await AsyncStorage.removeItem('bioMetricShown');
    await AsyncStorage.removeItem('biometricUsername');
    await AsyncStorage.removeItem('biometricPassword');

    navigation.reset({
      index: 0,
      routes: [{name: 'StackGroup', initialRouteName: 'SignIn'}],
    });
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <View style={styles.touchableItem}>
          <Ionicons name="home" size={24} color="white" style={styles.icons} />
          <Text style={styles.touchableText}>Notifications</Text>
          <View
            style={{
              marginLeft: 'auto',
              marginRight: 10,
            }}>
            <CustomSwitch
              onValueChange={() => setNotification(!notification)}
              value={notification}
            />
          </View>
        </View>
        <View style={styles.touchableItem}>
          <AntDesign name="bars" size={24} color="white" style={styles.icons} />
          <Text style={styles.touchableText}>Dark mode</Text>
          <View
            style={{
              marginLeft: 'auto',
              marginRight: 10,
            }}>
            <CustomSwitch
              onValueChange={() => setDarkMode(!darkMode)}
              value={darkMode}
            />
          </View>
        </View>
        <View style={styles.touchableItem}>
          <Ionicons name="star" size={24} color="white" style={styles.icons} />
          <Text style={styles.touchableText}>Area Location</Text>
          <View
            style={{
              marginLeft: 'auto',
              marginRight: 10,
            }}>
            <CustomSwitch
              onValueChange={() => setLocation(!location)}
              value={location}
            />
          </View>
        </View>
        <View style={styles.touchableItem}>
          <Ionicons name="star" size={24} color="white" style={styles.icons} />
          <Text style={styles.touchableText}>
            Enable{' '}
            {Platform.OS === 'android' ? 'Fingerprint' : 'FaceID or TouchID'}
          </Text>
          <View style={{marginLeft: 'auto', marginRight: 10}}>
            <CustomSwitch onValueChange={toggleBiometric} value={biometric} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.touchableItem}
          onPress={() => navigation.navigate('MyCard')}>
          <Ionicons name="card" size={24} color="white" style={styles.icons} />
          <Text style={styles.touchableText}>My Cards</Text>
        </TouchableOpacity>

        {UserType === 2 && (
          <>
            <TouchableOpacity
              style={styles.touchableItem}
              onPress={() => navigation.navigate('SmsSettings')}>
              <Ionicons
                name="settings"
                size={24}
                color="white"
                style={styles.icons}
              />
              <Text style={styles.touchableText}>SMS Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableItem}
              onPress={() => navigation.navigate('ApiConfiguration')}>
              <Ionicons
                name="settings"
                size={24}
                color="white"
                style={styles.icons}
              />
              <Text style={styles.touchableText}>API Configurations</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={styles.touchableItem}
          onPress={openColorPicker}>
          <Ionicons
            name="search"
            size={24}
            color="white"
            style={styles.icons}
          />
          <Text style={styles.touchableText}>Choose Color</Text>
        </TouchableOpacity>

        {/* Color Picker Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={colorPickerVisible}
          onRequestClose={closeColorPicker}>
          <View style={styles.modalContainer}>
            <Pressable style={styles.modalOverlay} />
            <View style={styles.modalContent}>
              <WheelColorPicker
                color={chosenColor}
                onColorChange={handleColorChange}
                thumbSize={30}
                sliderSize={40}
                gapSize={20}
                // noSnap={true}
                // row={false}
                useNativeDriver={false}
                style={{top: '600%'}}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Pressable
                  style={styles.closeButton}
                  onPress={closeColorPicker}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
                <Pressable style={styles.saveButton} onPress={saveColorPicker}>
                  <Text style={styles.closeButtonText}>Save</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.colorPreview}>
              <Text style={styles.previewText}>Choosen Color</Text>
              <View style={[styles.colorBox, {backgroundColor: chosenColor}]} />
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.touchableItem}>
          <Ionicons name="cloud" size={24} color="white" style={styles.icons} />
          <Text style={styles.touchableText}>Help Chat</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Extras</Text>
        </View>
        <TouchableOpacity style={styles.touchableItem}>
          <Entypo
            name="info-with-circle"
            size={24}
            color="white"
            style={styles.icons}
          />
          <Text style={styles.touchableText}>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableItem}>
          <MaterialCommunityIcons
            name="clipboard-text-outline"
            size={24}
            color="white"
            style={styles.icons}
          />
          <Text style={styles.touchableText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      {/* User Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>User</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Notification', {
              screen: 'EditProfile',
            })
          }
          style={styles.touchableItem}>
          <FontAwesome6
            name="user"
            size={24}
            color="white"
            style={styles.icons}
          />
          <Text style={styles.touchableText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableItem}
          onPress={() => navigation.navigate('ChangePasswordScreen')}>
          <Fontisto
            name="locked"
            size={24}
            color="white"
            style={styles.icons}
          />
          <Text style={styles.touchableText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logoutHandler} style={styles.touchableItem}>
          <AntDesign
            name="logout"
            size={24}
            color="white"
            style={[styles.icons]}
          />
          <Text style={[styles.touchableText]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  sectionTitle: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    marginBottom: 7,
    marginTop: 7,
  },
  sectionHeading: {
    backgroundColor: '#000',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
  },
  touchableText: {
    // marginLeft: 10,
    fontSize: 18,
    color: colors.white,
    padding: 7,
    fontWeight: 'bold',
  },
  icons: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primary,
    // borderColor: '#fff',
    // borderWidth: 2,
    // height: '100%',
  },
  modalContent: {
    backgroundColor: colors.primary,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    marginTop: 10,
    // alignSelf: 'flex-end',
  },
  saveButton: {
    marginTop: 10,
    // alignSelf: 'flex-start',
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },

  colorPreview: {
    position: 'absolute',
    bottom: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 0,
  },
  previewText: {
    fontSize: 16,
    color: colors.white,
    // marginBottom: 10,
  },
  colorBox: {
    width: 50,
    height: 30,
    borderRadius: 5,
  },
});

export default SettingsScreen;
