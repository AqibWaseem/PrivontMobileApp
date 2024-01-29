import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import {showToastWithGravityAndOffset} from '../../utilities/ToastMessage';
import axios from 'axios';

const AllMembers = React.memo(({item, onPress}) => {
  const [disabled, setDisabled] = useState(false);
  const navigation = useNavigation();
  const allowed = item.IsClaimedByLender === 1;
  const LeadID = item.LeadID;
  let {UserType, UserID} = useSelector(state => state.user.data);

  // console.log(UserType);
  // UserType = 3;
  const timestamp = item?.EntryDateTime
    ? parseInt(item.EntryDateTime.match(/\d+/)[0])
    : null;
  useEffect(() => {}, [disabled]);
  const dateObject = new Date(timestamp);
  const formattedDate = `${
    dateObject.getMonth() + 1
  }/${dateObject.getDate()}/${dateObject.getFullYear()}`;

  const updatedItem = {
    ...item,
    isPending: item.isClaimLead === null || item.isClaimLead === 0,
    isApproved: item.isClaimLead === 1,
    formattedDate,
    join: true,
    referal: 'Referral',
  };
  const headerTitle = item.IsClaimedByLender === 1 ? 'New Member' : '';

  const handleClaim = async () => {
    try {
      const response = await axios.get(
        `https://sandbox.privont.com/LeadInfo/PostClaimedLead?LeadID=${LeadID}&LenderID=${UserID}`,
      );
      if (response.data.Status === 200) {
        setDisabled(true);
        showToastWithGravityAndOffset('Claimed Successfully !!');
      }
      if (response.data.Status === 404) {
        showToastWithGravityAndOffset('Lead not Exist');
        setDisabled(false);
      }
    } catch (error) {
      console.error('Error fetching All Members data:', error);
    }
  };
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
          {item.IsClaimedByLender === 1 && (
            <AppText style={[styles.smallText2]}>{headerTitle}</AppText>
          )}
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

        {/* {updatedItem.isPending && (
         
        )} */}

        {updatedItem.isApproved && (
          <AppText style={styles.approvedText}>Approved</AppText>
        )}

        {updatedItem.join && UserType === 2 && (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <AppText style={styles.pendingText}>Pending</AppText>
            </View>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => navigation.navigate('RealAdminRefer', {item})}>
              <AppText style={styles.joinButtonText}>REFER</AppText>
            </TouchableOpacity>
          </View>
        )}
        {updatedItem.join && UserType === 3 && (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <AppText style={styles.pendingText}>Pending</AppText>
            </View>
            <TouchableOpacity
              style={[
                styles.joinButton,
                allowed || disabled ? styles.disabledButton : null,
              ]}
              onPress={handleClaim}
              disabled={allowed || disabled}>
              <AppText style={styles.joinButtonText}>CLAIM</AppText>
            </TouchableOpacity>
          </View>
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
  smallText2: {
    fontSize: 13,
    marginLeft: 5,
    color: colors.pink,
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
    marginBottom: 15,
  },
  completedText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  joinButton: {
    borderRadius: 2,
    width: 100,
    height: 30,
    backgroundColor: colors.blue,
  },
  joinButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 14,
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
  disabledButton: {
    backgroundColor: 'gray', // Set the color for disabled state
  },
});

export default AllMembers;
