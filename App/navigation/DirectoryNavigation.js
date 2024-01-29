import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import CategoriesScreen from '../screens/DashBoardScreens/CategoriesScreen';
import DirectoryProfile from '../screens/DashBoardScreens/DirectoryScreens/DirectoryProfile';
import DirectoryScreen from '../screens/DashBoardScreens/DirectoryScreens/DirectoryScreen';
import Reviews from '../screens/DashBoardScreens/DirectoryScreens/Reviews';
import HeaderIcon from './HeaderIcon';
import WriteReview from '../screens/DashBoardScreens/DirectoryScreens/WriteReview';

const Stack = createNativeStackNavigator();

const DirectoryNavigation = ({navigation}) => {
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <Stack.Navigator initialRouteName="Directory">
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
          headerRight: () => (
            <HeaderIcon
              name="notifications"
              onPress={() => navigation.navigate('Notification')}
              badgeCount={5} // Replace with the actual notification count
            />
          ),
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerLeft: () => (
            <HeaderIcon name="arrow-back-ios-new" onPress={handleBackPress} />
          ),
        }}
      />

      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#212121',
          },
        }}
      />
      <Stack.Screen
        name="DirectoryProfile"
        component={DirectoryProfile}
        options={{
          headerShown: false,
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#212121',
          },
        }}
      />
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
      <Stack.Screen
        name="WriteReview"
        component={WriteReview}
        options={{
          headerShown: false,
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#212121',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default DirectoryNavigation;
