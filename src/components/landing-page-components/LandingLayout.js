import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import StupaidTCSLogo from '../../assets/images/stupaid-tcs-logo.svg';
import GoBackArrow from '../../assets/landing-page-images/go-back-arrow-black.svg';

const LandingLayout = ({ children, goPrev, step }) => {
  const isDesktop = useBreakpointValue({ base: false, mdLg: true });

  return (
    <Box
      position="relative"
      bg="transparent"
      w="100%"
      minH="100vh"
      overflow="hidden"
    >
      {step >= 1 && (
        <Button
          fontSize="15px"
          fontWeight="regular"
          pos="absolute"
          left="60px"
          top={{ base: '130px', md: '60px' }}
          bg="transparent"
          borderRadius="25px"
          color="#0c0c0c"
          outline="1px solid #0c0c0c"
          onClick={() => {
            goPrev();
          }}
          _hover={{
            outline: '2px solid #0c0c0c',
          }}
          _active={{
            outline: '2px solid #0c0c0c',
          }}
        >
          <Image src={GoBackArrow} pr="10px" />
          Go back
        </Button>
      )}
      <Flex
        direction="column"
        alignItems="center"
        minH={{ base: '760px', mdLg: '700px' }}
        justifyContent="center"
      >
        {children}
      </Flex>
    </Box>
  );
};

export default LandingLayout;
