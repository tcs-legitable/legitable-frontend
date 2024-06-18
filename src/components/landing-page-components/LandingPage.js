import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import StupaidLogo from '../../assets/landing-page-images/stupaid-logo-main.svg';
import TalentButtonIcon from '../../assets/landing-page-images/landing-talent.svg';
import StudentButtonIcon from '../../assets/landing-page-images/landing-student.svg';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ goNext }) => {
  const navigate = useNavigate();

  return (
    <Flex
      zIndex="0"
      bg="transparent"
      flexDir="column"
      alignItems="center"
      pb="0px"
    >
      <Image
        bg="transparent"
        w={{ base: '300px', mdLg: '250px' }}
        src={StupaidLogo}
      />
      <VStack spacing="0px" fontSize="20px">
        <Text textAlign="center" w={{ base: '300px', mdLg: '420px' }} pt="15px">
          Welcome to{' '}
          <Box color="#969696" as="span">
            Stupaid
          </Box>
          !
        </Text>
        <Text textAlign="center" w={{ base: '330px', mdLg: '420px' }} pt="15px">
          A platform for connecting passionate business owners to eager creative
          students to work on cool projects.
        </Text>
      </VStack>
      <Flex
        w="100%"
        flexDir={{ base: 'column', mdLg: 'row' }}
        bg="transparent"
        pt="25px"
        justify="center"
      >
        <Button
          border="1px solid"
          p="23px"
          borderRadius="25px"
          color="#0c0c0c"
          bg="transparent"
          bgGradient="linear(to-r, #c9c9c9 0%, #fafafa 80%)"
          backgroundSize="200% 100%"
          backgroundPosition="right bottom"
          transition="background-position 0.5s ease"
          fontWeight="thin"
          _hover={{
            backgroundPosition: 'left bottom',
          }}
          _active={{
            backgroundPosition: 'left bottom',
          }}
          mr={{ base: '0px', mdLg: '10px' }}
          onClick={() => navigate('/home')}
        >
          <Image bgColor="inherit" mr="5px" src={TalentButtonIcon} />
          I'm looking for talent
        </Button>
        <Button
          border="1px solid"
          p="23px"
          borderRadius="25px"
          color="#0c0c0c"
          bg="transparent"
          bgGradient="linear(to-r, #c9c9c9 20%, #fafafa 80%)"
          backgroundSize="200% 100%"
          backgroundPosition="right bottom"
          transition="background-position 0.5s ease"
          fontWeight="thin"
          _hover={{
            backgroundPosition: 'left bottom',
          }}
          _active={{
            backgroundPosition: 'left bottom',
          }}
          ml={{ base: '0px', mdLg: '10px' }}
          mt={{ base: '10px', mdLg: '0px' }}
          onClick={() => goNext()}
        >
          <Image bgColor="inherit" mr="5px" src={StudentButtonIcon} /> I'm a
          student
        </Button>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
