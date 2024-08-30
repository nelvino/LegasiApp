import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import Tab from '../../components/Tab/Tab';
import {Routes} from '../../navigation/Routes';
import {fetchBusinesses} from '../../api/businesses';
import {setBusinesses} from '../../redux/reducers/Businesses';
import {fetchIndustries} from '../../api/industries';
import {
  setIndustries,
  updateSelectedIndustryId,
} from '../../redux/reducers/Industries';
import SingleBusinessItem from '../../components/SingleBusinessItem/SingleBusinessItem';
import {resetToInitialState} from '../../redux/reducers/User';
import {logOut} from '../../api/user';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import globalStyle from '../../assets/styles/globalStyle';
import style from './style';

const Home = ({navigation}) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const industries = useSelector(state => state.industries);
  const businesses = useSelector(state => state.businesses.items);
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);

  const [industryPage, setIndustryPage] = useState(1);
  const [industryList, setIndustryList] = useState([]);
  const [isLoadingIndustries, setIsLoadingIndustries] = useState(false);
  const industryPageSize = 4;
  const defaultImageUrl =
    'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';

  useEffect(() => {
    const getBusinesses = async () => {
      const fetchedBusinesses = await fetchBusinesses();
      console.log('Fetched Businesses:', fetchedBusinesses);
      dispatch(setBusinesses(fetchedBusinesses));
    };
    getBusinesses();
  }, [dispatch]);

  useEffect(() => {
    const getIndustries = async () => {
      const fetchedIndustries = await fetchIndustries();
      console.log('Fetched Industries:', fetchedIndustries); // Log fetched industries
      // Add "All" option at the beginning of the industries list
      const industriesWithAllOption = [
        {industryId: 0, name: 'All'},
        ...fetchedIndustries,
      ];
      dispatch(setIndustries(industriesWithAllOption));
    };
    getIndustries();
  }, [dispatch]);

  useEffect(() => {
    console.log('Industries from Redux:', industries); // Log industries state from Redux
  }, [industries]);

  useEffect(() => {
    if (!isLoadingIndustries) {
      setIsLoadingIndustries(true);
      const newIndustries = pagination(
        industries.industries,
        industryPage,
        industryPageSize,
      );
      if (newIndustries.length > 0) {
        setIndustryList(prevState => [...prevState, ...newIndustries]);
        setIndustryPage(prevState => prevState + 1);
      }
      setIsLoadingIndustries(false);
    }
  }, [industries.industries, industryPage]);

  useEffect(() => {
    // Update filtered businesses whenever businesses or selected industry changes
    setFilteredBusinesses(
      businesses.filter(
        business =>
          industries.selectedIndustryId === 0 || // "All" option selected
          business.industry ===
            industries.industries.find(
              ind => ind.industryId === industries.selectedIndustryId,
            )?.name,
      ),
    );
  }, [businesses, industries.selectedIndustryId]);

  const pagination = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= items.length) {
      return [];
    }
    return items.slice(startIndex, endIndex);
  };

  const handleSearch = searchValue => {
    if (searchValue.trim() === '') {
      setFilteredBusinesses(businesses); // Reset to all businesses if search is empty
    } else {
      const lowercasedSearchValue = searchValue.toLowerCase();
      setFilteredBusinesses(
        businesses.filter(
          business =>
            business.businessName.toLowerCase().includes(lowercasedSearchValue) ||
            business.address.toLowerCase().includes(lowercasedSearchValue) ||
            business.businessDescription
              .toLowerCase()
              .includes(lowercasedSearchValue),
        ),
      );
    }
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.header}>
          <View>
            <Text style={style.headerIntroText}>Hello, </Text>
            <View style={style.username}>
              <Header title={user.displayName + ' 👋'} />
            </View>
          </View>
          <View style={style.headerIconsContainer}>
            <Pressable
              onPress={() => {
                navigation.navigate(Routes.UserProfile, {uid: user.uid});
              }}>
              <Image
                source={{uri: user.profileImage}}
                style={style.profileImage}
                resizeMode={'contain'}
              />
            </Pressable>
            <Pressable
              onPress={async () => {
                dispatch(resetToInitialState());
                await logOut();
              }}
              style={style.logoutIcon}>
              <FontAwesomeIcon icon={faSignOutAlt} size={24} color="#156CF7" />
            </Pressable>
          </View>
        </View>
        <View style={style.searchBox}>
          <Search onSearch={handleSearch} />
        </View>

        <View style={style.categoryHeader}>
          <Header title={'Select Industry'} type={2} />
        </View>
        <View style={style.categories}>
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (isLoadingIndustries) {
                return;
              }
              setIsLoadingIndustries(true);
              let newData = pagination(
                industries.industries,
                industryPage,
                industryPageSize,
              );
              if (newData.length > 0) {
                setIndustryList(prevState => [...prevState, ...newData]);
                setIndustryPage(prevState => prevState + 1);
              }
              setIsLoadingIndustries(false);
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={industryList}
            renderItem={({item}) => (
              <View style={style.categoryItem} key={item.industryId}>
                <Tab
                  tabId={item.industryId}
                  onPress={() =>
                    dispatch(updateSelectedIndustryId(item.industryId))
                  }
                  title={item.name || 'No Name'}
                  isInactive={item.industryId !== industries.selectedIndustryId}
                />
              </View>
            )}
          />
        </View>
        <View style={style.businessItemsContainer}>
          {filteredBusinesses.length > 0 ? (
            filteredBusinesses.map((business, index) => {
              console.log(`Rendering business at index ${index}:`, business);

              return (
                <SingleBusinessItem
                  key={business.id}
                  businessId={business.id}
                  image={
                    business.businessPictures &&
                    business.businessPictures.length > 0
                      ? business.businessPictures[0].startsWith('http') ||
                        business.businessPictures[0].startsWith('file://')
                        ? business.businessPictures[0]
                        : defaultImageUrl
                      : defaultImageUrl
                  }
                  businessName={business.businessName}
                  location={business.address || 'N/A'}
                  industry={business.industry || 'N/A'}
                  badgeTitle={business.industry || 'Industry'}
                  onPress={selectedBusinessId => {
                    console.log('Business selected:', selectedBusinessId);
                    navigation.navigate('SingleBusinessItem', {
                      businessId: selectedBusinessId,
                    });
                  }}
                />
              );
            })
          ) : (
            <View>
              <Text>No businesses available</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
