import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  badge: {
    position: 'absolute',
    zIndex: 1,
    top: verticalScale(13),
    left: horizontalScale(10),
  },
  image: {
    width: horizontalScale(140),
    height: verticalScale(170),
    borderRadius: horizontalScale(20),
  },
  businessInformation: {
    marginTop: verticalScale(16),
  },
});

export default style;
