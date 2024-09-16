import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, Alert, Image} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import Header from '../../components/Header/Header';
import style from './style';
import {useSelector} from 'react-redux';
import Button from '../../components/Button/Button';
import {
  CardForm,
  StripeProvider,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import {STRIPE_PUBLISHABLE_KEY} from '../../constants/App';
import BackButton from '../../components/BackButton/BackButton';

const Payment = ({navigation}) => {
  const donationAmount = 1;

  const [isReady, setIsReady] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const {confirmPayment, loading} = useConfirmPayment();
  const user = useSelector(state => state.user);

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(
      'http://localhost:4000/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          currency: 'usd',
          amount: donationAmount * 100,
        }),
      },
    );
    const {clientSecret} = await response.json();
    return clientSecret;
  };

  const handlePayment = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();
    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethod,
    });

    if (error) {
      Alert.alert(
        'Error has occured with your payment',
        error.localizedMessage,
      );
    } else if (paymentIntent) {
      Alert.alert('Successful', 'The payment was confirmed successfully!');
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView contentContainerStyle={style.paymentContainer}>
      <BackButton onPress={() => navigation.goBack()} />
        <Header title={'Thanks for supporting our work!'} />
        <View style={style.logoContainer}>
          <Image
            source={require('../../assets/images/legasi_logo_naranja.png')}
            style={style.logo}
          />
        </View>
        <Text style={style.donationAmountDescription}>
          You are about to donate ${donationAmount}
        </Text>
        <View>
          <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
            <CardForm
              style={style.cardForm}
              onFormComplete={(cardDetails) => {
                setIsReady(cardDetails.complete); // Set the form as ready if it's complete
                setPaymentMethod(cardDetails);    // Store the payment method details
              }}
            />
          </StripeProvider>
        </View>
      </ScrollView>
      <View style={style.button}>
        <Button
          title={'Donate'}
          isDisabled={!isReady || loading}
          onPress={async () => await handlePayment()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Payment;
