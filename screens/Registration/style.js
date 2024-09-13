import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(24),
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    marginLeft: horizontalScale(14),
    marginTop: verticalScale(7),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  logo: {
    width: horizontalScale(120),
    height: verticalScale(120),
    resizeMode: 'contain',
  },
  selectedButton: {
    backgroundColor: '#E37336',
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(24),
    borderRadius: horizontalScale(10),
    alignItems: 'center',
  },
  unselectedButton: {
    backgroundColor: '#fff',
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(24),
    borderRadius: horizontalScale(10),
    alignItems: 'center',
  },
  selectedButtonText: {
    color: '#FFFFFF',
    fontSize: scaleFontSize(16),
    fontWeight: '500',
    textAlign: 'center',
  },
  unselectedButtonText: {
    color: '#000000',
    fontSize: scaleFontSize(16),
    fontWeight: '500',
    textAlign: 'center',
  },
  roleSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: verticalScale(16),
  },
  error: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(16),
    color: '#FF0000',
    marginBottom: verticalScale(24),
  },
  success: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(16),
    color: '#28a745',
    marginBottom: verticalScale(24),
  },
});

export default style;


