import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import pic from './../../assets/images/default-pfp.svg';

const MessagingHeader = () => {
  return (
    <Box
      w='100%'
      h='80px'
      display='flex'
      flexDirection='row'
      alignItems='center'
      borderBottom='1px solid #E8E8E8'
    >
      
      <Image src={pic} borderRadius="20px" w='42px' ml='30px' mt='18px' mb='18px'/>

      <Text
        ml='12px'
        fontSize='18px'
        fontWeight='600'
      >
        Alan Wang
      </Text>

    </Box>
  );
};

export default MessagingHeader;
