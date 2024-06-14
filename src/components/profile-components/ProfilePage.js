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
  const [loaded, setLoaded] = useState(false);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const tempData = await getUserData(userId);
      setUserData(tempData);
      setSkills(tempData.skills || []);
      setLoaded(true);
    };
    fetchUserData();
  }, [userId, value]);

  useEffect(() => {
    if (userId === value?.uid) {
      setCanEdit(true);
    }
  }, [userId]);

  const updateSkills = (updatedSkills) => {
    setSkills(updatedSkills);
    setUserData((prevUserData) => ({
      ...prevUserData,
      skills: updatedSkills,
    }));
  };

  return (
    <Flex w="100%" flexDir="column" h="inherit" bgColor="#fcfcfc">
      <Navbar />
      <Box p="30px">
        {loaded && (
          <ProfileUserInfo
            userId={userId}
            canEdit={canEdit}
            userData={userData}
          />
        )}
        {loaded && (
          <ProfileSkills
            canEdit={canEdit}
            skills={skills}
            updateSkills={updateSkills}
          />
        )}
      </Box>
    </Flex>
  );
};

export default ProfilePage;
