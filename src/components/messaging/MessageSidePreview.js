import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import pic from './../../assets/images/default-pfp.svg';

const MessageSidePreview = () => {
  return (
    <Flex
      ml='30px'
      cursor='pointer'
    >
      <Image src={pic} borderRadius="20px" w='42px'/>

      <Box
        ml='21px'
      >
        <Text
          fontSize='15px'
          fontWeight='500'
        >
          Stupaid Admin
        </Text>

        <Text
          w='200px'
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
          fontSize='14px'
        >
          Chat with us here!
        </Text>
      </Box>

      {/* <Text
        alignContent='end'
        fontSize='12px'
        color='#8c8c8c'
        ml='10px'
      >
        • 40 mins
      </Text> */}
    </Flex>
  );
};

export default MessageSidePreview;
