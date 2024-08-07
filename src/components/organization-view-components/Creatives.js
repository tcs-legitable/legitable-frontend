import { Grid, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CreativeCard from './CreativeCard';
import { getAllUsers } from '../../firebase/helpers';

const Creatives = ({ filters }) => {
  const [creativesList, setCreativesList] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers();
      const shuffledUsers = shuffleArray(users);

      setCreativesList(shuffledUsers);
    };
    fetchData();
  }, []);

  const filteredCreativesList = creativesList.filter((creative) => {
    if (
      filters.skill &&
      !creative.skills.some((skill) => skill.skillName === filters.skill)
    ) {
      return false;
    }
    if (filters.location && !creative.city.includes(filters.location)) {
      return false;
    }
    if (filters.verified && !creative.isVerified) {
      return false;
    }
    return true;
  });

  return (
    <Flex w="100%" display="flex" flexDirection="column" alignItems="center">
      {filteredCreativesList.length > 0 ? (
        <Grid
          pl="20px"
          w="100%"
          templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
          gap={6}
        >
          {filteredCreativesList.map((creative) => {
            const skillImages = [];
            if (creative?.skills) {
              creative?.skills.map((skill) => {
                if (skill?.image) {
                  skillImages.push(skill?.image);
                }
              });
            }
            return (
              <CreativeCard
                key={creative?.uid}
                uid={creative?.uid}
                photo_url={creative?.photo_url}
                city={creative?.city}
                country={creative?.country}
                school={creative?.school}
                projectPref={creative?.projectPref}
                input_name={creative?.input_name}
                email={creative.email}
                skills={creative?.skills}
                skillImages={skillImages}
                // website={creative?.website || 'https://www.stupaid.work/'}
                isVerified={creative?.isVerified}
              />
            );
          })}
        </Grid>
      ) : (
        <Flex justifyContent="center" width="100%">
          <Text fontSize="20px">No results.</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Creatives;
