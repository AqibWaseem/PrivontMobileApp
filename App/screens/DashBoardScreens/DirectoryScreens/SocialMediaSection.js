import React from 'react';
import {View, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppText from '../../../components/AppText';

const SocialMediaSection = ({socialMediaData}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {socialMediaData.icons.map((icon, index) => (
          <FontAwesome
            key={index}
            name={icon}
            size={20}
            color="#fff"
            style={styles.icon}
          />
        ))}
      </View>
      <View style={styles.textContainer}>
        {socialMediaData.usernames.map((username, index) => (
          <AppText key={index} style={styles.text}>
            {username}
          </AppText>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // height: 470,
  },
  iconContainer: {
    marginRight: 10,
    marginLeft: 20,
  },
  icon: {
    marginBottom: -3,
    marginVertical: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 6,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    marginHorizontal: 2,
    marginVertical: 9.5,
  },
});

export default SocialMediaSection;
