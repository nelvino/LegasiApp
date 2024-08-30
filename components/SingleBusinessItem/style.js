import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    marginBottom: 15,
    // Add any additional styling needed for the container
  },
  image: {
    width: horizontalScale(140),
    height: verticalScale(170),
    borderRadius: horizontalScale(20),
  },
  businessInformation: {
    padding: 10,
    // Add any additional styling needed for the business information section
  },
});

export default style;
