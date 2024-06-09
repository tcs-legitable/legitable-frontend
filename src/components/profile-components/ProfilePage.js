import { Box, Flex } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SignedInContext } from '../../App';
import { getUserData } from '../../firebase/helpers';
import Navbar from '../global-components/Navbar';
import ProfileSkills from './ProfileSkills';
import ProfileUserInfo from './ProfileUserInfo';

const ProfilePage = () => {
  const { userId } = useParams();
  const { value } = useContext(SignedInContext);
  const [canEdit, setCanEdit] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const tempData = await getUserData(userId);
      setUserData(tempData);
    };
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    console.log(userData, ' is the data');
  }, [userData]);

  useEffect(() => {
    if (userId === value?.uid) {
      setCanEdit(true);
    }
  }, [userId]);
  return (
    <Flex w="100%" flexDir="column" h="inherit" bgColor="#fcfcfc">
      <Navbar />
      <Box p="30px">
        <ProfileUserInfo canEdit={canEdit} userData={userData} />
        <ProfileSkills userData={userData} />
      </Box>
    </Flex>
  );
};

export default ProfilePage;