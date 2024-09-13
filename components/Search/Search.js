import React, {useRef, useState} from 'react';
import {Pressable, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {scaleFontSize} from '../../assets/styles/scaling';
import style from './style';

const Search = ({
  onSearch = () => {},
  placeholder = 'Search',
}) => {
  const textInputRef = useRef(null);
  const [search, setSearch] = useState('');

  const handleFocus = () => {
    textInputRef.current.focus();
  };

  const handleSearch = searchValue => {
    setSearch(searchValue);
    onSearch(searchValue); // Call the onSearch prop with the search value
  };

  return (
    <Pressable style={style.searchInputContainer} onPress={handleFocus}>
      <FontAwesomeIcon
        icon={faSearch}
        color={'#9EC8BE'}
        size={scaleFontSize(22)}
      />
      <TextInput
        placeholder={placeholder}
        ref={textInputRef}
        style={style.searchInput}
        value={search}
        onChangeText={value => handleSearch(value)}
      />
    </Pressable>
  );
};

Search.propTypes = {
  onPress: PropTypes.func,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired, // Ensure this prop is passed and is a function
};

export default Search;
