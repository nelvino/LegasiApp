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
    backgroundColor: '#9EC8BE',
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
  label: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: scaleFontSize(14),
    color: '#333',
    marginBottom: verticalScale(5),
    marginTop: verticalScale(5),
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: verticalScale(10),
    borderRadius: horizontalScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: verticalScale(10),
  },
  businessName: {
    fontSize: scaleFontSize(16),
    fontWeight: 'bold',
    color: '#000',
  },
  businessDescription: {
    fontSize: scaleFontSize(14),
    color: '#555',
    lineHeight: verticalScale(20),
  },
  address: {
    fontSize: scaleFontSize(14),
    color: '#555',
  },
});

export default style;
