import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import GoBackArrow from '../../assets/landing-page-images/go-back-arrow-black.svg';
import PrimaryButtonGrey from '../button-components/PrimaryButtonGrey';

const LandingLayout = ({ children, goPrev, step }) => {
  return (
    <Box
      position="relative"
      bg="transparent"
      w="100%"
      minH="100vh"
      overflow="hidden"
    >
      {step >= 1 && (
        <PrimaryButtonGrey
          pos="absolute"
          onClick={() => {
            goPrev();
          }}
          left="60px"
          top={{ base: '60px', md: '60px' }}
        >
          <Image src={GoBackArrow} pr="10px" />
          Go back
        </PrimaryButtonGrey>
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
