import { Box, Flex, Input } from '@chakra-ui/react';
import React from 'react';

const SendMessage = () => {
  return (
    <Flex
      position='absolute'
      bottom='0'
      ml='30px'
      mb='30px'
      w='71%'
    >
      <Box
        w='40px'
        h='40px'
        borderRadius='8px'
        backgroundColor='#e8e8e8'
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
      />
    </Flex>
  );
};

export default SendMessage;
