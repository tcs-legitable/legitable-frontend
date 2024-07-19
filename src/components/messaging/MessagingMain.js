import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Messaging from './Messaging';
import Navbar from '../global-components/Navbar';
import MessageSidePreview from './MessageSidePreview';

const MessagingMain = () => {
  return (
    <Box
      backgroundColor='#fafafa'
      width='100vw'
      height='fitContent'
      minH='100vh'
    >
      <Navbar/>

      <Flex>
        <Box
          display='flex'
          flexDirection='column'
          w='500px'
          h='100vh'
          borderRight='1px solid #E8E8E8'
        >
          <Flex
            mt='28px'
            ml='30px'
            mb='30px'
          >
            <Text
              fontSize='18px'
              fontWeight='600'
              mt='2px'
            >
              Messages
            </Text>

            <Box
              w='30px'
              h='30px'
              backgroundColor='#ae7bef'
              borderRadius='8px'
              alignContent='center'
              textAlign='center'
              ml='12px'
            >
              <Text
                fontSize='12px'
                color='white'
              >
              1
              </Text>
            </Box>
          </Flex>

          <MessageSidePreview/>
        </Box>

        <Messaging/>

      </Flex>
    </Box>
  );
};

export default MessagingMain;
