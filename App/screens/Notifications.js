import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import colors from '../config/colors';

const initialMessages = [
  {
    id: 1,
    title: 'Muhammad Umar',
    description: '250-300K - Referral',
    image: require('../assets/modern-furniture-designs.jpg'),
    memberSince: 'has a new member',
    dateAndTime: '10/21/2023- Temple TX',
  },
  {
    id: 2,
    title: 'Aqib Bhai',
    description: '250-300K - Referral',
    image: require('../assets/modern-furniture-designs.jpg'),
    memberSince: 'has a new member',
    dateAndTime: '10/21/2023- Temple TX',
  },
  {
    id: 3,
    title: 'Abdullah Bhai',
    description: '250-300K - Referral',
    image: require('../assets/modern-furniture-designs.jpg'),
    memberSince: 'has a new member',
    dateAndTime: '10/21/2023- Temple TX',
  },
  {
    id: 4,
    title: 'Umar Buzdar',
    description: '250-300K - Referral',
    image: require('../assets/modern-furniture-designs.jpg'),
    memberSince: 'has a new member',
    dateAndTime: '10/21/2023- Temple TX',
  },
  {
    id: 5,
    title: 'Fahad Musadiq',
    description: '250-300K - Referral',
    image: require('../assets/modern-furniture-designs.jpg'),
    memberSince: 'has a new member',
    dateAndTime: '10/21/2023- Temple TX',
  },
  {
    id: 6,
    title: 'Musadiq',
    description: '250-300K - Referral',
    image: require('../assets/modern-furniture-designs.jpg'),
    memberSince: 'has a new member',
    dateAndTime: '10/21/2023- Temple TX',
  },
  {
    id: 7,
    title: 'Fahad',
    description: '250-300K - Referral',
    image: require('../assets/modern-furniture-designs.jpg'),
    memberSince: 'has a new member',
    dateAndTime: '10/21/2023- Temple TX',
  },
  {
    id: 8,
    title: 'Fahad Musadiq',
    description: '250-300K - Referral',
    image: require('../assets/modern-furniture-designs.jpg'),
    memberSince: 'has a new member',
    dateAndTime: '10/21/2023- Temple TX',
  },
];
const Notifications = () => {
  const [messages, setMessages] = useState(initialMessages);
  return (
    <View style={styles.container}>
      <AppText style={styles.headerText}>
        Swipe left to delete or read/unread
      </AppText>
      <GestureHandlerRootView>
        <View style={styles.contentContainer}>
          <FlatList
            data={messages}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ListItem
                title={item.title}
                subTitle={item.description}
                image={item.image}
                memberSince={item.memberSince}
                dateAndTime={item.dateAndTime}
                messages={messages}
                setMessages={setMessages}
                item={item}
                onPress={() => console.log('Selected Item', item)}
              />
            )}
          />
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerText: {
    color: colors.white,
    marginTop: 10,
    fontSize: 16,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  contentContainer: {
    width: '100%', // Adjust the width as needed
    marginVertical: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Notifications;
