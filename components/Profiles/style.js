import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: scaleFontSize(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
    color: '#333',
  },
  input: {
    height: verticalScale(22),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: horizontalScale(8),
    paddingHorizontal: horizontalScale(10),
    marginBottom: verticalScale(16),
    backgroundColor: '#fff',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  imageWrapper: {
    position: 'relative',
    width: horizontalScale(100),
    height: verticalScale(100),
    marginBottom: verticalScale(10),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: horizontalScale(8),
  },
  deleteButton: {
    position: 'absolute',
    top: verticalScale(5),
    right: horizontalScale(5),
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: verticalScale(3),
    borderRadius: horizontalScale(8),
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: scaleFontSize(12),
  },
  uploadButton: {
    marginBottom: verticalScale(20),
  },
  uploadButtonText: {
    fontSize: scaleFontSize(16),
    color: '#007BFF',
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: verticalScale(14),
    borderRadius: horizontalScale(8),
    alignItems: 'center',
  },
  updateButtonText: {
    fontSize: scaleFontSize(16),
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default style;
