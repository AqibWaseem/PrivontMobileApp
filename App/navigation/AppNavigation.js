import React, {useEffect, useState} from 'react';
import {NavigationContainer, useLinkTo} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import StackGroup from './StackGroup';
import TabGroup from './TabGroup';
import {Linking} from 'react-native';

const Stack = createNativeStackNavigator();

// Define the linking configuration
const linking = {
  prefixes: ['https://privont.com'],
  config: {
    screens: {
      StackGroup: {
        screens: {
          SignUp: 'InvitationReference/Refer',
        },
      },
    },
  },
};

const AppNavigation = () => {
  const [appReady, setAppReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState('SignIn');
  useEffect(() => {
    // Fetch the URL used to open the app
    Linking.getInitialURL().then(url => {
      if (url) {
        // If the app is opened with a URL, determine the initial route
        const route = url.replace('https://privont.com/', '');
        if (route.startsWith('InvitationReference/Refer')) {
          setInitialRoute('SignUp');
        }
      }
    });

    setAppReady(true);
  }, []);

  useEffect(() => {
    setAppReady(true);
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!appReady ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen
              name="StackGroup"
              component={StackGroup}
              initialRouteName={initialRoute}
            />
            <Stack.Screen name="TabGroup" component={TabGroup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
