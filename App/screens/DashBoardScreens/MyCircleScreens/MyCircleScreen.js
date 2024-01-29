import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AllLenderInfo,
  PendingLenderInfo,
  selectCurrentCircle,
  selectFetchStatus,
} from '../../../store/userSlice';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import BottomLine from '../../../components/BottomLine';
import CustomSwitch from '../../../components/SwitchComponent';
import colors from '../../../config/colors';
import Loader from '../../../utilities/Loader';
import CurrentListItem from '.././MyCircleScreens/CurrentListItem';
import {
  default as CustomDropdown,
  default as CustomeDropdown,
} from './../CustomeDropdown';
import PendingListItem from './PendingListItem';
import AnimatedLoader from '../../../utilities/AnimatedLoader';

const MyCircleScreen = ({navigation, route}) => {
  let {UserID, UserType} = useSelector(state => state?.user?.data);
  const {search} = route.params || {};
  const currentCircle = useSelector(state => state?.user?.currentCircle);
  const pendingCircle = useSelector(state => state?.user?.pendingCircle);
  const fetchStatus = useSelector(selectFetchStatus);
  const [refreshing, setRefreshing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [current, setCurrent] = useState(true);
  const [transactionsSwitch, setTransactionsSwitch] = useState(false);
  const [claimedSwitch, setClaimedSwitch] = useState(false);
  const [approvedSwitch, setApprovedSwitch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const [isOpenType, setIsOpenType] = useState(false);
  const [currentValueType, setCurrentValueType] = useState();
  const [isOpenCall, setIsOpenCall] = useState();
  const [currentValueCall, setCurrentValueCall] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const filterData = data => {
    const lowerCaseSearchTerm = search ? search.toLowerCase() : '';
    return data.filter(
      item =>
        item.EmailAddress.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.Contact1.includes(search) ||
        `${item.FirstName} ${item.LastName}`
          .toLowerCase()
          .includes(lowerCaseSearchTerm),
    );
  };

  useEffect(() => {
    if (current && isPending) {
      setLoading(true);
      setIsPending(false);
      setCurrent(true);
      setSelected(false);
    } else {
      setLoading(false);
    }
  }, [current, isPending, loading]);

  const items = [
    {label: '30 Days', value: '1'},
    {label: '60 Days', value: '2'},
    {label: '15 Days', value: '3'},
  ];

  const items2 = [
    {label: 'Fahad Musadiq', value: '1'},
    {label: 'Aqib Bhai', value: '2'},
    {label: 'Mr Umar', value: '3'},
  ];

  const items3 = [
    {label: '120 Days', value: '1'},
    {label: '150 Days', value: '2'},
  ];

  const renderListItem = ({item}) => (
    <CurrentListItem
      item={item}
      onPress={() => navigation.navigate('MyCircleProfile', {item})}
    />
  );
  const renderPending = ({item}) => (
    <PendingListItem
      item={item}
      onPress={() => navigation.navigate('MyCircleProfile', {item})}
    />
  );

  const renderNoResults = () => (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <AppText
        style={{
          color: 'red',
          fontSize: 18,
          marginHorizontal: '8%',
          textAlign: 'center',
        }}>
        No results found.
      </AppText>
    </View>
  );
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(AllLenderInfo({UserID}));
    dispatch(PendingLenderInfo()).then(() => setRefreshing(false));
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginHorizontal: '4%',
        }}>
        <AppButton
          title="Add Member"
          onPress={() => navigation.navigate('ProfileScreen')}
          iconName="adduser"
          textColor={colors.white}
        />
        <AppButton
          title={current ? 'Pending' : 'Current'}
          onPress={() => {
            setIsPending(!isPending),
              setCurrent(!current),
              setSelected(!selected),
              setIsFilter(false);
            setLoading(true);
          }}
          iconName="hourglass"
          textColor={colors.white}
          selected={selected}
        />

        <AppButton
          title="Filter"
          onPress={() => {
            setIsPending(false),
              setCurrent(false),
              setIsFilter(true),
              setSelected(false);
          }}
          iconFont="sliders"
          textColor={colors.white}
        />
      </View>
      <BottomLine
        marginVertical={10}
        width="92%"
        marginHorizontal={15}
        height={3}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          {current && (
            <>
              <AppText
                style={{
                  color: '#dd604c',
                  fontSize: 24,
                  marginHorizontal: '8%',
                  marginBottom: 10,
                  fontWeight: 'bold',
                }}>
                Current
              </AppText>

              <FlatList
                data={filterData(currentCircle)}
                renderItem={({item}) => renderListItem({item})} // Render item normally
                ListEmptyComponent={renderNoResults} // Render this component when the list is empty
                keyExtractor={item => item.LenderId.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            </>
          )}
          {isPending && (
            <>
              <AppText
                style={{
                  color: '#dd604c',
                  fontSize: 24,
                  marginHorizontal: '8%',
                  marginBottom: 10,
                  fontWeight: 'bold',
                }}>
                Pending
              </AppText>

              <FlatList
                data={filterData(pendingCircle)}
                renderItem={({item}) => renderPending({item})} // Render item normally
                ListEmptyComponent={renderNoResults} // Render this component when the list is empty
                keyExtractor={item => item.LenderId.toString()}
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
      {isFilter && (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <AppText style={[styles.label, {marginLeft: 20, fontSize: 16}]}>
              Show All Transactions
            </AppText>
            <CustomSwitch
              onValueChange={() => setTransactionsSwitch(!transactionsSwitch)}
              value={transactionsSwitch}
            />
          </View>
          <BottomLine
            width={'100%'}
            height={1}
            marginVertical={10}
            color={colors.black}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <AppText style={[styles.label, {marginLeft: 20, fontSize: 16}]}>
              Claimed Members Only
            </AppText>
            <CustomSwitch
              onValueChange={() => setClaimedSwitch(!claimedSwitch)}
              value={claimedSwitch}
            />
          </View>
          <BottomLine
            width={'100%'}
            height={1}
            marginVertical={10}
            color={colors.black}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <AppText style={[styles.label, , {marginLeft: 20, fontSize: 16}]}>
              Approved Members Only
            </AppText>
            <CustomSwitch
              onValueChange={() => setApprovedSwitch(!approvedSwitch)}
              value={approvedSwitch}
            />
          </View>
          <BottomLine
            width={'100%'}
            height={1}
            marginVertical={8}
            color={colors.black}
          />
          <CustomeDropdown
            label="Archived Members"
            items={items3}
            isOpen={isOpenCall}
            setIsOpen={() => {
              setIsOpenCall(!isOpenCall),
                setIsOpen(false),
                setIsOpenType(false);
            }}
            currentValue={currentValueCall}
            setCurrentValue={setCurrentValueCall}
            dropDownDirection="BOTTOM"
            maxHeight={80}
          />
          <BottomLine
            width={'100%'}
            height={1}
            marginVertical={8}
            color={colors.black}
          />
          <CustomeDropdown
            label="Members in the last"
            items={items}
            isOpen={isOpen}
            setIsOpen={() => {
              setIsOpen(!isOpen), setIsOpenCall(false), setIsOpenType(false);
            }}
            currentValue={currentValue}
            setCurrentValue={setCurrentValue}
            dropDownDirection="BOTTOM"
            maxHeight={80}
          />
          <BottomLine
            width={'100%'}
            height={1}
            marginVertical={8}
            color={colors.black}
          />
          <CustomDropdown
            label="My Circle Member Only"
            items={items2}
            isOpen={isOpenType}
            setIsOpen={() => {
              setIsOpenType(!isOpenType),
                setIsOpenCall(false),
                setIsOpen(false);
            }}
            currentValue={currentValueType}
            setCurrentValue={setCurrentValueType}
            dropDownDirection="BOTTOM"
            maxHeight={80}
          />
          <BottomLine
            width={'100%'}
            height={1}
            marginVertical={8}
            color={colors.black}
          />
        </ScrollView>
      )}
      {(isPending || current) && (
        <TouchableOpacity
          style={styles.pencilButton}
          onPress={() => navigation.navigate('MyCircleFavLender')}>
          <FontAwesome6 name="plus" size={30} color={colors.white} />
        </TouchableOpacity>
      )}
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

export default MyCircleScreen;
