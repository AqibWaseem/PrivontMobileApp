// import React, {useEffect, useState} from 'react';
// import {StyleSheet, Text, View, TextInput} from 'react-native';
// import axios from 'axios';
// import Loader from '../utilities/Loader';
// import BaseUrl from '../config/BaseUrl';

// const ApiConfiguration = () => {
//   const [apiConfigInfo, setApiConfigInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [text, setText] = useState('');
//   console.log(text);
//   const GetAPIConfigInfo = async () => {
//     try {
//       const response = await axios.get(
//         `${BaseUrl}MemberAPIs/GetAPIConfigInfo?RealEstateID=1`,
//       );
//       setApiConfigInfo(response.data.Data);
//     } catch (error) {
//       console.error('Error fetching API configuration data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     GetAPIConfigInfo();
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <View style={{flex: 1}}>
//           <Text style={{fontSize: 28, fontWeight: 'bold'}}>
//             ApiConfiguration
//           </Text>
//           {apiConfigInfo && apiConfigInfo.length > 0 ? (
//             apiConfigInfo.map((config, index) => (
//               <>
//                 <View
//                   style={{
//                     marginHorizontal: 5,
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     // justifyContent: 'space-evenly',
//                     flexWrap: 'wrap',
//                   }}
//                   key={index}>
//                   <Text>{config.TypeID}</Text>
//                   <Text style={{marginHorizontal: 10}}>
//                     {config.APITypeTitle}
//                   </Text>
//                   <TextInput
//                     style={styles.textInput}
//                     value={config.APIConfig}
//                     onChangeText={text => setText(text)}
//                   />
//                 </View>
//               </>
//             ))
//           ) : (
//             <Text style={{color: 'red'}}>No Data Found </Text>
//           )}
//         </View>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   textInput: {
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginVertical: 5,
//     padding: 8,
//     width: '65%',
//   },
// });

// export default ApiConfiguration;

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Loader from '../utilities/Loader';
import BaseUrl from '../config/BaseUrl';
import colors from '../config/colors';

const ApiConfiguration = () => {
  const [apiConfigInfo, setApiConfigInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [textValues, setTextValues] = useState([]); // State to store text values

  const GetAPIConfigInfo = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}MemberAPIs/GetAPIConfigInfo?RealEstateID=1`,
      );
      setApiConfigInfo(response.data.Data);

      // Initialize textValues array with initial values from the API
      setTextValues(response.data.Data.map(config => config.APIConfig || ''));
    } catch (error) {
      console.error('Error fetching API configuration data:', error);
    } finally {
      setLoading(false);
    }
  };

  const PostAPIConfigInfo = async () => {
    setLoading(true);
    console.log(apiConfigInfo);
    const postData = apiConfigInfo.map((config, index) => ({
      RealEstateID: config.RealEstateID,
      TypeID: config.TypeID,
      APITypeTitle: config.APITypeTitle,
      APIConfig: textValues[index],
    }));
    console.log('Hello', postData);
    try {
      const response = await axios.post(
        `${BaseUrl}MemberAPIs/PostAPIConfiguration`,
        postData,
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching API configuration data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetAPIConfigInfo();
  }, []);

  const handleTextChange = (text, index) => {
    // Update the specific text value in the array
    const newTextValues = [...textValues];
    newTextValues[index] = text;
    setTextValues(newTextValues);
  };

  const saveHandler = () => {
    PostAPIConfigInfo();
  };

  const headers = ['#', 'Type', 'API Configuration (Authorization Key)'];
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={{flex: 1, backgroundColor: colors.primary}}>
          {/* <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              marginBottom: 20,
              color: colors.white,
            }}>
            Api Configuration
          </Text> */}
          {/* <View style={styles.tableRow}>
            {headers.map((header, index) => (
              <View style={styles.headerCell} key={index}>
                <Text style={styles.headerText}>{header}</Text>
              </View>
            ))}
          </View> */}
          {apiConfigInfo && apiConfigInfo.length > 0 ? (
            apiConfigInfo.map((config, index) => (
              <View
                style={{
                  marginHorizontal: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // flexWrap: 'wrap',
                }}
                key={index}>
                <Text style={{color: colors.white}}>{index + 1}</Text>
                <Text style={{marginHorizontal: 10, color: colors.white}}>
                  {config.APITypeTitle}
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={textValues[index]}
                  onChangeText={text => handleTextChange(text, index)}
                />
              </View>
            ))
          ) : (
            <Text style={{color: 'red'}}>No Data Found </Text>
          )}
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              width: '100%',
              // marginTop: 'auto',
              marginTop: 20,
            }}>
            <TouchableOpacity style={styles.saveButton} onPress={saveHandler}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    padding: 8,
    width: '65%',
    color: colors.white,
  },
  saveButton: {
    width: '35%',
    // marginLeft: 15,
    padding: 15,
    backgroundColor: 'tomato',
    borderRadius: 5,
    elevation: 5,
    marginVertical: 0,
    // marginBottom: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
});

export default ApiConfiguration;
