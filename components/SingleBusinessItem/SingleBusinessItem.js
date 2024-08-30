import React from 'react';
import {Image, View, Pressable, Text} from 'react-native';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import style from './style';

const SingleBusinessItem = ({
  businessId,
  image,
  businessName,
  location,
  industry,
  onPress,
}) => {
  console.log('Rendering SingleBusinessItem for:', businessId);

  return (
    <Pressable onPress={() => onPress(businessId)}>
      <View style={style.container}>
        <Image resizeMode={'cover'} source={{uri: image}} style={style.image} />
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
  onPress: PropTypes.func.isRequired,
};

export default SingleBusinessItem;
