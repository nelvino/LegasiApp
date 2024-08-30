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

// Importing the useSelector and useDispatch hooks from the React Redux library
// The useSelector hook allows us to select and retrieve data from the store
// The useDispatch hook allows us to dispatch actions to update the store
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import Tab from '../../components/Tab/Tab';
import SingleDonationItem from '../../components/SingleDonationItem/SingleDonationItem';

import {Routes} from '../../navigation/Routes';
import {updateSelectedCategoryId} from '../../redux/reducers/Categories';
import {updateSelectedDonationId} from '../../redux/reducers/Donations';
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

import globalStyle from '../../assets/styles/globalStyle';
// eslint-disable-next-line no-unused-vars
import style from './style';

const Home = ({navigation}) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const donations = useSelector(state => state.donations);
  const businesses = useSelector(state => state.businesses.items);
  const industries = useSelector(state => state.industries.industries);
  console.log('user', user);
  const [donationItems, setDonationItems] = useState([]);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const categoryPageSize = 4;
  const defaultImageUrl =
    'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';

  useEffect(() => {
    const items = donations.items.filter(value =>
      value.categoryIds.includes(categories.selectedCategoryId),
    );
    setDonationItems(items);
  }, [categories.selectedCategoryId]);

  useEffect(() => {
    const getBusinesses = async () => {
      const fetchedBusinesses = await fetchBusinesses();
      console.log('Fetched Businesses:', fetchedBusinesses); // Log the fetched data
      dispatch(setBusinesses(fetchedBusinesses));
    };
    getBusinesses();
  }, [dispatch]);

  console.log('Businesses from Redux:', businesses);

  useEffect(() => {
    const getIndustries = async () => {
      const fetchedIndustries = await fetchIndustries();
      console.log('Fetched Industries:', fetchedIndustries); // Log the fetched data
      dispatch(setIndustries(fetchedIndustries));
    };
    getIndustries();
  }, [dispatch]);

  useEffect(() => {
    if (!isLoadingCategories) {
      setIsLoadingCategories(true);
      const newCategories = pagination(
        categories.categories,
        categoryPage,
        categoryPageSize,
      );
      if (newCategories.length > 0) {
        setCategoryList(prevState => [...prevState, ...newCategories]);
        setCategoryPage(prevState => prevState + 1); // Move this line inside condition
      }
      setIsLoadingCategories(false);
    }
  }, [categories.categories, categoryPage]);

  const pagination = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= items.length) {
      return [];
    }
    return items.slice(startIndex, endIndex);
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
          <View>
            <Pressable
              onPress={() => {
                navigation.navigate(Routes.UserProfile, {uid: user.uid}); // Pass uid as a parameter
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
              }}>
              <Header type={3} title={'Logout'} color={'#156CF7'} />
            </Pressable>
          </View>
        </View>
        <View style={style.searchBox}>
          <Search />
        </View>
        <Pressable style={style.highlightedImageContainer}>
          <Image
            style={style.highlightedImage}
            source={require('../../assets/images/highlighted_image.png')}
            resizeMode={'contain'}
          />
        </Pressable>
        <View style={style.categoryHeader}>
          <Header title={'Select Category'} type={2} />
        </View>
        <View style={style.categories}>
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (isLoadingCategories) {
                return;
              }
              setIsLoadingCategories(true);
              let newData = pagination(
                categories.categories,
                categoryPage,
                categoryPageSize,
              );
              if (newData.length > 0) {
                setCategoryList(prevState => [...prevState, ...newData]);
                setCategoryPage(prevState => prevState + 1);
              }
              setIsLoadingCategories(false);
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={categoryList}
            renderItem={({item}) => (
              <View style={style.categoryItem} key={item.categoryId}>
                <Tab
                  tabId={item.categoryId}
                  onPress={value => dispatch(updateSelectedCategoryId(value))}
                  title={item.name}
                  isInactive={item.categoryId !== categories.selectedCategoryId}
                />
              </View>
            )}
          />
        </View>
        <View style={style.donationItemsContainer}>
          {businesses.length > 0 ? (
            businesses.map((business, index) => {
              console.log(`Rendering business at index ${index}:`, business);

              return (
                <SingleBusinessItem
                  key={business.id}
                  businessId={business.id}
                  image={
                    business.businessPictures &&
                    business.businessPictures.length > 0
                      ? business.businessPictures[0]
                      : defaultImageUrl
                  }
                  businessName={business.businessName}
                  location={business.address || 'N/A'}
                  industry={business.industry || 'N/A'}
                  onPress={selectedBusinessId => {
                    console.log('Business selected:', selectedBusinessId); // Log the selected business ID
                    navigation.navigate('SingleBusinessItem', {
                      businessId: selectedBusinessId, // Pass the selected business ID to the new screen
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
        {donationItems.length > 0 && (
          <View style={style.donationItemsContainer}>
            {donationItems.map(value => {
              const categoryInformation = categories.categories.find(
                val => val.categoryId === categories.selectedCategoryId,
              );
              return (
                <View
                  key={value.donationItemId}
                  style={style.singleDonationItem}>
                  <SingleDonationItem
                    onPress={selectedDonationId => {
                      dispatch(updateSelectedDonationId(selectedDonationId));
                      navigation.navigate(Routes.SingleDonationItem, {
                        categoryInformation,
                      });
                    }}
                    donationItemId={value.donationItemId}
                    uri={value.image}
                    donationTitle={value.name}
                    badgeTitle={categoryInformation.name}
                    price={parseFloat(value.price)}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
