import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with your actual icon library
import AppText from '../../../components/AppText';
import ProfileButton from '../../../components/ProfileButton';
import colors from '../../../config/colors';
import {showToastWithGravityAndOffset} from '../../../utilities/ToastMessage';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetFeaturedVendors,
  UsersReview,
  selectVendorID,
} from '../../../store/userSlice';
import AnimatedLoader from '../../../utilities/AnimatedLoader';
import BaseUrl from '../../../config/BaseUrl';

const WriteReview = ({route, navigation}) => {
  const VendorID = useSelector(selectVendorID);
  // const setFlagReview = route.params.setFlagReview;
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const hello = async () => {
      const UserType = await AsyncStorage.getItem('UserType');
      const UserID = await AsyncStorage.getItem('UserID');
      // console.log('UserReviews', UserID, UserType, VendorID);
      // console.log('flag', flag);
      if (flag === true) {
        dispatch(UsersReview({UserType, UserID, VendorID}));
        await dispatch(GetFeaturedVendors());
        navigation.goBack('Reviews');
      }
    };
    hello();
  }, [flag, dispatch]);

  const handleStarPress = selectedRating => {
    setRating(selectedRating);
  };
  const clearText = () => {
    setDescription('');
  };

  const onPressHandler = async () => {
    const UserType = await AsyncStorage.getItem('UserType');
    const UserID = await AsyncStorage.getItem('UserID');
    try {
      setLoading(true);
      const response = await axios.post(
        `${BaseUrl}FeedBackInfo/PostFeedBackInfo`,
        {
          FeedbackTitle: title,
          Remarks: description,
          UserID: VendorID,
          UserType: 5,
          EntryUserID: UserID,
          EntryUserTypeID: UserType,
          Rating: rating,
        },
      );
      // console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error);
      showToastWithGravityAndOffset('An error occurred. Please try again.');
    } finally {
      // Any cleanup or additional logic
      setLoading(false);
      setFlag(true);
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.primary}}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/Fahad.jpg')}
          style={styles.profilePic}
        />

        <View style={{alignItems: 'center'}}>
          {/* Stars Section */}
          <View style={{flexDirection: 'row', marginTop: 20}}>
            {[1, 2, 3, 4, 5].map(starValue => (
              <TouchableOpacity
                key={starValue}
                onPress={() => handleStarPress(starValue)}
                activeOpacity={0.7}
                style={{marginHorizontal: 6}}>
                <Icon
                  name={
                    rating >= starValue
                      ? 'star'
                      : rating >= starValue - 0.5
                      ? 'star-half-empty'
                      : 'star-o'
                  }
                  size={30}
                  color={'yellow'} // You can customize the color based on your preference
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Rating Text */}
          <AppText style={{marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>
            Tap a star to rate
          </AppText>
          {/* <AppText style={{marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>
            {rating > 0 ? `You rated: ${rating} stars` : ''}
          </AppText> */}
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <AppText style={{marginLeft: 35}}>Title</AppText>
        <View
          style={{
            backgroundColor: '#494949',
            borderRadius: 10,
            width: '85%',
            marginVertical: 10,
            marginHorizontal: '8%',
          }}>
          <TextInput
            style={styles.inputStyles}
            placeholderTextColor="gray"
            textAlignVertical="top"
            value={title}
            onChangeText={newText => setTitle(newText)}
          />
        </View>
        {title.length > 0 && (
          <TouchableOpacity
            onPress={() => setTitle('')}
            style={styles.closeButton}>
            <AppText style={{color: '#fff', fontSize: 18}}>X</AppText>
          </TouchableOpacity>
        )}
        <AppText style={{marginLeft: 35, marginTop: 10}}>Description</AppText>
        <View>
          <TextInput
            style={styles.inputStylesDiscription}
            placeholderTextColor="gray"
            textAlignVertical="top"
            multiline={true}
            value={description}
            onChangeText={newText => setDescription(newText)}
          />
          {description.length > 0 && (
            <TouchableOpacity onPress={clearText} style={styles.closeButton}>
              <AppText style={{color: '#fff', fontSize: 18}}>X</AppText>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ProfileButton
        title="Submit"
        color="secondary"
        width="85%"
        marginHorizontal={30}
        marginVertical="10%"
        borderRadius={10}
        onPress={onPressHandler}
      />
      {loading && <ActivityIndicator size="large" color={'#808080'} />}
    </ScrollView>
  );
};

export default WriteReview;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: colors.primary,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 5,
  },
  ratingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  inputStylesDiscription: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    height: 110,
    width: '85%',
    marginLeft: 30,
    backgroundColor: '#494949',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: '8%',
  },
  closeButton: {
    position: 'absolute',
    top: 45,
    right: 50,
  },
  textInput: {
    color: '#fff',
    borderWidth: 1,
  },
});
