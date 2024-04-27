import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, VStack } from "@chakra-ui/react";
import { getEndorsees } from '../firebase/helpers';

const EndorseesPage = () => {
  const { userId } = useParams();
  const [endorsees, setEndorsees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEndorsees(userId);
      setEndorsees(data);
    };

    fetchData();
  }, [userId]);

  return (
    <Box>
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
