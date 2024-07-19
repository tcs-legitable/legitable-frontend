import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Messaging from './Messaging';
import Navbar from '../global-components/Navbar';

const MessagingMain = () => {
  return (
    <Box
      backgroundColor="#fafafa"
      width="100vw"
      height="fitContent"
      minH="100vh"
    >
      <Navbar/>

      <Flex>
        <Messaging/>
      </Flex>
    </Box>
  );
};

export default MessagingMain;
