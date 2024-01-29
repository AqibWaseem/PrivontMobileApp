import React from 'react';
import AppNavigation from './App/navigation/AppNavigation';
import {Provider} from 'react-redux';
import store from './App/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;

// import React from 'react';
// import EditProfileScreen from './App/screens/WecomeScreens/EditProfileScreen';

// const App = () => {
//   return <EditProfileScreen />;
// };

// export default App;

// import React from 'react';
// import Profile from './App/screens/WecomeScreens/Profile';

// const App = () => {
//   return <Profile />;
// };

// export default App;

// import React from 'react';
// import PaymentCard from './App/screens/WecomeScreens/PaymentCard';

// const App = () => {
//   return <PaymentCard />;
// };

// export default App;

// import React from 'react';
// import PaymentCard from './App/screens/WecomeScreens/PaymentCard';
// import SecurePayment from './App/screens/WecomeScreens/SecurePayment';

// const App = () => {
//   return <SecurePayment />;
// };

// export default App;

// import React from 'react';
// import PaymentCard from './App/screens/WecomeScreens/PaymentCard';
// import DigitalBusinessCard from './App/screens/WecomeScreens/DigitalBusinessCard';

// const App = () => {
//   return <DigitalBusinessCard />;
// };

// export default App;

// import React from 'react';
// import WriteReview from './App/screens/WriteReview';

// const App = () => {
//   return <WriteReview />;
// };

// export default App;
// import React, {useState} from 'react';
// import {View, Text} from 'react-native';
// import CustomDropdownPicker from './App/Test/CustomDropdownPicker'; // Adjust the path

// const App = () => {
//   const options = ['Option 1', 'Option 2', 'Option 3'];
//   const options2 = ['Option A', 'Option B', 'Option C']; // Example different options
//   const [selectedValue1, setSelectedValue1] = useState('');
//   const [selectedValue2, setSelectedValue2] = useState('');

//   const handleSelect1 = value => {
//     setSelectedValue1(value);
//   };

//   const handleSelect2 = value => {
//     setSelectedValue2(value);
//   };

//   return (
//     <View style={{backgroundColor: '#000', flex: 1}}>
//       <Text>Selected Value (Dropdown 1): {selectedValue1}</Text>
//       <CustomDropdownPicker
//         options={options}
//         onSelect={handleSelect1}
//         selectedValue={selectedValue1}
//         zIndex={2}
//       />

//       <CustomDropdownPicker
//         options={options2}
//         onSelect={handleSelect2}
//         selectedValue={selectedValue2}
//         zIndex={1}
//       />
//     </View>
//   );
// };

// export default App;

// import React from 'react';
// import AppNavigation from './App/navigation/AppNavigation';
// import {Provider} from 'react-redux';
// import store from './App/store/store';
// import SmsFormat from './App/Test/SmsFormat';

// const App = () => {
//   return <SmsFormat />;
// };

// export default App;
// import React from 'react';
// import AppNavigation from './App/navigation/AppNavigation';
// import {Provider} from 'react-redux';
// import store from './App/store/store';
// import SearchablePicker from './App/Test/SearchablePicker';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <SearchablePicker />
//     </Provider>
//   );
// };

// export default App;
