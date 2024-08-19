import { Box, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getOrganizationData, getUserData } from '../../firebase/helpers';
import pic from './../../assets/images/default-pfp.svg';

const MessagingHeader = ({userId}) => {
  const [userName, setUserName] = useState("");
  const [userPfp, setUserPfp] = useState(pic);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData(userId);
      const orgData = await getOrganizationData(userId);
      if (userData?.input_name) {
        setUserName(userData?.input_name);
      }
      if (orgData?.input_name) {
        setUserName(orgData?.input_name);
      }
      if (userData?.photo_url) {
        setUserPfp(userData?.photo_url || pic);
      }
      if (orgData?.photo_url) {
        setUserPfp(orgData?.photo_url || pic);
      }
    };
    fetchData();
  }, []);
  return (
    <Box
      w='100%'
      h='80px'
      display='flex'
      flexDirection='row'
      alignItems='center'
      borderBottom='1px solid #E8E8E8'
    >
      
      <Image src={userPfp} borderRadius="20px" w='42px' ml='30px' mt='18px' mb='18px'/>

      <Text
        ml='12px'
        fontSize='18px'
        fontWeight='600'
      >
        {userName}
      </Text>

    </Box>
  );
};

export default MessagingHeader;
