import {StyleSheet, Dimensions} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const {width} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(7),
  },
  image: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(24),
    height: verticalScale(240),
    borderRadius: horizontalScale(5),
    marginHorizontal: horizontalScale(10), // Adds space between images
  },
  imageCarousel: {
    width: width - horizontalScale(40),
  },
  imageCarouselContent: {
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(16),
  },
  dot: {
    width: horizontalScale(8),
    height: horizontalScale(8),
    borderRadius: horizontalScale(4),
    marginHorizontal: horizontalScale(4),
  },
  activeDot: {
    backgroundColor: '#156CF7',
  },
  inactiveDot: {
    backgroundColor: '#C4C4C4',
  },
  badge: {
    marginBottom: verticalScale(16),
  },
  description: {
    marginTop: verticalScale(7),
    marginHorizontal: horizontalScale(7),
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: scaleFontSize(14),
    marginBottom: verticalScale(10),
  },
  infoText: {
    fontSize: scaleFontSize(16),
    marginVertical: verticalScale(8),
  },
});

export default style;
