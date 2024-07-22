import { Box, Flex, Input } from '@chakra-ui/react';
import React from 'react';

const SendMessage = () => {
  return (
    <Flex
      bottom='0'
      left='0'
      right='0'
      p='10px'
      backgroundColor='white'
      zIndex='1000'
    >
      <Box
        w='40px'
        h='40px'
        borderRadius='8px'
        backgroundColor='#fafafa'
        border='1px solid #ececec'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        hi
      </Box>

      <Input 
        placeholder='Message...'
        ml='12px'
        w='100%'
        border='1px solid #ececec'
        backgroundColor='#fafafa'
      />
    </Flex>
  );
};

export default SendMessage;
