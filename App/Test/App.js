// // import React from 'react';
// // import AppNavigation from './App/navigation/AppNavigation';

// // const App = () => {
// //   return <AppNavigation />;
// // };

// // export default App;

// // App.js

// import * as React from 'react';
// import {View, Text, Image, Button} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// function HomeScreen() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// function LogoTitle() {
//   return (
//     <Image
//       style={{width: 50, height: 50}}
//       source={require('./App/assets/profile.png')}
//     />
//   );
// }

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             title: 'My home',
//             headerStyle: {backgroundColor: '#000'},
//             headerTintColor: '#fff',
//             headerTitle: props => <LogoTitle {...props} />,
//             headerRight: () => (
//               <Button
//                 onPress={() => alert('This is a button!')}
//                 title="Info"
//                 color="#fff"
//               />
//             ),
//             headerLeft: () => (
//               <>
//                 <Button
//                   onPress={() => alert('This is a button!')}
//                   title="Info"
//                   color="#fff"
//                 />
//                 <Text>{'                           '}</Text>
//               </>
//             ),
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
