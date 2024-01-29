import React from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../../components/AppText';
import RatingScreen from '../../RatingScreen';
import colors from '../../../config/colors';
import {useNavigation} from '@react-navigation/native';

const PendingListItem = ({item, onPress}) => {
  // console.log(item);
  const updatedItem = {
    ...item,
    // rating: 4.5,
    // users: 20,
    isPending: true,
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
              <AppText style={styles.ratingText}>
                {updatedItem.AverageRating}
              </AppText>
              <RatingScreen value={updatedItem.AverageRating} color="#e5634d" />
              <AppText style={styles.ratingUsers}>
                ({updatedItem.TotalFeedBack})
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

        {updatedItem.isPending && (
          <AppText style={styles.pendingText}>Pending</AppText>
        )}
        {updatedItem.isCompleted && (
          <AppText style={styles.completedText}>Completed</AppText>
        )}

        {updatedItem.isApproved && (
          <AppText style={styles.approvedText}>Approved</AppText>
        )}

        {updatedItem.isJoin && (
          <View style={styles.joinButton} onPress={() => console.log('first')}>
            <AppText style={styles.joinButtonText}>
              My Circle <Feather name="check" size={20} color="green" />
            </AppText>
          </View>
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
    shadowColor: '#212121',
    borderRadius: 10,
    borderWidth: 1,
    borderBottomColor: '#000',
    borderBottomWidth: 5,
    borderRightColor: '#000',
    borderRightWidth: 5,
    width: 95,
    height: 32,
    backgroundColor: '#212121',
    // marginLeft: 10,
  },
  joinButtonText: {
    color: '#1a63a4',
    alignSelf: 'center',
    fontSize: 12,
  },
  arrowButton: {
    width: 70,
    height: 30,
    marginLeft: 25,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default PendingListItem;
