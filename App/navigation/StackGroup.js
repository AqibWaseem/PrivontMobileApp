import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Profile from '../screens/WecomeScreens/Profile';
// import HomeScreen from '../screens/HomeScreen1';
import {TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

function StackGroup({navigation}) {
  const handleBackPress = () => {
    navigation.goBack('SignIn');
  };
  return (
    <Stack.Navigator initialRouteName="SignIn" options={{headerShown: false}}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerTintColor: '#f4f4f4',
          headerStyle: {
            backgroundColor: '#212121',
            title: ' ',
          },
          headerShown: false,
          headerTitle: ' ',
        }}
      />

      {/* <Stack.Screen
        name="Login"
        component={HomeScreen}
        options={{headerShown: false}}
      /> */}

      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerTintColor: '#f4f4f4',
          headerStyle: {
            backgroundColor: '#212121',
          },
          title: ' ',
          headerLeft: () => (
            <TouchableOpacity onPress={handleBackPress}>
              <Icons name="arrow-back" size={25} color="#f4f4f4" />
            </TouchableOpacity>
          ),
          headerTitle: ' ',
          headerShown: false,
        }}
      />

      {/* <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="MyCardScreen"
        component={MyCardScreen}
        options={{
          title: 'My Card',
          headerTintColor: '#f4f4f4',
          headerStyle: {
            backgroundColor: '#212121',
          },
        }}
      />
      <Stack.Screen
        name="ReferMemberScreen"
        component={ReferMemberScreen}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default StackGroup;
