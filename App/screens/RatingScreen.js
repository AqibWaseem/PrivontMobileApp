import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the icon library as needed

const RatingScreen = ({value, color}) => {
  const stars = Array.from({length: 5}).map((_, index) => {
    const starValue = index + 1;

    return (
      <Icon
        key={index}
        name={
          value >= starValue
            ? 'star'
            : value >= starValue - 0.5
            ? 'star-half-empty'
            : 'star-o'
        }
        size={15}
        color={color}
      />
    );
  });

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
      {stars}
    </View>
  );
};

RatingScreen.defaultProps = {
  color: '#f8e825',
};

export default RatingScreen;
