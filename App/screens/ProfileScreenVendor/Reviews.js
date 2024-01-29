import React, {useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import {selectUsersReview} from '../../store/userSlice';
import RatingScreen from '../RatingScreen';

const Reviews = ({navigation, route}) => {
  const [averageRating, setAverageRating] = useState(0);
  const {Data, RatingDetails} = useSelector(selectUsersReview);
  console.log(Data);
  useEffect(() => {
    // Calculate average rating from RatingDetails
    const totalRating = Data?.reduce((acc, rating) => {
      return acc + rating.Rating;
    }, 0);

    const average = totalRating / Data?.length || 0;
    setAverageRating(average.toFixed(1.0));
  }, [Data]);

  const RoundImage = ({source}) => {
    if (source) {
      return (
        <Image
          source={source}
          style={{width: 60, height: 60, borderRadius: 30}}
        />
      );
    }

    // Return a placeholder or null if source is null or undefined
    return null;
  };

  const ReviewCard = ({review}) => {
    const timestamp = item?.EntryDate
      ? parseInt(item?.EntryDate?.match(/\d+/)[0])
      : null;
    const dateObject = new Date(timestamp);
    const formattedDate = `${
      dateObject.getMonth() + 1
    }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    const updatedReview = {
      ...review,
      formattedDate,
      image: require('../../assets/Fahad.jpg'),
    };
    return (
      <View
        style={{
          backgroundColor: '#494949',
          marginBottom: 20,
          padding: 10,
          borderRadius: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
          }}>
          {/* User Image */}
          <View style={{marginRight: 10}}>
            <RoundImage source={updatedReview.image} />
          </View>

          {/* User Info and Rating */}
          <View style={{flex: 1}}>
            <AppText style={{fontWeight: 'bold', fontSize: 14, marginTop: 10}}>
              {updatedReview.FirstName} {updatedReview.LastName}
            </AppText>
            <RatingScreen value={updatedReview.Rating} color="#fdc609" />
            {/* <RatingScreen /> */}

            {/* updatedReview Title */}
          </View>
          <AppText style={{fontSize: 14}}>
            {updatedReview.formattedDate}
          </AppText>
        </View>

        <AppText style={{fontWeight: 'bold', paddingLeft: 10, fontSize: 14}}>
          {updatedReview.FeedbackTitle}
        </AppText>

        {/* updatedReview AppText */}
        <AppText style={{marginTop: 5, paddingLeft: 10, fontSize: 14}}>
          {updatedReview.Remarks}
        </AppText>
      </View>
    );
  };
  // Dummy data for reviews
  const reviewsData = [
    {stars: 5, count: 25},
    {stars: 4, count: 20},
    {stars: 3, count: 15},
    {stars: 2, count: 10},
    {stars: 1, count: 29},
  ];

  // Render each row in the FlatList
  const renderReviewItem = ({item}) => (
    <View style={styles.reviewItem}>
      <View style={styles.starsContainer}>
        {[...Array(5 - item.stars)].map((_, index) => (
          <View key={index} style={styles.voidSpace} />
        ))}
        {[...Array(item.stars)].map((_, index) => (
          <Ionicons key={index} name="star" size={16} color="white" />
        ))}
      </View>
      {RatingDetails.map((rating, index) => (
        <View key={index} style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {width: `${rating[`Rating${item.stars}`]}%`},
            ]}
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <AppText style={styles.rating}>{averageRating}</AppText>
          <AppText style={styles.outOf}>Out of 5</AppText>
        </View>
        <View style={{flexDirection: 'column'}}>
          <FlatList
            data={reviewsData}
            renderItem={renderReviewItem}
            keyExtractor={item => item.stars.toString()}
          />
          <AppText style={styles.totalRating}>{Data.length} Ratings</AppText>
        </View>
      </View>
      <ScrollView
        style={{paddingHorizontal: 5}}
        showsVerticalScrollIndicator={false}>
        {Data?.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </ScrollView>
      {/* <TouchableOpacity
        style={styles.pencilButton}
        onPress={() => navigation.navigate('WriteReview')}>
        <FontAwesome6 name="pen" size={26} color={colors.white} />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    backgroundColor: colors.primary,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  rating: {
    fontSize: 62,
    color: colors.pink,
    marginRight: 20,
  },
  outOf: {
    fontSize: 16,
    marginHorizontal: 12,
  },
  totalRating: {
    fontSize: 16,
    // marginHorizon: 50,
    alignSelf: 'center',
    marginLeft: '20%',
    // marginTop: -10,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  voidSpace: {
    width: 16,
  },
  // linesContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginLeft: 5, // Adjust the margin as needed
  // },
  // orangeLine: {
  //   height: 2,
  //   width: '42%', // Adjust the width for half-fill
  //   backgroundColor: colors.pink,
  // },
  // greyLine: {
  //   height: 2,
  //   width: '31%', // Adjust the width for half-fill
  //   backgroundColor: 'grey',
  // },
  pencilButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 40,
    borderColor: colors.pink,
    borderWidth: 2,
    padding: 20,
    elevation: 10,
  },
  progressBarContainer: {
    marginTop: 10,
    height: 5,
    width: '60%',
    backgroundColor: colors.white,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.pink,
  },
});

export default Reviews;
