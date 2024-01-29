import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';

import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import BottomLine from '../../components/BottomLine';
import SearchText from '../../components/SearchText';
import CustomSwitch from '../../components/SwitchComponent';
import colors from '../../config/colors';
import {
  default as CustomDropdown,
  default as CustomeDropdown,
} from './CustomeDropdown';
import axios from 'axios';
import {useSelector} from 'react-redux';
import BaseUrl from '../../config/BaseUrl';

const StatsScreen = ({navigation}) => {
  let {UserType, UserID} = useSelector(state => state.user.data);
  const screenWidth = Dimensions.get('window').width;
  const [isActivity, setIsActivity] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [selected, setSelected] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(false);
  const [selectedDownload, setSelectedDownload] = useState(false);
  const [isReports, setIsReports] = useState(false);
  const [isTransactions, setIsTransactions] = useState(true);
  const [isDownload, setIsDownload] = useState(false);
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
  const [transactions, setTransactions] = useState();

  const GetMemberProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}Reports/GetTransactionDetais?UserID=${UserID}&UserType=${UserType}`,
      );
      setTransactions(response.data.Data);
      // console.log('Hello', response.data.Data);
    } catch (error) {
      console.error('Error fetching All Members data:', error);
    } finally {
      setLoading(false); // Reset fetching flag
    }
  };

  // console.log(transactions);
  useEffect(() => {
    GetMemberProfile();
  }, []);
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

  // const data = {
  //   labels: ['20', '21', '22', '23', '24', '25', '26'], // This would be your dates
  //   datasets: [
  //     {
  //       data: [5, 6, 7, 8, 9, 10, 11], // Approved Members
  //       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
  //       strokeWidth: 2, // optional
  //     },
  //     {
  //       data: [2, 3, 4, 5, 6, 7, 8], // Referred Members
  //       color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`, // optional
  //       strokeWidth: 2, // optional
  //     },
  //   ],
  //   legend: ['Approved Members', 'Referred Members'], // optional
  // };

  // const chartConfig = {
  //   backgroundGradientFrom: '#1E2923',
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: '#08130D',
  //   backgroundGradientToOpacity: 0.5,
  //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  //   strokeWidth: 2, // optional, default 3
  //   barPercentage: 0.5,
  //   useShadowColorFromDataset: false, // optional
  // };
  const renderItem = ({item}) => (
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
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: '4%',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <AppButton
          title="Reports"
          onPress={() => {
            setIsFilter(false);
            setIsActivity(true);
            setSelected(false);
            navigation.navigate('Reports');
          }}
          fontisto="pie-chart-1"
          textColor="white"
        />
        <AppButton
          title="Transactions"
          onPress={() => {
            console.log('showall');
            setSelected(!selected);
            setSelectedFilter(false);
            setSelectedDownload(false);
            setIsTransactions(true);
            setIsFilter(false);
            setIsDownload(false);
          }}
          iconName="swap"
          textColor="white"
          selected={selected}
        />
        <AppButton
          title="Download"
          onPress={() => {
            console.log('showall');
            setSelected(false);
            setIsDownload(true);
            setIsFilter(false),
              setIsActivity(false),
              setSelected(false),
              setSelectedFilter(false),
              setSelectedDownload(!selectedDownload),
              setIsReports(false);
            setIsTransactions(false);
          }}
          iconFont="arrow-down"
          textColor="white"
          selected={selectedDownload}
        />
        <AppButton
          title="Filter"
          onPress={() => {
            setIsFilter(true),
              setIsActivity(false),
              setSelected(false),
              setSelectedFilter(!selectedFilter),
              setIsReports(false);
            setIsTransactions(false);
            setSelectedDownload(false), setIsDownload(false);
          }}
          iconFont="sliders"
          textColor={colors.white}
          selected={selectedFilter}
        />
      </View>

      {isTransactions && (
        <>
          <SearchText
            style={styles.inputStyles}
            placeholder="Search..."
            placeholderTextColor="gray"
          />
          <View
            style={{
              height: 1,
              backgroundColor: 'black',
              marginVertical: 10,
              width: '85%',
              marginHorizontal: '8%',
            }}></View>

          {transactions?.map((item, index) => (
            <React.Fragment key={item?.APITransactionID}>
              {renderItem({item})}
            </React.Fragment>
          ))}
        </>
      )}
      {isDownload && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, color: '#fff'}}>All Downloads Here </Text>
        </View>
      )}
      {isFilter && (
        <ScrollView>
          <BottomLine
            marginVertical={10}
            width="85%"
            marginHorizontal={23}
            height={3}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
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
            setIsOpen={() => setIsOpenCall(!isOpenCall)}
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
            setIsOpen={() => setIsOpen(!isOpen)}
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
            setIsOpen={() => setIsOpenType(!isOpenType)}
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

export default StatsScreen;
