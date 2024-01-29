import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import CategoriesScreen from '../screens/DashBoardScreens/CategoriesScreen';
import DashboardScreen from '../screens/DashBoardScreens/DashboardScreen';
import MemberProfileScreen from '../screens/DashBoardScreens/MemberProfileScreen';
import MyCircleFavLender from '../screens/DashBoardScreens/MyCircleScreens/MyCircleFavLender';
import MyCircleProfile from '../screens/DashBoardScreens/MyCircleScreens/MyCircleProfile';
import MyCircleScreen from '../screens/DashBoardScreens/MyCircleScreens/MyCircleScreen';
import RecentProfile from '../screens/DashBoardScreens/RecentProfile';
import ReportsScreen from '../screens/DashBoardScreens/ReportsScreen';
import StatsScreen from '../screens/DashBoardScreens/StatsScreen';
import ReferMemberScreen from '../screens/WecomeScreens/ReferMemberScreen';
import DirectoryNavigation from './DirectoryNavigation';
import HeaderIcon from './HeaderIcon';
import StackSearch from './StackSearch';

const Stack = createNativeStackNavigator();

const DashboardNavigation = ({navigation, route}) => {
  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
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
        name="DirectoryScreen"
        component={DirectoryNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyCircle"
        component={MyCircleScreen}
        options={{
          headerTitle: props => <StackSearch {...props} />,
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
          headerTintColor: '#f4f4f4',
        }}
      />
      <Stack.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#212121',
          },
        }}
      />
      <Stack.Screen
        name="RecentProfile"
        component={RecentProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#212121',
          },
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ReferMemberScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MemberProfileScreen"
        component={MemberProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyCircleProfile"
        component={MyCircleProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyCircleFavLender"
        component={MyCircleFavLender}
        options={{
          title: 'Add Favorite',
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#212121',
          },
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
    </Stack.Navigator>
  );
};

export default DashboardNavigation;
