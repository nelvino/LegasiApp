import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';

import style from './style';

const Header = ({
  title = '',
  type = 1,
  color = '#000',
  numberOfLines = 1,
  align = 'left',
}) => {
  return (
    <Text
      style={[
        style[`header${type}`],
        {color, textAlign: align},
      ]}
      numberOfLines={numberOfLines}>
      {title}
    </Text>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  type: PropTypes.number,
  color: PropTypes.string,
  numberOfLines: PropTypes.number,
  align: PropTypes.string,
};

export default Header;
