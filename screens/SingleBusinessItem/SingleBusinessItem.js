import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import Badge from '../../components/Badge/Badge';
import Header from '../../components/Header/Header';
import style from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {Routes} from '../../navigation/Routes';
import Button from '../../components/Button/Button';

const defaultImageUrl =
  'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';

const {width} = Dimensions.get('window');

const SingleBusinessItem = ({navigation, route}) => {
  const {businessId} = route.params;
  const [business, setBusiness] = useState(null);
  const businesses = useSelector(state => state.businesses.items);

  useEffect(() => {
    const foundBusiness = businesses.find(item => item.id === businessId);
    if (foundBusiness) {
      setBusiness(foundBusiness);
    }
  }, [businesses, businessId]);

  const [activeIndex, setActiveIndex] = useState(0);

  if (!business) {
    return (
      <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const renderItem = ({item}) => (
    <Image
      source={{
        uri:
          item.startsWith('http') || item.startsWith('file://')
            ? item
            : defaultImageUrl,
      }}
      style={[style.image, {width: width - 60}]}
    />
  );

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (width - 40));
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false} style={style.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <FlatList
          data={business.businessPictures}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          style={style.imageCarousel}
          contentContainerStyle={style.imageCarouselContent}
          snapToInterval={width - 40}
          decelerationRate="fast"
          scrollEventThrottle={16}
        />
        <View style={style.dotsContainer}>
          {business.businessPictures.map((_, index) => (
            <View
              key={index}
              style={[
                style.dot,
                activeIndex === index ? style.activeDot : style.inactiveDot,
              ]}
            />
          ))}
        </View>
        <View style={style.badge}>
          <Badge title={business.industry} />
        </View>
        <View style={style.infoContainer}>
          <View style={style.card}>
            <Text style={style.label}>Business Name</Text>
            <Text style={style.businessName}>{business.businessName}</Text>
          </View>

          <View style={style.card}>
            <Text style={style.label}>Business Description</Text>
            <Text style={style.businessDescription}>
              {business.businessDescription}
            </Text>
          </View>

          <View style={style.card}>
            <Text style={style.label}>Address</Text>
            <Text style={style.address}>{business.address || 'N/A'}</Text>
          </View>
        </View>
        <Button
          title={'Donate'}
          onPress={() => navigation.navigate(Routes.Payment)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleBusinessItem;
