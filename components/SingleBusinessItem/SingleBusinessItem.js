import React from 'react';
import {Image, View, Pressable, Text} from 'react-native';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import style from './style';
import Badge from '../Badge/Badge';

const SingleBusinessItem = ({
  businessId,
  image,
  businessName,
  location,
  industry,
  badgeTitle,  // Ensure this prop is passed
  onPress,
}) => {
  console.log('Rendering SingleBusinessItem for:', businessId);

  return (
    <Pressable onPress={() => onPress(businessId)} style={style.container}>
      <View>
        <View style={style.badge}>
          <Badge title={badgeTitle} />
        </View>
        <Image resizeMode={'cover'} source={{uri: image}} style={style.image} />
      </View>
      <View style={style.businessInformation}>
        <Header
          title={businessName}
          type={3}
          color={'#0A043C'}
          numberOfLines={1}
        />
        <Text style={style.location}>Location: {location}</Text>
        <Text style={style.industry}>Industry: {industry}</Text>
      </View>
    </Pressable>
  );
};

SingleBusinessItem.propTypes = {
  businessId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  businessName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  industry: PropTypes.string.isRequired,
  badgeTitle: PropTypes.string.isRequired,  // Marking this as required
  onPress: PropTypes.func.isRequired,
};

export default SingleBusinessItem;
