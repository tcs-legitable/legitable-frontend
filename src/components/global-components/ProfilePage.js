import { Flex } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SignedInContext } from '../../App';

const ProfilePage = () => {
  const { userId } = useParams();
  const { value } = useContext(SignedInContext);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    console.log(userId, ' is the userId');
    if (userId === value?.uid) {
      setCanEdit(true);
    }
  }, [userId]);
  return (
    <Flex w="100%" h="inherit" bgColor="#fcfcfc">
      ProfilePage
    </Flex>
  );
};

export default ProfilePage;
