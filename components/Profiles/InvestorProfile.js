import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {updateProfile, updateRole} from '../../redux/reducers/User';
import style from './style';
import globalStyle from '../../assets/styles/globalStyle';

const InvestorProfile = () => {
  const [profile, setProfile] = useState({
    userName: '',
    bio: '',
    interests: [], // Initialize interests as an empty array
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
          const profileDoc = await firestore()
            .collection('users')
            .doc(uid)
            .get();
          if (profileDoc.exists) {
            const data = profileDoc.data().profile;
            setProfile({
              userName: data.userName || '',
              bio: data.bio || '',
              interests: data.interests || [], // Default to an empty array
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
    <ScrollView style={[globalStyle.backgroundWhite, style.scrollView]}>
      <Text style={style.title}>User Name</Text>
      <TextInput
        style={style.input}
        value={profile.userName}
        onChangeText={text => setProfile({...profile, userName: text})}
      />

      <Text style={style.title}>Bio</Text>
      <TextInput
        style={style.input}
        value={profile.bio}
        onChangeText={text => setProfile({...profile, bio: text})}
      />

      <Text style={style.title}>Interests</Text>
      <TextInput
        style={style.input}
        value={profile.interests.join(', ')} // Safely join interests array
        onChangeText={text =>
          setProfile({...profile, interests: text.split(', ')})
        }
      />

      <Text style={style.title}>Interested Industries</Text>
      <TextInput
        style={style.input}
        value={profile.interestedIndustries}
        onChangeText={text =>
          setProfile({...profile, interestedIndustries: text})
        }
      />

      <Text style={style.title}>Location</Text>
      <TextInput
        style={style.input}
        value={profile.location}
        onChangeText={text => setProfile({...profile, location: text})}
      />

      <TouchableOpacity
        style={style.updateButton}
        onPress={handleUpdateProfile}>
        <Text style={style.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default InvestorProfile;
