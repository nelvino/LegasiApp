import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import style from './style';

const Button = ({onPress = () => {}, title = 'Button', disabled = false}) => {
  return (
    <TouchableOpacity
      style={[style.button, disabled && style.disabledButton]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={style.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
