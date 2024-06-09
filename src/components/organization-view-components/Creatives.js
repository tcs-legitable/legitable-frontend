import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CreativeCard from './CreativeCard';
import { getAllUsers } from '../../firebase/helpers';

const Creatives = ({ filters }) => {
  const [creativesList, setCreativesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers();
      setCreativesList(users);
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
    if (filters.preference && creative.projectPref !== filters.preference) {
      return false;
    }
    if (filters.verified && !creative.isVerified) {
      return false;
    }
    return true;
  });

  return (
    <Flex display="flex" flexDirection="column">
      {filteredCreativesList.map((creative, index) => (
        <CreativeCard
          key={index}
          photo_url={creative.photo_url}
          city={creative.city}
          country={creative.country}
          school={creative.school}
          projectPref={creative.projectPref}
          full_name={creative.full_name}
          email={creative.email}
          skills={creative.skills}
          website={creative.website || 'https://www.stupaid.work/'}
          isVerified={creative.isVerified}
        />
      ))}
    </Flex>
  );
};

export default Creatives;
