import React, {useState, useEffect} from 'react';
import {Text, TextInput, Button, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {updateProfile, updateRole} from '../../redux/reducers/User';

const BusinessOwnerProfile = () => {
  const [profile, setProfile] = useState({
    businessName: '',
    businessDescription: '',
    businessPictures: [], // Initialized as an empty array
    industry: '',
    address: '',
    country: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth().currentUser; // Ensure the user is authenticated
        if (user) {
          const uid = user.uid; // Use the authenticated user's UID directly
          const profileDoc = await firestore()
            .collection('users')
            .doc(uid)
            .get();
          if (profileDoc.exists) {
            const data = profileDoc.data().profile;
            setProfile({
              businessName: data.businessName || '',
              businessDescription: data.businessDescription || '',
              businessPictures: data.businessPictures || [], // Default to an empty array
              industry: data.industry || '',
              address: data.address || '',
              country: data.country || '',
            });
            dispatch(updateProfile(data));
            dispatch(updateRole(profileDoc.data().role));
          } else {
            console.error('User document does not exist');
          }
        } else {
          console.error('User is not authenticated');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const user = auth().currentUser; // Ensure the user is authenticated
      if (user) {
        const uid = user.uid;
        await firestore()
          .collection('users')
          .doc(uid)
          .update({
            profile: {...profile},
            profileCompleted: true,
          });

        dispatch(updateProfile(profile));
        alert('Profile updated successfully');
      } else {
        console.error('User is not authenticated');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <ScrollView>
      <Text>Business Name</Text>
      <TextInput
        value={profile.businessName}
        onChangeText={text => setProfile({...profile, businessName: text})}
      />

      <Text>Business Description</Text>
      <TextInput
        value={profile.businessDescription}
        onChangeText={text =>
          setProfile({...profile, businessDescription: text})
        }
      />

      <Text>Industry</Text>
      <TextInput
        value={profile.industry}
        onChangeText={text => setProfile({...profile, industry: text})}
      />

      <Text>Address</Text>
      <TextInput
        value={profile.address}
        onChangeText={text => setProfile({...profile, address: text})}
      />

      <Text>Country</Text>
      <TextInput
        value={profile.country}
        onChangeText={text => setProfile({...profile, country: text})}
      />

      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </ScrollView>
  );
};

export default BusinessOwnerProfile;
