import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Notifications from '../screens/Notifications';
import SettingsScreen from '../screens/SettingsScreen';
import HeaderIcon from './HeaderIcon';

import {TouchableOpacity} from 'react-native';
import ApiConfiguration from '../screens/ApiConfiguration';
import SmsFormat from '../screens/SmsFormat';
import EditProfileScreen from '../screens/WecomeScreens/EditProfileScreen';
import MapScreen from '../screens/WecomeScreens/MapScreen';
import PaymentCard from '../screens/WecomeScreens/PaymentCard';
import SecurePayment from '../screens/WecomeScreens/SecurePayment';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const Stack = createNativeStackNavigator();

const NotificationsGroup = ({navigation, route}) => {
  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const SettingsPressed = () => {
    navigation.navigate('Settings');
  };

  const SettingsIcon = ({name, onPress, handleStackBackPress}) => (
    <TouchableOpacity onPress={onPress ? onPress : handleStackBackPress}>
      <AntDesign name={name} size={28} color="white" />
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerRight: () => (
            <HeaderIcon
              name="notifications"
              onPress={() => navigation.navigate('Notification')}
              badgeCount={5}
            />
          ),
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <SettingsIcon name="setting" onPress={SettingsPressed} />
          ),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Update Profile',
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MyCard"
        component={PaymentCard}
        options={{
          title: 'Add New Payment',
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name="SmsSettings"
        component={SmsFormat}
        options={{
          title: 'SMS Settings',
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ApiConfiguration"
        component={ApiConfiguration}
        options={{
          title: 'API Configuration',
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="SecurePayment"
        component={SecurePayment}
        options={{
          title: 'Secure Payment',
          // headerShown: false,
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          title: 'Change Password',
          // headerShown: false,
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default NotificationsGroup;
