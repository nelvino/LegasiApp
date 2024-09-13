import React from 'react';
import {Image, View, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import Badge from '../Badge/Badge';
import Header from '../Header/Header';
import style from './style';

const SingleDonationItem = ({
  onPress = () => {},
  donationItemId,
  uri,
  badgeTitle,
  donationTitle,
  price,
}) => {
  return (
    <Pressable
      onPress={() => {
        onPress(donationItemId);
      }}>
      <View>
        <View style={style.badge}>
          <Badge title={badgeTitle} />
        </View>
        <Image
          resizeMode={'cover'}
          source={{uri}}
          style={style.image}
        />
      </View>
      <View style={style.donationInformation}>
        <Header
          title={donationTitle}
          type={3}
          color={'#0A043C'}
          numberOfLines={1}
        />
        <View style={style.price}>
          <Header
            title={`$${price.toFixed(2)}`}
            type={3}
            color={'#156CF7'}
          />
        </View>
      </View>
      <Header title={donationTitle} type={3} color={'#0A043C'} />
      <Header title={`$${price.toFixed(2)}`} type={3} color={'#9EC8BE'} />
    </Pressable>
  );
};

SingleDonationItem.propTypes = {
  donationItemId: PropTypes.number.isRequired,
  uri: PropTypes.string.isRequired,
  badgeTitle: PropTypes.string.isRequired,
  donationTitle: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

export default SingleDonationItem;
