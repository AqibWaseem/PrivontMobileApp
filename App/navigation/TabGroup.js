import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import DashboardNavigation from './DashboardNavigation';
import HeaderIcon from './HeaderIcon';
import HomeScreenGroup from './HomeScreenGroup';
import MembersNavigations from './MembersNavigations';
import ProfileScreenNavigation from './ProfileScreenNavigation';
import NotificationsGroup from './NotificationsGroup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const UserType = 4;

const TabGroup = ({navigation, route}) => {
  const [UserType, setUserType] = useState(0);
  const {initialRoute} = route.params || {};
  console.log('UserType Tab', UserType);

  useEffect(() => {
    const hello = async () => {
      const UserType = JSON.parse(await AsyncStorage.getItem('UserType'));
      setUserType(UserType);
    };
    hello();
  }, []);

  const handleBackPress = () => {
    navigation.goBack('Home');
  };

  return (
    <>
      {UserType === 2 && (
        <Tab.Navigator
          initialRouteName={initialRoute || 'Home'}
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#212121',
              height: 55,
            },
            tabBarActiveTintColor: '#e5634d',
            tabBarInactiveTintColor: 'grey',
            headerShown: true,
            tabBarHideOnKeyboard: true,
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreenGroup}
            options={{
              headerShown: false,
              tabBarStyle: {display: 'none'},
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="house" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="Members"
            component={MembersNavigations}
            options={{
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="bookmark" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />

          <Tab.Screen
            name="DashboardNavigation"
            component={DashboardNavigation}
            options={{
              title: 'Dashboard',
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="message" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />

          <Tab.Screen
            name="Notification"
            component={NotificationsGroup}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="bell" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="Profile"
            component={ProfileScreenNavigation}
            options={{
              tabBarStyle: {display: 'none'},
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="user" color={color} size={size} />
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
        </Tab.Navigator>
      )}
      {(UserType == 4 || UserType == 5 || UserType == 3) && (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#212121',
              height: 55,
            },
            tabBarActiveTintColor: '#e5634d',
            tabBarInactiveTintColor: 'grey',
            headerShown: true,
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreenGroup}
            options={{
              headerShown: false,
              tabBarStyle: {display: 'none'},
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="house" color={color} size={size} />
              ),
            }}
          />
          {UserType == 3 && (
            <Tab.Screen
              name="Members"
              component={MembersNavigations}
              options={{
                tabBarIcon: ({color, size}) => (
                  <FontAwesome name="bookmark" color={color} size={size} />
                ),
                headerShown: false,
              }}
            />
          )}

          <Tab.Screen
            name="DashboardNavigation"
            component={DashboardNavigation}
            options={{
              title: 'Directory',
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="message" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Notification"
            component={NotificationsGroup}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="bell" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="Profile"
            component={ProfileScreenNavigation}
            options={{
              tabBarStyle: {display: 'none'},
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="user" color={color} size={size} />
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
        </Tab.Navigator>
      )}
    </>
  );
};

export default TabGroup;
