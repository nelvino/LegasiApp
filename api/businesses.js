import firestore from '@react-native-firebase/firestore';

export const fetchBusinesses = async () => {
  try {
    const usersSnapshot = await firestore()
      .collection('users')
      .where('role', '==', 'business_owner')
      .get();

    const businesses = usersSnapshot.docs
      .map(doc => {
        const data = doc.data().profile;
        return {
          id: doc.id,
          businessName: data.businessName,
          businessDescription: data.businessDescription,
          businessPictures: data.businessPictures,
          industry: data.industry,
          address: data.address,
          country: data.country,
        };
      })
      .filter(
        business =>
          business.businessName && business.address && business.industry,
      ); // Only include businesses with essential data

    console.log('Fetched Businesses:', businesses); // Log the fetched businesses

    return businesses;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return [];
  }
};

