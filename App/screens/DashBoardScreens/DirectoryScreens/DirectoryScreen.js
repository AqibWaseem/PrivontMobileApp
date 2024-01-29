import {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Text,
  RefreshControl,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import colors from '../../../config/colors';
import RatingScreen from '../../RatingScreen';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetFavVendors,
  GetFeaturedVendors,
  selectGetFavVendors,
  selectGetFeaturedVendors,
} from '../../../store/userSlice';
import Loader from '../../../utilities/Loader';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {showToastWithGravityAndOffset} from '../../../utilities/ToastMessage';
import MapView, {Marker} from 'react-native-maps';

const AnimatedMapView = Animated.createAnimatedComponent(MapView);

const DirectoryScreen = ({navigation}) => {
  let {UserID, UserType} = useSelector(state => state?.user?.data);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const featuredVendor = useSelector(selectGetFeaturedVendors);
  const favVendor = useSelector(selectGetFavVendors);
  const [search, setSearch] = useState('');
  const [featured, setFeatured] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [promo, setPromo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    if (featured && favorite) {
      setLoading(true);
      setFavorite(false);
      setFeatured(true);
      setSelected(false);
      setSelectedLocation(false);
    } else {
      setLoading(false);
    }
  }, [featured, favorite, loading]);

  const filterData = data => {
    const lowerCaseSearchTerm = search ? search?.toLowerCase() : '';
    return data.filter(item =>
      item.CompanyName?.toLowerCase().includes(lowerCaseSearchTerm),
    );
  };

  const enhancedVendorInfo = featuredVendor.map(item => ({
    ...item,
    isLocal: true,
  }));
  const renderItem = ({item}) => (
    <View style={styles.featuredContainer}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('DirectoryProfile', {item})}>
          <Image
            source={require('../../../assets/modern-furniture-designs.jpg')}
            style={{
              width: 80,
              height: 80,
              marginVertical: 10,
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.featuredDiscription}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DirectoryProfile', {item})}>
          <AppText style={{fontSize: 18}}>{item?.CompanyName}</AppText>
          <AppText
            style={{
              fontSize: 14,
            }}>
            {item?.Remarks}
          </AppText>
          <View style={styles.rating}>
            <AppText
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#fff',
                width: '12%',
                textAlign: 'center',
                height: 20,
                marginTop: 7,
                marginRight: 5,
                fontSize: 11,
              }}>
              {item?.AverageRating}
            </AppText>
            <RatingScreen
              value={parseFloat(item?.AverageRating).toFixed(1.0)}
              color="#e5634d"
            />
            <AppText style={{marginTop: 5, marginLeft: 7, fontSize: 14}}>
              (<AppText style={{fontSize: 14}}>{item?.TotalFeedBack}</AppText>)
            </AppText>

            {/* {item.isLocal && (
              <AppText
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  color: 'blue',
                  width: 70,
                  fontSize: 16,
                  height: 26,
                  paddingLeft: 13,
                  alignSelf: 'center',
                  borderRadius: 5,
                  marginHorizontal: 20,
                }}>
                Local
              </AppText>
            )} */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(GetFeaturedVendors({UserType, UserID}));
    dispatch(GetFavVendors({UserType, UserID})).then(() =>
      setRefreshing(false),
    );
  };
  // Till Above
  return (
    <View style={styles.container}>
      <View style={styles.containerSearch}>
        <TextInput
          style={styles.textInputSearch}
          placeholder="Search..."
          placeholderTextColor="gray"
          onChangeText={item => setSearch(item)}
        />
      </View>
      <AppText
        style={{
          color: '#dd604c',
          fontSize: 20,
          marginHorizontal: '4%',
        }}>
        Quick Links
      </AppText>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: '4%',
          justifyContent: 'space-between',
        }}>
        <AppButton
          title="Show All"
          onPress={() => navigation.navigate('Categories')}
          iconName="bars"
          textColor="white"
        />
        <AppButton
          title={featured ? 'Favorite' : 'Featured'}
          onPress={() => {
            setFavorite(!favorite),
              setFeatured(!featured),
              setSelected(!selected),
              setShowLocation(false),
              setPromo(false);
            setLoading(!loading);
          }}
          iconName="star"
          textColor="white"
          selected={selected}
        />
        <AppButton
          title="Promo"
          onPress={() => {
            setFavorite(false),
              setFeatured(false),
              setPromo(true),
              setShowLocation(false),
              setLoading(false);
          }}
          iconFont="bullhorn"
          textColor="white"
        />
        <AppButton
          title="Location"
          onPress={() => {
            setFavorite(false);
            setFeatured(false);
            setPromo(false);
            setShowLocation(!showLocation), setSelected(false);
            setSelectedLocation(!selectedLocation);
            // Call the function to request location permission
          }}
          iconFont={'location-dot'}
          textColor="white"
          selected={selectedLocation}
        />
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: 'black',
          marginVertical: 10,
          width: '95%',
          marginHorizontal: '2%',
        }}></View>

      {loading ? (
        <Loader />
      ) : (
        <>
          {featured && (
            <>
              <AppText
                style={{
                  color: '#fff',
                  fontSize: 24,
                  marginHorizontal: '4%',
                  marginVertical: '2%',
                  fontWeight: 'bold',
                }}>
                Featured
              </AppText>
              <FlatList
                data={filterData(enhancedVendorInfo)}
                renderItem={renderItem}
                keyExtractor={item => item.VendorID}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            </>
          )}
          {favorite && (
            <>
              <AppText
                style={{
                  color: '#fff',
                  fontSize: 24,
                  marginHorizontal: '4%',
                  marginVertical: '2%',
                  fontWeight: 'bold',
                }}>
                Favorite
              </AppText>
              <FlatList
                data={favVendor}
                renderItem={renderItem}
                keyExtractor={item => item.VendorID}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            </>
          )}
        </>
      )}

      {promo && (
        <>
          <AppText
            style={{
              color: '#fff',
              fontSize: 20,
              marginHorizontal: '4%',
            }}>
            Promo
          </AppText>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 70,
                width: 140,
                height: 140,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome name="bell" size={100} color="#000" />
            </View>
            <AppText style={{marginVertical: 10}}>
              No Promos At This Time
            </AppText>
          </View>
        </>
      )}
      {showLocation && (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{color: '#fff', fontSize: 20}}>No One Near You</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  featuredContainer: {
    flexDirection: 'row',
    marginHorizontal: '4%',
  },
  featuredDiscription: {
    marginLeft: 10,
    marginTop: 10,
  },
  inputStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  rating: {
    flexDirection: 'row',
  },
  containerSearch: {
    backgroundColor: '#494949',
    borderRadius: 10,
    width: '92%',
    marginVertical: 10,
    marginHorizontal: '4%',
  },
  icon: {
    marginRight: 10,
  },
  textInputSearch: {
    // flex: 1,
    paddingLeft: 10,
    color: '#fff',
    width: '92%',
  },
});

export default DirectoryScreen;
