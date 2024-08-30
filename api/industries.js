import firestore from '@react-native-firebase/firestore';

export const fetchIndustries = async () => {
  try {
    const usersSnapshot = await firestore()
      .collection('users')
      .where('role', '==', 'business_owner')
      .get();

    const industriesSet = new Set();
    usersSnapshot.docs.forEach(doc => {
      const data = doc.data().profile;
      if (data.industry) {
        industriesSet.add(data.industry);
      }
    });

    const industries = Array.from(industriesSet);

    console.log('Fetched Industries:', industries); // Log the fetched industries

    return industries;
  } catch (error) {
    console.error('Error fetching industries:', error);
    return [];
  }
};
