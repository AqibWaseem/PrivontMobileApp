import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import DashboardScreen from '../screens/DashBoardScreens/DashboardScreen';
import HomeScreen from '../screens/HomeScreen';
import Members from '../screens/MembersScreens/MembersScreen';
import MyCardScreen from '../screens/WecomeScreens/MyCardScreen';
import Notifications from '../screens/Notifications';
import ReferMemberScreen from '../screens/WecomeScreens/ReferMemberScreen';
import WelcomeScreen from '../screens/WecomeScreens/WelcomeScreen';
import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const NotificationIcon = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={{marginRight: 15}}>
    <MaterialIcons name="notifications" size={32} color="white" />
  </TouchableOpacity>
);
const BackArrow = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={{marginRight: 15}}>
    <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
  </TouchableOpacity>
);

function LogoTitle() {
  const [searchText, setSearchText] = useState('');
  const handleSearch = () => {
    // Implement your search logic here
    // console.log('Searching for:', searchText);
  };
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search... whatever you search ok h"
        placeholderTextColor={colors.white}
        onChangeText={text => setSearchText(text)}
        value={searchText}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
}

function TabGroup({route}) {
  const {initialRoute} = route.params || {};
  const navigation = useNavigation();

  const handleBackPress = () => {
    // Navigate to the Welcome screen or any other screen as needed
    navigation.goBack('WelcomeSceen');
  };

  return (
    <Tab.Navigator
      initialRouteName={initialRoute || 'Dashboard'}
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
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="house" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Members"
        component={Members}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="bookmark" color={color} size={size} />
          ),
          headerRight: () => (
            <NotificationIcon onPress={() => console.log('hello')} />
          ),
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTintColor: '#f4f4f4',
          headerLeft: () => <BackArrow onPress={handleBackPress} />,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="message" color={color} size={size} />
          ),
          title: 'Directory',
          headerTintColor: '#f4f4f4',
          headerRight: () => (
            <NotificationIcon onPress={() => console.log('hello')} />
          ),
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerLeft: () => <BackArrow onPress={handleBackPress} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="bell" color={color} size={size} />
          ),
          headerRight: () => (
            <NotificationIcon onPress={() => console.log('hello')} />
          ),
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTintColor: '#f4f4f4',
          headerLeft: () => <BackArrow onPress={handleBackPress} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ReferMemberScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTintColor: '#f4f4f4',
        }}
      />
    </Tab.Navigator>
  );
}

function StackGroup() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          title: 'Directory',
          headerTintColor: '#f4f4f4',
          headerTitleAlign: 'center',
          headerRight: () => (
            <NotificationIcon onPress={() => console.log('hello')} />
          ),
          headerStyle: {
            backgroundColor: '#212121',
          },
        }}
      />
      <Stack.Screen
        name="MyCardScreen"
        component={MyCardScreen}
        options={{title: 'My Card'}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ReferMemberScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="StackGroup" component={StackGroup} />
      <Stack.Screen name="TabGroup" component={TabGroup} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;
const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    marginLeft: 10,
    marginTop: 8,
    // paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: '#fff',
  },
});
