import React from 'react';
// import StupaidLogo from './../../assets/images/stupaid-logo.svg';
import StupaidLogo from './../../assets/landing-page-images/stupaid-logo-main.svg';
import { Box, Button, Image } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      paddingTop="1.5vh"
      paddingLeft="1.5vw"
      paddingRight="1.5vw"
    >
      <Image w={{ base: '200px', mdLg: '150px' }} src={StupaidLogo} />

      <Box className="button-container">
        <Button border="1px solid" p="23px" borderRadius="25px">
          Post a project
        </Button>

        <Button
          border="1px solid"
          p="23px"
          borderRadius="25px"
          color="#fafafa"
          bgColor="#0c0c0c"
          fontWeight="regular"
          _hover={{
            backgroundPosition: 'left bottom',
          }}
          _active={{
            backgroundPosition: 'left bottom',
          }}
        >
          Sign up
        </Button>

        <Button border="1px solid" p="23px" borderRadius="25px">
          Log in
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
