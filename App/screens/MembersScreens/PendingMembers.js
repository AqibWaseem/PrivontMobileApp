import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from '../../components/AppText';
import colors from '../../config/colors';

const PendingMembers = React.memo(({item, onPress}) => {
  const timestamp = item?.EntryDateTime
    ? parseInt(item.EntryDateTime.match(/\d+/)[0])
    : null;
  const dateObject = new Date(timestamp);
  const formattedDate = `${
    dateObject.getMonth() + 1
  }/${dateObject.getDate()}/${dateObject.getFullYear()}`;

  const updatedItem = {
    ...item,
    isPending: true,
    formattedDate,
    referal: 'Referral',
  };

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
          <TouchableOpacity onPress={onPress}>
            <AppText style={styles.title}>
              {updatedItem.FirstName} {updatedItem.LastName}
            </AppText>
            {updatedItem.formattedDate && (
              <AppText style={styles.smallText}>
                {updatedItem.formattedDate} - {updatedItem.referal}
              </AppText>
            )}
          </TouchableOpacity>
        </View>
        {updatedItem.isPending && (
          <AppText style={styles.pendingText}>Pending</AppText>
        )}
      </View>
      <View style={styles.separator} />
    </>
  );
});
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
    marginLeft: 5,
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
    width: 90,
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

export default PendingMembers;
