import firestore from '@react-native-firebase/firestore';

export const fetchIndustries = async () => {
  try {
    const usersSnapshot = await firestore()
      .collection('users')
      .where('role', '==', 'business_owner')
      .get();

    const industriesMap = new Map();
    let idCounter = 1; // Start a counter for industry IDs

    usersSnapshot.docs.forEach(doc => {
      const data = doc.data().profile;
      if (data.industry && !industriesMap.has(data.industry)) {
        industriesMap.set(data.industry, { industryId: idCounter++, name: data.industry });
      }
    });

    const industries = Array.from(industriesMap.values());

    console.log('Fetched Industries:', industries); // Log the fetched industries

    return industries;
  } catch (error) {
    console.error('Error fetching industries:', error);
    return [];
  }
};
