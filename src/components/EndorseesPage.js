import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, VStack } from '@chakra-ui/react';
import { doc, updateDoc, getDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/firebase';
// import { getEndorsees } from '../firebase/helpers';

const EndorseesPage = () => {
  const { userId } = useParams();
  const [endorsees, setEndorsees] = useState([]);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const updateViewsAndGetEndorsees = async () => {
      const userRef = doc(db, 'users', userId);

      await updateDoc(userRef, {
        viewCount: increment(1),
      });

      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setViewCount(userData.viewCount);
        setEndorsees(userData.endorsees || []);
      }
    };

    updateViewsAndGetEndorsees();
  }, [userId]);

  return (
    <Box>
      <Text>Page Views: {viewCount}</Text>
      <VStack>
        {endorsees.map((endorsee, index) => (
          <Box key={index}>
            <Text>Name: {endorsee.name}</Text>
            <Text>Email: {endorsee.email}</Text>
            <Text>Skill: {endorsee.skill}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default EndorseesPage;
