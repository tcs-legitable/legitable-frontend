import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CreativeCard from './CreativeCard';
import { getAllUsers } from '../../firebase/helpers';

const Creatives = () => {
  const [creativesList, setCreativesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers();
      setCreativesList(users);
    };
    fetchData();
  }, []);

  return (
    <Flex display="flex" flexDirection="column">
      {creativesList.map((creative, index) => (
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
        // is_verified={creative.is_verified}
        />
      ))}
    </Flex>
  );
};

export default Creatives;
