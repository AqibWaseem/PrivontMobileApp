import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../../../components/AppText';
import colors from '../../../config/colors';
import {
  AllLenderInfo,
  GetFavLender,
  selectGetFavLender,
} from '../../../store/userSlice';
import FavoriteList from './FavoriteList';
import AnimatedLoader from '../../../utilities/AnimatedLoader';

const MyCircleFavLender = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true); // Set loading to true when starting to fetch data
        await dispatch(GetFavLender());
        const UserID = JSON.parse(await AsyncStorage.getItem('UserID'));
        await dispatch(AllLenderInfo({UserID}));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data has been fetched or if there's an error
      }
    };

    fetchData();
  }, [dispatch, flag]);
  const FavLenders = useSelector(selectGetFavLender);

  const renderListItem = ({item}) => (
    <FavoriteList
      item={item}
      onPress={() => navigation.navigate('MyCircleProfile', {item})}
      setFlag={setFlag}
      flag={flag}
    />
  );
  const renderNoResults = () =>
    loading === false ? (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <AppText
          style={{
            color: 'red',
            fontSize: 18,
            marginHorizontal: '8%',
            textAlign: 'center',
          }}>
          No Members found.
        </AppText>
      </View>
    ) : null;
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(GetFavLender()).then(() => setRefreshing(false));
  };
  return (
    <View style={styles.container}>
      <AppText
        style={{
          color: '#dd604c',
          fontSize: 20,
          marginHorizontal: '8%',
          marginBottom: 20,
          fontWeight: 'bold',
          marginTop: 20,
          //   alignSelf: 'center',
        }}>
        Add to Favorite
      </AppText>
      {loading && <ActivityIndicator size="large" color={'#808080'} />}
      <FlatList
        data={FavLenders}
        renderItem={renderListItem}
        keyExtractor={item => item.LenderId.toString()}
        ListEmptyComponent={renderNoResults}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  label: {
    color: colors.white,
    fontSize: 20,
    marginHorizontal: '8%',
  },
  scrollViewContainer: {
    paddingHorizontal: 10,
  },
  filterRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  pencilButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 40,
    borderColor: colors.white,
    borderWidth: 2,
    padding: 20,
    elevation: 10,
  },
});

export default MyCircleFavLender;
