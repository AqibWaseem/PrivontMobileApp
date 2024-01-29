import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import BottomLine from '../../components/BottomLine';
import {LineChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import axios from 'axios';
import BaseUrl from '../../config/BaseUrl';

const ReportsScreen = () => {
  let {UserType, UserID} = useSelector(state => state?.user?.data);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(new Date()?.getFullYear());
  const [selectedDay, setSelectedDay] = useState(1);
  const [days, setDays] = useState([]);
  const [selectedMonthShort, setSelectedMonthShort] = useState('');
  const screenWidth = Dimensions.get('window').width;
  const [graphReports, setGraphReports] = useState();
  const [loading, setLoading] = useState(true);

  const BottomDetails = graphReports?.BottomDetails;
  console.log('First', BottomDetails);
  const approvedMembers = BottomDetails?.[0]?.ApprovedMembers;
  const myCircle = BottomDetails?.[0]?.MyCircle;
  const pendingMembers = BottomDetails?.[0]?.PendingMembers;
  const referredVendors = BottomDetails?.[0]?.ReferredVendors;
  const randomNumber = Math.floor(Math.random() * 20) + 1;

  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    setDays(Array?.from({length: daysInMonth}, (_, index) => index + 1));
    const shortMonthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    setSelectedMonthShort(shortMonthNames[selectedMonth - 1]);
  }, [selectedMonth, selectedYear]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const years = Array.from(
    {length: 10},
    (_, index) => new Date().getFullYear() + index,
  );

  const renderDayItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.dayItem,
        {
          backgroundColor: item === selectedDay ? '#808080' : '#0d232f',
          borderWidth: item === selectedDay ? 2 : 0,
        },
      ]}
      onPress={() => {
        setSelectedDay(item);
      }}>
      <Text
        style={[
          styles.dayText,
          {
            fontSize: item === selectedDay ? 16 : 14,
            fontWeight: item === selectedDay ? 'bold' : 'normal',
          },
        ]}>
        {item}
      </Text>
      <Text
        style={[
          styles.dayText,
          {
            fontSize: item === selectedDay ? 14 : 12,
            fontWeight: item === selectedDay ? 'bold' : 'normal',
          },
        ]}>
        {selectedMonthShort.toLocaleUpperCase()}
      </Text>
    </TouchableOpacity>
  );

  const transformGraphDetails = () => {
    const graphDetails = graphReports?.GraphDetails || [];
    return graphDetails?.map(entry => ({
      date: new Date(
        parseInt(entry?.EntryDateTime.substr(6)),
      ).toLocaleDateString(),
      isApproved: entry?.IsApproved ? 1 : 0,
    }));
  };

  const generateChartData = () => {
    const chartData = transformGraphDetails();
    return {
      labels: chartData?.map(entry => entry?.date),
      datasets: [
        {
          data: chartData?.map(entry => entry?.isApproved),
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  };

  const chartData = generateChartData();

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 1,
    useShadowColorFromDataset: false,
  };

  const Month = selectedMonth.toString();
  const Year = selectedYear.toString();

  const GetGraphReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}Reports/GraphReports?UserID=${UserID}&UserType=${UserType}&Month=${Month}&Year=${Year}`,
      );
      setGraphReports(response?.data);
      console.log('Hello', response?.data);
    } catch (error) {
      console.error('Error fetching All Members data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetGraphReports();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMonth}
          dropdownIconColor="white"
          onValueChange={itemValue => setSelectedMonth(itemValue)}
          style={styles.picker}>
          {months.map((month, index) => (
            <Picker.Item key={index} label={month} value={index + 1} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedYear}
          dropdownIconColor="white"
          onValueChange={itemValue => setSelectedYear(itemValue)}
          style={styles.picker}>
          {years.map(year => (
            <Picker.Item key={year} label={year.toString()} value={year} />
          ))}
        </Picker>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        <AppText
          style={{
            color: 'lightgreen',
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 5,
            marginRight: 50,
          }}>
          Approved Members: {approvedMembers}
        </AppText>
        <AppText
          style={{
            color: 'lightblue',
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 5,
          }}>
          Pending Members: {pendingMembers}
        </AppText>
      </View>
      <View style={styles.sliderContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{height: Dimensions.get('window').height / 2.3}}>
          {graphReports?.GraphDetails.length > 0 && (
            <LineChart
              data={chartData}
              width={screenWidth * 2}
              height={Dimensions.get('window').height / 2.4}
              chartConfig={chartConfig}
              bezier
            />
          )}

          {/* <View style={{flexDirection: 'column'}}>
            <AppText
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 24,
              }}>
              {approvedMembers}
            </AppText>
            <AppText
              style={{marginRight: 20, marginLeft: 20, color: 'lightgreen'}}>
              Approved Members
            </AppText>
          </View>
          <View style={{flexDirection: 'column'}}>
            <AppText
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 24,
              }}>
              {pendingMembers}
            </AppText>
            <AppText style={{color: 'lightblue'}}>Pending Members </AppText>
          </View> */}
        </ScrollView>
        <FlatList
          data={days}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.toString()}
          renderItem={renderDayItem}
        />
      </View>
      <ScrollView>
        <AppText
          style={{
            color: colors.white,
            marginLeft: 10,
            marginBottom: 3,
            marginTop: 5,
          }}>
          Total Approved Members: {approvedMembers}
        </AppText>
        <AppText style={{color: colors.white, marginLeft: 10, marginBottom: 3}}>
          My Circle: {myCircle}
        </AppText>
        <AppText style={{color: colors.white, marginLeft: 10, marginBottom: 3}}>
          Vendor Circle: {pendingMembers}
        </AppText>
        <AppText style={{color: colors.white, marginLeft: 10, marginBottom: 3}}>
          YTD Approved Members: {referredVendors}
        </AppText>
        <AppText
          style={{
            color: colors.white,
            marginLeft: 10,
            marginBottom: 20,
            marginBottom: 3,
          }}>
          Digital Card Scanned: {randomNumber}
        </AppText>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.primary,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  picker: {
    flex: 1,
    backgroundColor: '#0d232f',
    color: 'white',
  },
  sliderContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  sliderLabel: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    alignSelf: 'center',
  },
  dayItem: {
    width: 70,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    color: 'white',
  },
  shortMonthText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReportsScreen;
