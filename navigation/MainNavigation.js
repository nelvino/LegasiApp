import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import Home from '../screens/Home/Home';
import SingleDonationItem from '../screens/SingleDonationItem/SingleDonationItem';
import SingleBusinessItem from '../screens/SingleBusinessItem/SingleBusinessItem';
import Login from '../screens/Login/Login';
import Registration from '../screens/Registration/Registration';
import UserProfile from '../screens/UserProfile/UserProfile';

const Stack = createStackNavigator();

export const NonAuthenticated = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Login}
      screenOptions={{header: () => null, headerShown: false}}>
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.Registration} component={Registration} />
      </Stack.Navigator>
  );
};

export const Authenticated = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{header: () => null, headerShown: false}}>
      <Stack.Screen name={Routes.Home} component={Home} />
      <Stack.Screen name={Routes.UserProfile} component={UserProfile} />
      <Stack.Screen
        name={Routes.SingleBusinessItem}
        component={SingleBusinessItem}
      />
      <Stack.Screen
        name={Routes.SingleDonationItem}
        component={SingleDonationItem}
      />
    </Stack.Navigator>
  );
};

