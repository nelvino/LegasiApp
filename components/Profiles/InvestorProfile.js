import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  View,
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
    location: '',
    interests: '',
    interestedIndustries: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const uid = user.uid;
          const profileDoc = await firestore()
            .collection('users')
            .doc(uid)
            .get();
          if (profileDoc.exists) {
            const data = profileDoc.data().profile;
            setProfile({
              userName: user.displayName || '',
              bio: data.bio || '',
              location: data.location || '',
              interests: data.interests || '',
              interestedIndustries: data.interestedIndustries || '',
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

        // Update displayName in Firebase Auth
        await user.updateProfile({displayName: profile.userName});

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

      <Text style={style.title}>Location</Text>
      <TextInput
        style={style.input}
        value={profile.location}
        onChangeText={text => setProfile({...profile, location: text})}
      />

      <Text style={style.title}>Interests</Text>
      <TextInput
        style={style.input}
        value={profile.interests}
        onChangeText={text => setProfile({...profile, interests: text})}
      />

      <Text style={style.title}>Interested Industries</Text>
      <TextInput
        style={style.input}
        value={profile.interestedIndustries}
        onChangeText={text =>
          setProfile({...profile, interestedIndustries: text})
        }
      />

      <TouchableOpacity
        style={style.updateButton}
        onPress={handleUpdateProfile}>
        <Text style={style.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
      <View style={style.bottomSpacer} />
    </ScrollView>
  );
};

export default InvestorProfile;
