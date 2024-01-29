import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import AppText from '../../components/AppText';
import colors from '../../config/colors';
import RatingScreen from '../RatingScreen';

const ProfileListItem = ({item, onPress, firstName}) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.featuredContainer}>
        {!item.isCompleted && (
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/modern-furniture-designs.jpg')}
              style={styles.image}
            />
          </View>
        )}

        <View style={styles.featuredDiscription}>
          {item.newMember && (
            <AppText style={styles.smallText}>{item.newMember}</AppText>
          )}
          <AppText style={styles.title}>
            {item.FirstName} {item.LastName}
          </AppText>
          {item.Remarks && (
            <AppText style={styles.description}>{item.Remarks}</AppText>
          )}
          {item.date && <AppText style={styles.smallText}>{item.date}</AppText>}
          {item.ids && <AppText style={styles.smallText}>{item.ids}</AppText>}
          <View style={styles.rating}>
            <AppText style={styles.ratingText}>{item.AverageRating}</AppText>
            <RatingScreen value={item.AverageRating} color="#e5634d" />
            <AppText style={styles.ratingUsers}>({item.TotalFeedBack})</AppText>
          </View>
        </View>

        <View style={styles.joinButton} onPress={() => console.log('first')}>
          <AppText style={styles.joinButtonText}>
            {firstName} <Feather name="check" size={20} color="green" />
          </AppText>
        </View>
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
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    marginLeft: 3,
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
    backgroundColor: colors.pink,
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
    width: 80,
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
  },
  joinButtonText: {
    color: '#1a63a4',
    alignSelf: 'center',
    fontSize: 12,
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

export default ProfileListItem;
