import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HeaderIcon = ({
  name,
  onPress,
  handleStackBackPress,
  marginLeft = 0,
  badgeCount,
}) => (
  <TouchableOpacity
    onPress={onPress ? onPress : handleStackBackPress}
    style={{marginRight: 15, marginHorizontal: marginLeft}}>
    <MaterialIcons name={name} size={32} color="white" />

    {badgeCount > 0 && (
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{badgeCount}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: 1,
    right: -1,
    backgroundColor: 'red',
    borderRadius: 7.5,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
});

export default HeaderIcon;
