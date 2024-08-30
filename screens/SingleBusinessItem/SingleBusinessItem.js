import React, {useState} from 'react';
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

const defaultImageUrl =
  'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';

const {width} = Dimensions.get('window');

const SingleBusinessItem = ({navigation, route}) => {
  const {businessId} = route.params;
  const business = useSelector(state =>
    state.businesses.items.find(item => item.id === businessId),
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({item}) => (
    <Image
      source={{
        uri: item.startsWith('http') || item.startsWith('file://')
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
        <Header type={1} title={business.businessName} />
        <Text style={style.description}>{business.businessDescription}</Text>
        <Text style={style.infoText}>
          Location: {business.address || 'N/A'}
        </Text>
        <Text style={style.infoText}>
          Industry: {business.industry || 'N/A'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleBusinessItem;
