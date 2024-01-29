import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import RatingScreen from '../RatingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BaseUrl from '../../config/BaseUrl';
import {useSelector} from 'react-redux';
import Loader from '../../utilities/Loader';

const DashboardScreen = ({navigation}) => {
  let {UserType, UserID} = useSelector(state => state.user.data);
  const [recent, setRecent] = useState(true);
  const [selected, setSelected] = useState(true);
  const [userType, setUserType] = useState(0);
  const [recentVendors, setRecentVendors] = useState();
  const [recentTransactions, setRecentTransactions] = useState();
  const [loading, setLoading] = useState(true);
  const userData = async () => {
    setUserType(JSON.parse(await AsyncStorage.getItem('UserType')));
  };
  userData();
  const data = [
    {
      id: '1',
      newMember: 'A New Member Approved Near You',
      title: 'Mellisa Gardner Green',
      discription: 'Faiway Landing',
      rating: 4.5,
      users: 30,
      isJoin: true,
      isArrow: true,
    },
    {
      id: '2',
      title: 'Danielle HouseCleaning',
      discription: 'Danielle Smith-Vendor',
      isApproved: true,
      isPending: false,
    },
    {
      id: '3',
      title: 'Claudia Hill',
      discription: 'Evora Capital',
      rating: 5.0,
      users: 30,
      isApproved: true,
      isPending: false,
      isArrow: true,
    },
    {
      id: '4',
      title: 'ACH Deposited ',
      discription: 'Transaction ID',
      ids: 'M10232023110558798',
      isApproved: false,
      isPending: false,
      isCompleted: true,
    },
    {
      id: '5',
      title: 'Rick Carpentar ',
      discription: 'Member',
      date: '10/21/2023 - temple,TX',
      isApproved: false,
      isPending: true,
    },
  ];

  const GetRecentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}RecentsActivity/Recents?UserID=${UserID}&UserType=${UserType}`,
      );
      const {Vendors, Transaction} = response?.data;
      setRecentVendors(Vendors);
      setRecentTransactions(Transaction);
    } catch (error) {
      console.error('Error fetching All Members data:', error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(recentTransactions);
  useEffect(() => {
    GetRecentData();
  }, []);
  const renderItem = ({item}) => (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('RecentProfile', {item})}>
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
            {/* {item.newMember && ( */}
            {/* <AppText style={styles.smallText}>{item.FirstName}</AppText> */}
            {/* )} */}
            <AppText style={styles.title}>
              {item.FirstName} {item.LastName}
            </AppText>
            {item.Remarks && (
              <AppText style={styles.description}>{item.Remarks}</AppText>
            )}
            {item.date && (
              <AppText style={styles.smallText}>{item.date}</AppText>
            )}
            {item.ids && <AppText style={styles.smallText}>{item.ids}</AppText>}
            {/* {item.AverageRating && ( */}
            <View style={styles.rating}>
              <AppText style={styles.ratingText}>{item.AverageRating}</AppText>
              <RatingScreen value={item.AverageRating} color="#e5634d" />
              <AppText style={styles.ratingUsers}>
                ({item.TotalFeedBack})
              </AppText>
              {/* {item.isArrow && ( */}
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={() => navigation.navigate('RecentProfile', {item})}>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
              {/* )} */}
            </View>
            {/* )} */}
          </View>

          {!item.IsApproved && (
            <AppText style={styles.pendingText}>Pending</AppText>
          )}
          {item.isCompleted && (
            <AppText style={styles.completedText}>Completed</AppText>
          )}

          {item.IsApproved && (
            <AppText style={styles.approvedText}>Approved</AppText>
          )}

          {item.isJoin && (
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => console.log('first')}>
              <AppText style={styles.joinButtonText}>Join</AppText>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    </>
  );
  const renderItemTransaction = ({item}) => (
    <>
      <View style={styles.featuredContainer}>
        <View style={styles.featuredDiscription}>
          <AppText style={styles.title}>{item.RefNo}</AppText>
          <AppText style={styles.description}>Transaction ID</AppText>
          <AppText style={styles.smallText}>{item.TransactionNo}</AppText>
        </View>

        {item.Status === 1 && (
          <AppText style={styles.pendingText}>Pending</AppText>
        )}
        {item.Status === 2 && (
          <AppText style={styles.completedText}>Completed</AppText>
        )}

        {item.Status === 2 && (
          <AppText style={styles.approvedText}>Reject</AppText>
        )}
      </View>
      <View style={styles.separator} />
    </>
  );
  // Till Above
  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <StatusBar hidden={true} translucent backgroundColor="transparent" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '4%',
          marginTop: 10,
        }}>
        <AppButton
          title="Recent"
          onPress={() => {
            setSelected(!selected), setRecent(!recent);
          }}
          iconFont="stopwatch"
          textColor="white"
          selected={selected}
        />
        {userType !== 3 && (
          <AppButton
            title="My Circle"
            onPress={() => navigation.navigate('MyCircle')}
            iconFont1="group"
            textColor="white"
          />
        )}
        <AppButton
          title="Stats"
          onPress={() => navigation.navigate('Stats')}
          mIcons="query-stats"
          textColor="white"
        />
        <AppButton
          title="Directory"
          onPress={() => navigation.navigate('DirectoryScreen')}
          iconFont="bars"
          textColor="white"
        />
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: 'black',
          marginVertical: 10,
          width: '90%',
          marginHorizontal: '5%',
        }}></View>
      {recent && (
        <>
          <View style={{marginBottom: 10}}>
            <FlatList
              data={recentVendors}
              renderItem={renderItem}
              keyExtractor={item => item.VendorID.toString()}
            />
          </View>
          <View style={{marginTop: 10}}>
            <FlatList
              data={recentTransactions}
              renderItem={renderItemTransaction}
              keyExtractor={item => item.TransactionID.toString()}
            />
          </View>
        </>
      )}
    </View>
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
    // marginTop: 5,
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
  },
  rating: {
    flexDirection: 'row',
    marginTop: 2,
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
    fontSize: 14,
  },
  approvedText: {
    borderColor: 'green',
    borderWidth: 1,
    color: 'green',
    fontSize: 14,
    height: 26,
    paddingLeft: 7,
    paddingRight: 7,
  },
  pendingText: {
    color: colors.danger,
    fontSize: 14,
  },
  completedText: {
    color: colors.white,
    // width: 80,
    fontSize: 14,
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
    width: 70,
    height: 35,
    backgroundColor: '#212121',
    paddingBottom: 2,
  },
  joinButtonText: {
    color: '#fff',
    alignSelf: 'center',
    paddingTop: 2,
    // paddingBottom: 5,
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

export default DashboardScreen;
