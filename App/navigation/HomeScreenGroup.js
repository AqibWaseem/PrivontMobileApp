import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import HomeScreen from '../screens/HomeScreen';
import MyCardScreen from '../screens/WecomeScreens/MyCardScreen';
import ReferMemberScreen from '../screens/WecomeScreens/ReferMemberScreen';
import MemberProfileScreen from '../screens/DashBoardScreens/MemberProfileScreen';
import DigitalBusinessCard from '../screens/WecomeScreens/DigitalBusinessCard';
import QrScanner from '../screens/QrScanner';

const Stack = createNativeStackNavigator();

function HomeScreenGroup({navigation, route}) {
  const initialParams = route.state
    ? route.state.routes[route.state.index].params
    : null;

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      // Navigate to the "Members" screen when the tab is focused
      navigation.navigate('HomeScreen', {initialParams: null});
    });

    return () => {
      focusListener();
    };
  }, [navigation]);
  return (
    <Stack.Navigator
      options={{headerShown: false}}
      initialRouteParams={{initialParams}}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyCardScreen"
        component={MyCardScreen}
        options={{
          // title: 'My Card',
          // headerTintColor: '#f4f4f4',
          // headerStyle: {
          //   backgroundColor: '#212121',
          // },
          // headerTitleAlign: 'center',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReferMemberScreen"
        component={ReferMemberScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MemberProfileScreen"
        component={MemberProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DigitalBusinessCard"
        component={DigitalBusinessCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QrScanner"
        component={QrScanner}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeScreenGroup;
