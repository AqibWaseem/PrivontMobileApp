import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import Members from '../screens/MembersScreens/MembersScreen';
import ReferMemberScreen from '../screens/WecomeScreens/ReferMemberScreen';
import HeaderIcon from './HeaderIcon';
import LogoTitle from './LogoTitle';
import MemberProfiles from '../screens/MembersScreens/MemberProfiles';
import RealAdminRefer from '../screens/MembersScreens/RealAdminRefer';
import RealAdminProfile from '../screens/MembersScreens/RealAdminProfile';

const Stack = createNativeStackNavigator();

const MembersNavigations = ({navigation, route}) => {
  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const initialParams = route.state
    ? route.state.routes[route.state.index].params
    : null;

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      // Navigate to the "Members" screen when the tab is focused
      navigation.navigate('Member', {initialParams: null});
    });

    return () => {
      focusListener();
    };
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Member"
      initialRouteParams={{initialParams}}>
      <Stack.Screen
        name="Member"
        component={Members}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
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
          headerLeft: () => (
            <HeaderIcon
              marginLeft={20}
              name="arrow-back-ios-new"
              onPress={handleBackPress}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ReferMemberScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MemberProfiles"
        component={MemberProfiles}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RealAdminRefer"
        component={RealAdminRefer}
        options={{
          headerShown: false,
          // title: 'Refer Members',
          // headerStyle: {
          //   backgroundColor: '#212121',
          // },
          // headerTintColor: '#f4f4f4',
        }}
      />
      <Stack.Screen
        name="RealAdminProfile"
        component={RealAdminProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MembersNavigations;
