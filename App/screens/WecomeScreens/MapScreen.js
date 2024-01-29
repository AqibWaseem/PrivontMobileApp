// import React, {useState, useEffect, useRef} from 'react';
// import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import {showToastWithGravityAndOffset} from '../../utilities/ToastMessage';

// const MapScreen = ({route, navigation}) => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setCurrentLocation({latitude, longitude});
//       },
//       error => {
//         showToastWithGravityAndOffset('Turn On Your Mobile Location !!');
//         if (error.code === 3) {
//           showToastWithGravityAndOffset(
//             'Location request timed out. Please try again.',
//           );
//         } else {
//           showToastWithGravityAndOffset(
//             'Error getting location. Please check your device settings.',
//           );
//         }
//       },
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
//     );
//   };

//   const handleMapPress = event => {
//     // Get the coordinates of the selected location
//     const {coordinate} = event.nativeEvent;
//     setSelectedLocation(coordinate);
//   };

//   const handleSaveLocation = () => {
//     // Pass the selected location back to the previous screen
//     const locationToPass = selectedLocation || currentLocation;
//     navigation.navigate('EditProfile', {location: locationToPass});
//   };

//   const handleFocusOnCurrentLocation = () => {
//     // Focus on the current location on the map
//     if (currentLocation) {
//       mapRef.current.animateToRegion({
//         ...currentLocation,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         onPress={handleMapPress}
//         initialRegion={{
//           latitude: currentLocation ? currentLocation.latitude : 37.78825,
//           longitude: currentLocation ? currentLocation.longitude : -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}>
//         {currentLocation && (
//           <Marker coordinate={currentLocation} pinColor="green" />
//         )}
//         {selectedLocation && <Marker coordinate={selectedLocation} />}
//       </MapView>
//       <TouchableOpacity
//         style={styles.currentLocationButton}
//         onPress={handleFocusOnCurrentLocation}>
//         <Text style={styles.currentLocationButtonText}>Current Location</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
//         <Text style={styles.saveButtonText}>Save Location</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   currentLocationButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     padding: 10,
//     backgroundColor: 'tomato',
//     borderRadius: 5,
//     elevation: 5,
//   },
//   currentLocationButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   saveButton: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     padding: 10,
//     backgroundColor: 'blue',
//     borderRadius: 5,
//   },
//   saveButtonText: {
//     color: 'white',
//   },
// });

// export default MapScreen;

// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   ActivityIndicator,
// } from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import {showToastWithGravityAndOffset} from '../../utilities/ToastMessage';
// import {PermissionsAndroid, Platform} from 'react-native';

// const MapScreen = ({route, navigation}) => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [isLoadingLocation, setIsLoadingLocation] = useState(false);
//   const mapRef = useRef(null);

//   async function requestLocationPermission() {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Location permission granted');
//           getCurrentLocation();
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       } finally {
//         handleFocusOnCurrentLocation();
//       }
//     } else {
//       getCurrentLocation(); // Directly fetch location in iOS
//     }
//   }
//   useEffect(() => {
//     requestLocationPermission();
//     // getCurrentLocation();
//   }, []);

//   const getCurrentLocation = () => {
//     setIsLoadingLocation(true);
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setCurrentLocation({latitude, longitude});
//         setIsLoadingLocation(false);

//         // Set loading to false after successfully fetching location
//       },
//       error => {
//         // showToastWithGravityAndOffset('Turn On Your Mobile Location !!');
//         if (error.code === 3) {
//           showToastWithGravityAndOffset(
//             'Location request timed out. Please try again.',
//           );
//         } else {
//           showToastWithGravityAndOffset('Please check your device settings.');
//         }
//         setIsLoadingLocation(false); // Set loading to false after encountering an error
//       },
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
//       {handleFocusOnCurrentLocation},
//     );
//   };

//   const handleMapPress = event => {
//     // Get the coordinates of the selected location
//     const {coordinate} = event.nativeEvent;
//     setSelectedLocation(coordinate);
//   };

//   const handleSaveLocation = () => {
//     // Pass the selected location back to the previous screen
//     const locationToPass = selectedLocation || currentLocation;
//     navigation.navigate('EditProfile', {location: locationToPass});
//   };

//   const handleFocusOnCurrentLocation = () => {
//     // Focus on the current location on the map
//     if (currentLocation) {
//       mapRef.current.animateToRegion({
//         ...currentLocation,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         onPress={handleMapPress}
//         initialRegion={{
//           latitude: currentLocation ? currentLocation.latitude : 37.78825,
//           longitude: currentLocation ? currentLocation.longitude : -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}>
//         {currentLocation && (
//           <Marker coordinate={currentLocation} pinColor="green" />
//         )}
//         {selectedLocation && <Marker coordinate={selectedLocation} />}
//       </MapView>
//       {isLoadingLocation && (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color="blue" />
//         </View>
//       )}
//       <TouchableOpacity
//         style={styles.currentLocationButton}
//         onPress={handleFocusOnCurrentLocation}>
//         <Text style={styles.currentLocationButtonText}>Current Location</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
//         <Text style={styles.saveButtonText}>Save Location</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   loaderContainer: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//   },
//   currentLocationButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     padding: 10,
//     backgroundColor: 'tomato',
//     borderRadius: 5,
//     elevation: 5,
//   },
//   currentLocationButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   saveButton: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     padding: 10,
//     backgroundColor: 'blue',
//     borderRadius: 5,
//   },
//   saveButtonText: {
//     color: 'white',
//   },
// });

// export default MapScreen;

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Linking,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {showToastWithGravityAndOffset} from '../../utilities/ToastMessage';
import {PermissionsAndroid, Platform} from 'react-native';

const MapScreen = ({route, navigation}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation(); // Directly fetch location in iOS
    }
  }

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(position);
        setCurrentLocation({latitude, longitude});
        mapRef.current.animateCamera({
          center: {
            latitude: latitude,
            longitude: longitude,
          },
          zoom: 15,
          altitude: 500,
          pitch: 45,
          heading: 90,
          duration: 1000,
        });

        setIsLoadingLocation(false);
      },
      error => {
        if (error.code === 3) {
          showToastWithGravityAndOffset(
            'Location request timed out. Please try again.',
          );
        } else {
          showToastWithGravityAndOffset('Open device Location !!');
        }
        setIsLoadingLocation(false);
      },
      // Platform.OS === 'android'
      // ? {enableHighAccuracy: true},
      //   : {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
      {enableHighAccuracy: false},
    );
  };

  const handleMapPress = event => {
    const {coordinate} = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  const handleSaveLocation = () => {
    const locationToPass = selectedLocation || currentLocation;
    navigation.navigate('EditProfile', {location: locationToPass});
  };

  const handleFocusOnCurrentLocation = () => {
    if (currentLocation) {
      mapRef.current.animateToRegion({
        ...currentLocation,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } else {
      showToastWithGravityAndOffset('Unable to get Current Location !!');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 37.78825,
          longitude: currentLocation ? currentLocation.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            pinColor="plum" // Set the pinColor to blue
            title="YOUR LOCATION" // Set the title if needed
            description="Boom !! We Have Your Location"
          />
        )}
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      {isLoadingLocation && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      <TouchableOpacity
        style={styles.currentLocationButton}
        onPress={handleFocusOnCurrentLocation}>
        <Text style={styles.currentLocationButtonText}>
          Go To Current Location
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
        <Text style={styles.saveButtonText}>Save Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  currentLocationButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'tomato',
    borderRadius: 5,
    elevation: 5,
  },
  currentLocationButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
  },
});

export default MapScreen;
