// AppNavigator.js

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import YourScreen from './YourScreen'; // Adjust the path

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="YourScreen" component={YourScreen} />
      {/* Add more screens if needed */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
