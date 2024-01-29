import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';

const ListItemDelete = () => {
  return (
    <View style={styles.container}>
      <Icon name="trash-can" size={35} color={colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    marginTop: 5,
    width: 80,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItemDelete;
