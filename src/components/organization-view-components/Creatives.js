import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CreativeCard from './CreativeCard';
import { getAllUsers, getAllWaitlistedUsers } from '../../firebase/helpers';

// LOTS OF TEMP CHANGES HERE

const Creatives = ({ filters }) => {
  const [creativesList, setCreativesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const users = await getAllUsers();

      // TEMP - will remove later
      const waitlistedUsers = await getAllWaitlistedUsers();
      // setCreativesList(users);
      setCreativesList(waitlistedUsers);
    };
    fetchData();
  }, []);

  const filteredCreativesList = creativesList.filter((creative) => {
    if (filters.skill && !creative.skills.includes(filters.skill)) {
      return false;
    }
    if (filters.location && !creative.city.includes(filters.location)) {
      return false;
    }
    if (
      filters.preference &&
      filters.preference !== 'any' &&
      creative.projectPref !== filters.preference
    ) {
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
        filteredCreativesList.map((creative, index) => {
          return (
            <CreativeCard
              key={index}
              // photo_url={creative.photo_url}
              photo_url={creative?.headshot}
              city={creative?.city}
              country={creative?.country}
              school={creative?.school}
              projectPref={creative?.projectPref}
              // full_name={creative.full_name}
              full_name={creative?.name}
              email={creative.email}
              skills={creative?.skills}
              website={creative?.website || 'https://www.stupaid.work/'}
              isVerified={creative?.isVerified}
            />
          );
        })
      ) : (
        <Flex justifyContent="center" width="100%">
          <Text fontSize="20px">No results.</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Creatives;
