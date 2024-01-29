import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';

import axios from 'axios';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import BottomLine from '../../components/BottomLine';
import CustomSwitch from '../../components/SwitchComponent';
import colors from '../../config/colors';
import Loader from '../../utilities/Loader';
import CustomeDropdown from '../DashBoardScreens/CustomeDropdown';
import AllMembers from './AllMembers';
import PendingMembers from './PendingMembers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../../config/BaseUrl';
import {Picker} from '@react-native-picker/picker';

const Members = ({navigation, route}) => {
  const {search} = route.params || {};

  const [initialMembers, setInitialMembers] = useState(true);
  const [pending, setPending] = useState(false);
  const [pendingData, setPendingData] = useState([]);
  const [allMembersData, setAllMembersData] = useState([]);
  const [getAPIType, setGetAPIType] = useState(null);
  const [lastIdAll, setLastIdAll] = useState(0); // New state for lastId
  const [lastIdPending, setLastIdPending] = useState(0); // New state for lastId
  const [isLoadingAll, setIsLoadingAll] = useState(true);
  const [newOne, setNewOne] = useState(false);
  const [selectedField, setSelectedField] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingPending, setIsFetchingPending] = useState(false);
  const [memberSwitch, setMemberSwitch] = useState(false);
  const [vendorSwitch, setVendorSwitch] = useState(false);
  const [approvedSwitch, setApprovedSwitch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const [activeTime, setActiveTime] = useState();
  const [isOpenCall, setIsOpenCall] = useState();
  const [isOpenTime, setIsOpenTime] = useState();
  const [currentValueCall, setCurrentValueCall] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [hasMoreDataPending, setHasMoreDataPending] = useState(true);

  const [displayCountAll, setDisplayCountAll] = useState(20); // For all members
  const [displayCountPending, setDisplayCountPending] = useState(20); // For pending members
  const [isLoadingPending, setIsLoadingPending] = useState(true);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const noResultsAllMembers = (data, isFetching) => {
    const filteredData = filterData(data);
    return filteredData.length === 0 && !isFetching;
  };
  // const noResults = (data) => {
  //   const filteredData = filterData(data);
  //   return filteredData.length === 0 && !isLoading;
  // };
  const noResultsPendingMembers = (data, isLoadingPending) => {
    const filteredData = filterData(data);
    return filteredData.length === 0 && !isLoadingPending;
  };

  // const loadMoreItemsAll = () => {
  //   if (displayCountAll < allMembersData.length) {
  //     setDisplayCountAll(prevCount => prevCount + 20);
  //   }
  // };

  // const loadMoreItemsPending = () => {
  //   if (displayCountPending < pendingData.length) {
  //     setDisplayCountPending(prevCount => prevCount + 20);
  //   }
  // };

  // const handleScrollAll = ({nativeEvent}) => {
  //   if (isCloseToBottom(nativeEvent)) {
  //     loadMoreItemsAll();
  //   }
  // };

  // const handleScrollPending = ({nativeEvent}) => {
  //   if (isCloseToBottom(nativeEvent)) {
  //     loadMoreItemsPending();
  //   }
  // };

  const filterData = data => {
    const lowerCaseSearchTerm = search ? search.toLowerCase() : '';
    return data.filter(
      item =>
        (item?.EmailAddress &&
          item?.EmailAddress.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (item?.PhoneNo && item?.PhoneNo.includes(search)) ||
        `${item?.FirstName} ${item?.LastName}`
          .toLowerCase()
          .includes(lowerCaseSearchTerm),
    );
  };

  const renderNoResults = () => {
    if (!isFetching && isLoading && !isFetchingPending) {
      return (
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
    } else {
      return null; // If none of the conditions are met, return null (or any other component you want to render)
    }
  };

  useEffect(() => {
    if (initialMembers && pending) {
      setIsLoading(false);
      setPending(false);
      setInitialMembers(true);
      setSelected(false);
      setSelectedFilter(false);
    } else {
      setIsLoading(false);
    }
  }, [initialMembers, isLoading]);

  const items = [
    {label: '15 Days', value: '1'},
    {label: '30 Days', value: '2'},
    {label: '60 Days', value: '3'},
  ];

  const items3 = [
    {label: '90 Days', value: '1'},
    {label: '120 Days', value: '2'},
    {label: '150 Days', value: '3'},
  ];

  const items4 = [
    {label: '10 Mints', value: '1'},
    {label: '20 Mints', value: '2'},
    {label: '30 Mints', value: '3'},
    {label: '1 Hour', value: '4'},
    {label: '2 Hours', value: '5'},
    {label: '3 Hours', value: '6'},
    {label: '4 Hours', value: '7'},
  ];

  const PendingMembersInfo = async () => {
    setIsFetchingPending(true);
    const UserType = JSON.parse(await AsyncStorage.getItem('UserType'));
    const UserID = JSON.parse(await AsyncStorage.getItem('UserID'));
    // if (isFetchingPending) return;
    try {
      const response = await axios.get(
        `${BaseUrl}LeadInfo/GetLeadsInformation?UserID=${UserID}&UserType=${UserType}&Status=1&PageNo=${currentPagePending}`,
      );

      const newData = response.data.Data;
      setPendingData(prevData => [...prevData, ...newData]);
      if (newData.length > 0) {
        setCurrentPagePending(prevPage => prevPage + 1);
      } else {
        setHasMoreDataPending(false);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsFetchingPending(false);
    }
  };
  // const fetchAllMembers = async () => {
  //   console.log('Current page', currentPage);
  //   setIsFetching(true);
  //   const UserType = JSON.parse(await AsyncStorage.getItem('UserType'));
  //   const UserID = JSON.parse(await AsyncStorage.getItem('UserID'));
  //   // if (isFetching) return; // Prevent multiple simultaneous data fetches
  //   try {
  //     const response = await axios.get(
  //       `${BaseUrl}LeadInfo/GetLeadsInformation?UserID=${UserID}&UserType=${UserType}&Status=0&PageNo=${currentPage}`,
  //     );

  //     const newData = response.data.Data;
  //     setAllMembersData(prevData => [...prevData, ...newData]);
  //     if (newData.length > 0) {
  //       setCurrentPage(prevPage => prevPage + 1);
  //     } else {
  //       setHasMoreData(false);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching All Members data:', error);
  //   } finally {
  //     setIsFetching(false); // Reset fetching flag
  //   }
  // };
  const fetchAllMembers = async page => {
    setIsFetching(true);
    const UserType = JSON.parse(await AsyncStorage.getItem('UserType'));
    const UserID = JSON.parse(await AsyncStorage.getItem('UserID'));

    try {
      const response = await axios.get(
        `${BaseUrl}LeadInfo/GetLeadsInformation?UserID=${UserID}&UserType=${UserType}&Status=0&PageNo=${page}`,
      );

      const newData = response.data.Data;
      setAllMembersData(prevData => [...prevData, ...newData]);
      if (newData.length > 0) {
        // No need to update currentPage here
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error('Error fetching All Members data:', error);
    } finally {
      setIsFetching(false);
    }
  };
  const GetAPIType = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${BaseUrl}MemberAPIs/GetAPIType`);
      setGetAPIType(response.data.Data);
      console.log(response.data.Data);
    } catch (error) {
      console.error('Error fetching All Members data:', error);
    } finally {
      setIsFetching(false); // Reset fetching flag
    }
  };

  const handleScrollAll = ({nativeEvent}) => {
    if (isCloseToBottom(nativeEvent)) {
      if (!isFetching && !isLoading) {
        setCurrentPage(prevPage => {
          const nextPage = prevPage + 1;
          fetchAllMembers(nextPage);
          return nextPage;
        });
      }
    }
  };

  const handleScrollAllPending = ({nativeEvent}) => {
    if (isCloseToBottom(nativeEvent)) {
      if (!isFetchingPending && !isLoading) {
        PendingMembersInfo();
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set initial loading state
      try {
        GetAPIType();
        fetchAllMembers(); // Initial data fetch
        PendingMembersInfo();
      } finally {
        setIsLoading(false); // Reset initial loading state
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoadingAll(true);
  //     setIsLoadingPending(true);
  //     try {
  //       await Promise.all([AddMembersInfo(), PendingMembersInfo()]);
  //     } finally {
  //       setIsLoadingAll(false);
  //       setIsLoadingPending(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const renderPendingMembers = ({item}) => (
  //   <PendingMembers
  //     item={item}
  //     onPress={() => navigation.navigate('MemberProfiles', {item})}
  //   />
  // );
  // const renderAllMembers = ({item}) => (
  //   <AllMembers
  //     item={item}
  //     onPress={() => navigation.navigate('MemberProfiles', {item})}
  //   />
  // );

  const saveHandler = () => {
    console.log('okay');
  };

  const onRefresh = async () => {
    // Reset state when refreshing
    setAllMembersData([]);
    setHasMoreData(true);
    setCurrentPage(1); // Set currentPage directly to 1
    try {
      await fetchAllMembers(1); // Pass 1 as the page parameter
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
          marginHorizontal: '4%',
        }}>
        <AppButton
          title="Add Member"
          onPress={() => {
            navigation.navigate('ProfileScreen'),
              setInitialMembers(true),
              setIsFilter(false),
              setNewOne(false),
              setPending(false);
          }}
          iconName="adduser"
          textColor={colors.white}
        />
        <AppButton
          title="New"
          onPress={() => {
            setInitialMembers(false),
              setIsFilter(false),
              setNewOne(true),
              setPending(false);
          }}
          iconFont="bullhorn"
          textColor="white"
        />
        <AppButton
          title={initialMembers ? 'Pending' : 'Members'}
          onPress={() => {
            setInitialMembers(!initialMembers),
              setPending(!pending),
              setSelected(!selected),
              setIsFilter(false),
              setIsLoading(!isLoading),
              setNewOne(false);
          }}
          iconName="hourglass"
          textColor="white"
          selected={selected}
        />

        <AppButton
          title="Filter"
          onPress={() => {
            setInitialMembers(false),
              setIsFilter(true),
              setNewOne(false),
              setPending(false),
              setIsLoading(false),
              setSelectedFilter(!selectedFilter);
          }}
          iconFont="sliders"
          textColor="white"
          selected={selectedFilter}
        />
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: 'black',
          marginVertical: 10,
          width: '90%',
          marginHorizontal: '4%',
        }}></View>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {initialMembers &&
            (noResultsAllMembers(allMembersData, isFetching) ? (
              renderNoResults()
            ) : (
              <ScrollView
                onScroll={handleScrollAll}
                scrollEventThrottle={400}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                  />
                }>
                {filterData(allMembersData).map((item, index) => (
                  <AllMembers
                    key={`${item.LeadID}-${index}`} // Composite key
                    item={item}
                    onPress={() =>
                      navigation.navigate('MemberProfiles', {item})
                    }
                  />
                ))}
                {isFetching && (
                  <View style={styles.loadingMore}>
                    <ActivityIndicator size="large" color={'#808080'} />
                  </View>
                )}
              </ScrollView>
            ))}

          {pending &&
            (noResultsPendingMembers(pendingData) ? (
              renderNoResults()
            ) : (
              <ScrollView
                onScroll={handleScrollAllPending}
                scrollEventThrottle={400}>
                {filterData(pendingData).map((item, index) => (
                  <PendingMembers
                    key={`${item.LeadID}-${index}`} // Composite key
                    item={item}
                    onPress={() =>
                      navigation.navigate('MemberProfiles', {item})
                    }
                  />
                ))}
                {isFetchingPending && (
                  <View style={styles.loadingMore}>
                    <ActivityIndicator size="large" color={'#808080'} />
                  </View>
                )}

                {/* {pending &&
            (noResultsPendingMembers() ? (
              renderNoResults()
            ) : (
              <ScrollView
                onScroll={handleScrollPending}
                scrollEventThrottle={400}>
                {isLoading && (
                  <ActivityIndicator size="large" color={'#808080'} />
                )}
                {filterData(pendingData)
                  .slice(0, displayCountPending)
                  .map(item => (
                    <PendingMembers
                      key={item.LeadID}
                      item={item}
                      onPress={() =>
                        navigation.navigate('MemberProfiles', {item})
                      }
                    />
                  ))}
                {displayCountPending < pendingData.length &&
                  (!search ||
                    filterData(pendingData).length > displayCountPending) && (
                    <View style={styles.loadingMore}>
                      <ActivityIndicator size="large" color={'#808080'} />
                    </View>
                  )} */}
              </ScrollView>
            ))}
        </>
      )}

      {newOne && (
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedField}
            dropdownIconColor="white"
            onValueChange={(itemValue, itemIndex) =>
              setSelectedField(itemValue)
            }
            style={styles.picker}>
            {getAPIType.map(apiType => (
              <Picker.Item
                key={apiType.APITypeID}
                label={apiType.APITypeTitle}
                value={apiType.APITypeID}
              />
            ))}
          </Picker>
          <TouchableOpacity style={styles.saveButton} onPress={saveHandler}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
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
              Show All Members
            </AppText>
            <CustomSwitch
              onValueChange={() => setMemberSwitch(!memberSwitch)}
              value={memberSwitch}
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
              Vendor Members Only
            </AppText>
            <CustomSwitch
              onValueChange={() => setVendorSwitch(!vendorSwitch)}
              value={vendorSwitch}
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
                setIsOpenTime(false);
            }}
            currentValue={currentValueCall}
            setCurrentValue={setCurrentValueCall}
            dropDownDirection="BOTTOM"
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
              setIsOpen(!isOpen), setIsOpenTime(false), setIsOpenCall(false);
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
          <CustomeDropdown
            label="My Circle Active Time"
            items={items4}
            isOpen={isOpenTime}
            setIsOpen={() => {
              setIsOpenTime(!isOpenTime),
                setIsOpenCall(false),
                setIsOpen(false);
            }}
            currentValue={activeTime}
            setCurrentValue={setActiveTime}
            dropDownDirection="BOTTOM"
            maxHeight={80}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Members;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'blue',
    height: 30,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
    top: -20,
    left: 5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  featuredContainer: {
    flexDirection: 'row',
    marginHorizontal: '6%',
  },
  featuredDiscription: {
    marginLeft: 10,
    marginTop: 20,
  },
  inputStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  pendingText: {
    color: colors.danger,
    width: 80,
    fontSize: 14,
    paddingLeft: 6,
    fontWeight: 'bold',
  },
  picker: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#494949',
    marginBottom: 10,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 35,
    width: '85%',
    color: '#fff',
    borderRadius: 10,
  },

  saveButton: {
    width: '25%',
    marginLeft: 15,
    padding: 15,
    backgroundColor: 'tomato',
    borderRadius: 5,
    elevation: 5,
    marginVertical: 0,
    marginBottom: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
  },
});
