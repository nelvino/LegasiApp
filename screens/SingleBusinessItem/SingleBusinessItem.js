import React from 'react';
import {useSelector} from 'react-redux';
import {Image, SafeAreaView, ScrollView, View, Text} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import Header from '../../components/Header/Header';
import style from './style';
import globalStyle from '../../assets/styles/globalStyle';

const SingleBusinessItem = ({navigation, route}) => {
  const {businessId} = route.params; // Get the businessId from the route parameters
  const business = useSelector(state =>
    state.businesses.items.find(item => item.id === businessId),
  );
  const defaultImageUrl =
    'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false} style={style.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <Image
          source={{
            uri:
              business.businessPictures.length > 0
                ? business.businessPictures[0]
                : defaultImageUrl,
          }}
          style={style.image}
        />
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
