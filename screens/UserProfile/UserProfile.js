import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import BusinessOwnerProfile from '../../components/Profiles/BusinessOwnerProfile';
import InvestorProfile from '../../components/Profiles/InvestorProfile';
import globalStyle from '../../assets/styles/globalStyle';

const UserProfile = ({navigation, route}) => {
  const {uid} = route.params; // Extract uid from route parameters

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');

  useEffect(() => {
    console.log('Passed UID to Profile:', uid);
    const fetchUserRole = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            setRole(userDoc.data().role);
          } else {
            console.error('User document does not exist');
          }
        } else {
          console.error('User is not authenticated');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [uid]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={[globalStyle.backgroundWhite]}>
      {role === 'business_owner' && <BusinessOwnerProfile uid={uid} />}
      {role === 'investor' && <InvestorProfile uid={uid} />}
    </View>
  );
};

export default UserProfile;
