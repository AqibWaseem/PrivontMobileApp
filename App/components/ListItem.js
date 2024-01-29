import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

import colors from '../config/colors';
import AppText from './AppText';
import SimpleButton from './SimpleButton';

const ListItem = ({
  title,
  subTitle,
  image,
  IconComponent,
  setMessages,
  item,
}) => {
  const handleDelete = () => {
    setMessages(prevMessages => prevMessages.filter(m => m.id !== item.id));
  };

  const renderRightActions = (_, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-1, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.deleteContainer}>
        <Animated.View style={[{transform: [{scale}]}]}></Animated.View>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={handleDelete}>
        <TouchableOpacity underlayColor={[colors.primary]}>
          <View style={[styles.container]}>
            <View>
              {IconComponent}
              {image && <Image style={styles.image} source={image} />}
            </View>
            <View>
              <AppText style={{fontSize: 16}}>
                {title}
                {item.memberSince && (
                  <AppText
                    style={styles.subTitle}>{`  ${item.memberSince}`}</AppText>
                )}
              </AppText>

              <AppText style={styles.subTitle}>{subTitle}</AppText>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <AppText style={styles.subTitle}>{item.dateAndTime}</AppText>
                </View>
                <View>
                  <SimpleButton
                    onPress={() => console.log('first')}
                    label="Claim"
                    buttonStyle={styles.buttonStyle}
                    labelStyle={{
                      color: '#fff',
                      alignSelf: 'center',
                      fontSize: 15,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 1,
    marginRight: 40,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
  },
  subTitle: {
    color: '#6e6969',
    fontSize: 14,
    marginRight: 50,
  },
  buttonStyle: {
    backgroundColor: colors.blue,
    height: 25,
    width: 70,
    borderRadius: 5,
    marginBottom: 21,
  },
  deleteContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default ListItem;
