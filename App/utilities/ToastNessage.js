import {ToastAndroid} from 'react-native';

export const showToastWithGravityAndOffsetTop = (
  msg = 'Not found!',
  duration = ToastAndroid.SHORT,
  gravity = ToastAndroid.CENTER,
  xOffset = 25,
  yOffset = 50,
) => {
  ToastAndroid.showWithGravityAndOffset(
    msg,
    duration,
    gravity,
    xOffset,
    yOffset,
  );
};
