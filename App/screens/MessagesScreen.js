import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import ListItem from '../components/ListItem';
import ListItemDelete from '../components/ListItemDelete';

const initialMessages = [
  {
    id: 1,
    title: 'T1',
    description: 'D1',
    image: require('../assets/Umar.jpeg'),
  },
  {
    id: 2,
    title: 'T2',
    description: 'D2',
    image: require('../assets/Umar.jpeg'),
  },
  {
    id: 3,
    title: 'T3',
    description: 'D3',
    image: require('../assets/Umar.jpeg'),
  },
];
const Notifications = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  // const handleDelete = message => {
  //   setMessages(messages.Filter(m => m.id !== message.id));
  // };
  const handleDelete = message => {
    setMessages(messages.filter(m => m.id !== message.id));
  };
  return (
    <GestureHandlerRootView>
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log('Selected Item', item)}
            renderRightActions={() => (
              <ListItemDelete onPress={() => handleDelete(item)} />
            )}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 3,
              title: 'T3',
              description: 'D3',
              image: require('../assets/Umar.jpeg'),
            },
          ]);
        }}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
});

export default Notifications;
