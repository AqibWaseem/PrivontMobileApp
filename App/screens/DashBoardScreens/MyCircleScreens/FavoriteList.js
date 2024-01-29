import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../../components/AppText';
import RatingScreen from '../../RatingScreen';
import colors from '../../../config/colors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {showToastWithGravityAndOffset} from '../../../utilities/ToastMessage';
import BaseUrl from '../../../config/BaseUrl';

const FavoriteList = ({item, onPress, setFlag, flag}) => {
  let LenderId = item.LenderId;
  const [loading, setLoading] = useState(false);
  const [postFavorite, setPostFavorite] = useState([]);
  // console.log(item);
  const JoinHandler = async () => {
    try {
      const RealEstateAgentID = await AsyncStorage.getItem('UserID');
      const response = await axios.get(
        `${BaseUrl}LenderInfo/PostFavouriteLender?LenderID=${LenderId}&RealEstateAgentID=${RealEstateAgentID}`,
      );
      setPostFavorite(response.data.Data);
    } catch (error) {
      throw error;
    } finally {
      showToastWithGravityAndOffset('Member Added Successfully !!');
      setFlag(!flag);
    }
  };
  const updatedItem = {
    ...item,
    rating: item?.AverageRating,
    users: item?.TotalFeedBack,
    isJoin: true,
    isArrow: true,
  };

  const navigation = useNavigation();
  return (
    <>
      <View style={styles.featuredContainer}>
        {!item.isCompleted && (
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/modern-furniture-designs.jpg')}
              style={styles.image}
            />
          </View>
        )}

        <View style={styles.featuredDiscription}>
          <TouchableOpacity onPress={onPress}>
            <AppText style={styles.title}>
              {updatedItem.FirstName} {updatedItem.LastName}
            </AppText>
            {updatedItem.OrganizationTitle && (
              <AppText style={styles.description}>
                {updatedItem.OrganizationTitle}
              </AppText>
            )}
            {updatedItem.date && (
              <AppText style={styles.smallText}>{updatedItem.date}</AppText>
            )}
            {updatedItem.ids && (
              <AppText style={styles.smallText}>{updatedItem.ids}</AppText>
            )}

            <View style={styles.rating}>
              <AppText style={styles.ratingText}>{updatedItem.rating}</AppText>
              <RatingScreen value={updatedItem.rating} color="#e5634d" />
              <AppText style={styles.ratingUsers}>
                ({updatedItem.users})
              </AppText>

              <TouchableOpacity style={styles.arrowButton} onPress={onPress}>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
        {updatedItem.isJoin && (
          <TouchableOpacity style={styles.joinButton} onPress={JoinHandler}>
            <AppText style={styles.joinButtonText}>JOIN</AppText>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.separator} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  inputStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },

  featuredContainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginVertical: 10,
  },
  featuredDiscription: {
    flex: 1,
    flexDirection: 'column',
  },
  smallText: {
    fontSize: 11,
    color: '#e5e5e5',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
  },
  rating: {
    flexDirection: 'row',
    marginTop: 5,
  },
  ratingText: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#fff',
    width: '12%',
    marginLeft: 5,
    textAlign: 'center',
    height: 20,
    marginTop: 5,
    marginRight: 5,
    fontSize: 10,
  },
  ratingUsers: {
    marginLeft: 5,
    marginTop: 4,
    color: '#fff',
    fontSize: 13,
  },
  approvedText: {
    borderColor: 'green',
    borderWidth: 1,
    color: 'green',
    width: 80,
    fontSize: 14,
    height: 26,
    paddingLeft: 7,
  },
  pendingText: {
    color: colors.danger,
    width: 80,
    fontSize: 14,
    paddingLeft: 6,
    fontWeight: 'bold',
  },
  completedText: {
    color: colors.white,
    // width: 80,
    fontSize: 14,
    fontWeight: 'bold',
  },
  joinButton: {
    marginTop: 50,
    shadowRadius: 20,
    // shadowColor: '#212121',
    borderRadius: 10,
    borderWidth: 1,
    borderBottomColor: '#000',
    borderBottomWidth: 5,
    borderRightColor: '#000',
    borderRightWidth: 5,
    width: 95,
    height: 32,
    backgroundColor: '#1a63a4',
    // marginLeft: 10,
  },
  joinButtonText: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 16,
  },
  arrowButton: {
    width: 70,
    height: 30,
    marginLeft: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default FavoriteList;
