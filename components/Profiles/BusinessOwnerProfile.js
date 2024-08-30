import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker
import { updateProfile, updateRole } from '../../redux/reducers/User';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component
import style from './style';
import globalStyle from '../../assets/styles/globalStyle';

const industriesList = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Transportation",
  "Construction",
  "Energy",
  "Telecommunications",
  "Real Estate",
  "Agriculture",
  "Entertainment",
  "Hospitality",
  "Legal Services"
];

const BusinessOwnerProfile = () => {
  const [profile, setProfile] = useState({
    businessName: '',
    businessDescription: '',
    businessPictures: [], // Array to store image URIs
    industry: '',
    address: '',
    country: '',
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
              businessName: data.businessName || '',
              businessDescription: data.businessDescription || '',
              businessPictures: data.businessPictures || [], // Load existing pictures
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

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 3 }, response => {
      // Allow up to 3 images
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImages = response.assets.map(asset => asset.uri);
        setProfile({
          ...profile,
          businessPictures: [...profile.businessPictures, ...selectedImages],
        });
      }
    });
  };

  const handleDeleteImage = index => {
    const updatedPictures = profile.businessPictures.filter(
      (_, i) => i !== index,
    );
    setProfile({ ...profile, businessPictures: updatedPictures });
  };

  const handleUpdateProfile = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const uid = user.uid;
        await firestore()
          .collection('users')
          .doc(uid)
          .update({
            profile: { ...profile },
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
      <Text style={style.title}>Business Name</Text>
      <TextInput
        style={style.input}
        value={profile.businessName}
        onChangeText={text => setProfile({ ...profile, businessName: text })}
      />

      <Text style={style.title}>Business Description</Text>
      <TextInput
        style={style.input}
        value={profile.businessDescription}
        onChangeText={text =>
          setProfile({ ...profile, businessDescription: text })
        }
      />

      <Text style={style.title}>Industry</Text>
      <View style={style.pickerContainer}>
        <Picker
          selectedValue={profile.industry}
          onValueChange={itemValue =>
            setProfile({ ...profile, industry: itemValue })
          }>
          {industriesList.map(industry => (
            <Picker.Item key={industry} label={industry} value={industry} />
          ))}
        </Picker>
      </View>

      <Text style={style.title}>Address</Text>
      <TextInput
        style={style.input}
        value={profile.address}
        onChangeText={text => setProfile({ ...profile, address: text })}
      />

      <Text style={style.title}>Country</Text>
      <TextInput
        style={style.input}
        value={profile.country}
        onChangeText={text => setProfile({ ...profile, country: text })}
      />

      <Text style={style.title}>Business Pictures</Text>
      <View style={style.imageContainer}>
        {profile.businessPictures.map((image, index) => (
          <View key={index} style={style.imageWrapper}>
            <Image source={{ uri: image }} style={style.image} />
            <TouchableOpacity style={style.deleteButton} onPress={() => handleDeleteImage(index)}>
              <Text style={style.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={style.uploadButton} onPress={handleImageUpload}>
          <Text style={style.uploadButtonText}>Upload Images</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={style.updateButton} onPress={handleUpdateProfile}>
        <Text style={style.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
      <View style={style.bottomSpacer} />
    </ScrollView>
  );
};

export default BusinessOwnerProfile;
