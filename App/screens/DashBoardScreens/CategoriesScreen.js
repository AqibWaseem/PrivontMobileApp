import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import {useSelector} from 'react-redux';
import BottomLine from '../../components/BottomLine';
import SearchText from '../../components/SearchText';
import colors from '../../config/colors';
import {selectGetAllOrganization} from '../../store/userSlice';

const Card = ({data}) => {
  const updatedItem = {
    ...data,
    image: require('../../assets/profile2.png'),
    subCategory: 'Sub Categories',
  };
  return (
    <View style={styles.cardContainer}>
      <Image
        source={updatedItem?.image}
        style={{
          width: 70,
          height: 70,
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        }}
      />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{updatedItem?.OrganizationTitle}</Text>
        <Text style={styles.cardSubtitle}>{updatedItem?.subCategory}</Text>
      </View>
    </View>
  );
};

const CategoriesScreen = () => {
  const GetAllOrganization = useSelector(selectGetAllOrganization);
  const [search, setSearch] = useState('');

  const filterData = data => {
    const lowerCaseSearchTerm = search ? search?.toLowerCase() : '';
    return data.filter(
      item =>
        item.OrganizationTitle?.toLowerCase().includes(lowerCaseSearchTerm),
      // item.CompanyName.includes(search),
    );
  };

  return (
    <ScrollView style={styles.container}>
      <SearchText
        style={styles.inputStyles}
        placeholder="Search..."
        placeholderTextColor="gray"
        onChangeText={item => setSearch(item)}
      />
      <View style={styles.rowContainer}>
        <Text style={styles.titleText}>All</Text>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.primary,
            },
          ]}>
          <FontAwesome name="sliders" color="white" size={30} />
        </TouchableOpacity>
      </View>

      {/* Render multiple cards using the Card component */}
      {filterData(GetAllOrganization).map(data => (
        <React.Fragment key={data.OrganizationID}>
          <Card data={data} />
          <BottomLine key={`line_${data.id}`} />
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '8%',
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  inputStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  button: {
    backgroundColor: colors.black,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: colors.white,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: '6%',
  },
  cardDetails: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#fff',
  },
  line: {
    height: 2,
    backgroundColor: colors.white,
    marginTop: 5,
  },
});

export default CategoriesScreen;
