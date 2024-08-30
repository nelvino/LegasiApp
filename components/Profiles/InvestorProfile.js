import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {updateProfile, updateRole} from '../../redux/reducers/User';

const InvestorProfile = () => {
  const [profile, setProfile] = useState({
    userName: '',
    bio: '',
    interests: [],  // Initialize interests as an empty array
    idDocuments: [],
    interestedIndustries: '',
    location: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const uid = user.uid; // Use the authenticated user's UID directly
          const profileDoc = await firestore().collection('users').doc(uid).get();
          if (profileDoc.exists) {
            const data = profileDoc.data().profile;
            setProfile({
              userName: data.userName || '',
              bio: data.bio || '',
              interests: data.interests || [],  // Default to an empty array
              idDocuments: data.idDocuments || [],
              interestedIndustries: data.interestedIndustries || '',
              location: data.location || '',
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
      const user = auth().currentUser;
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
      <Text>User Name</Text>
      <TextInput
        value={profile.userName}
        onChangeText={text => setProfile({...profile, userName: text})}
      />

      <Text>Bio</Text>
      <TextInput
        value={profile.bio}
        onChangeText={text => setProfile({...profile, bio: text})}
      />

      <Text>Interests</Text>
      <TextInput
        value={profile.interests.join(', ')}  // Safely join interests array
        onChangeText={text =>
          setProfile({...profile, interests: text.split(', ')})
        }
      />

      <Text>Interested Industries</Text>
      <TextInput
        value={profile.interestedIndustries}
        onChangeText={text =>
          setProfile({...profile, interestedIndustries: text})
        }
      />

      <Text>Location</Text>
      <TextInput
        value={profile.location}
        onChangeText={text => setProfile({...profile, location: text})}
      />

      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </ScrollView>
  );
};

export default InvestorProfile;
