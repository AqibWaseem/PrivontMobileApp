import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import ProfileScreenVendor from '../screens/ProfileScreenVendor/ProfileScreenVendor';
import Reviews from '../screens/ProfileScreenVendor/Reviews';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const ProfileScreenNavigation = ({route}) => {
  const userData = useSelector(state => state.user.data);
  let {UserType} = userData;
  // UserType = 5;
  return (
    <Stack.Navigator>
      {UserType === 2 && (
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
            headerTintColor: '#f4f4f4',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#212121',
            },
          }}
        />
      )}
      {UserType === 3 && (
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
            headerTintColor: '#f4f4f4',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#212121',
            },
          }}
        />
      )}
      {UserType === 4 && (
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
            headerTintColor: '#f4f4f4',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#212121',
            },
          }}
        />
      )}
      {UserType === 5 && (
        <Stack.Screen
          name="ProfileScreenVendor"
          component={ProfileScreenVendor}
          options={{
            headerShown: false,
            headerTintColor: '#f4f4f4',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#212121',
            },
          }}
        />
      )}
      {UserType === 5 && (
        <Stack.Screen
          name="Reviews"
          component={Reviews}
          options={{
            headerTintColor: '#f4f4f4',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#212121',
            },
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default ProfileScreenNavigation;
