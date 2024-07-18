import React, { useContext, useEffect } from 'react';
import StupaidLogo from './../../assets/landing-page-images/stupaid-logo-main.svg';
import DefaultProfile from '../../assets/images/default-pfp.svg';
import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { SignedInContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = () => {
  const { value } = useContext(SignedInContext);
  const navigate = useNavigate();

  const goLanding = () => {
    navigate('/landing');
  };

  const login = () => {
    navigate('/organization-signup');
  };

  const exploreCreatives = () => {
    navigate('/home');
  };

  const createProject = () => {
    navigate('/new-project');
  };

  const logout = async () => {
    try {
      const auth = getAuth();
      localStorage.removeItem('view');
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
    window.location.reload();
  };

  const goToProfile = () => {
    navigate('/user/' + value?.uid);
  };

  const goToOrganizationProfile = () => {
    navigate('/organization/' + value?.uid);
  };

  return (
    <Box
      w="97vw"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      py="15px"
      paddingLeft="0.7vw"
      paddingRight="0.7vw"
      borderBottom="2px solid #ececec"
      margin="auto"
    >
      <Flex alignItems="center">
        <Image
          cursor="pointer"
          onClick={goLanding}
          mx="30px"
          w={{ base: '150px', mdLg: '120px' }}
          src={StupaidLogo}
        />
        {value?.name && (
          <Text fontWeight="thin" fontSize="20px" color="#555555">
            Hi,{' '}
            <Box as="span" textDecoration="underline 1.3px">
              {value === {} ? 'test_user' : value.name}
            </Box>
          </Text>
        )}
      </Flex>
      {value?.type === 'student' && (
        <Flex
          mr="40px"
          gap="15px"
          className="button-container"
          alignItems="center"
        >
          <Button
            bg="transparent"
            border="1px solid"
            py="20px"
            px="30px"
            borderRadius="25px"
            fontWeight="thin"
            onClick={() => {
              navigate('/projects');
            }}
            _hover={{
              bgColor: '#e2e2e2',
            }}
            _active={{
              bgColor: '#e2e2e2',
            }}
          >
            My explore
          </Button>

          <Button
            border="1px solid #0c0c0c"
            py="20px"
            px="30px"
            borderRadius="25px"
            color="#fafafa"
            bgColor="#0c0c0c"
            fontWeight="regular"
            _hover={{
              bgColor: '#2e2e2e',
            }}
            _active={{
              bgColor: '#2e2e2e',
            }}
            onClick={goToOrganizationProfile}
          >
            My projects
          </Button>

          <Menu>
            <MenuButton>
              <Box
                borderRadius="100%"
                w="60px"
                h="60px"
                alignContent="center"
                backgroundImage={
                  value?.photo_url ? value.photo_url : DefaultProfile
                }
                backgroundColor="#dbdbdb"
                backgroundSize="cover"
                backgroundPosition="center"
                position="relative"
                align="center"
              ></Box>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={goToProfile}>My profile</MenuItem>
              <MenuItem onClick={logout}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
      {value?.type === 'organization' && (
        <Flex alignItems="center" gap="10px" className="button-container">
          <Button
            p="23px"
            bg="transparent"
            border="1px solid"
            py="20px"
            px="30px"
            borderRadius="25px"
            fontWeight="thin"
            _hover={{
              bgColor: '#e2e2e2',
            }}
            _active={{
              bgColor: '#e2e2e2',
            }}
            onClick={exploreCreatives}
          >
            Explore creatives
          </Button>
          <Button
            p="23px"
            bg="transparent"
            border="1px solid"
            py="20px"
            px="30px"
            borderRadius="25px"
            fontWeight="thin"
            _hover={{
              bgColor: '#e2e2e2',
            }}
            _active={{
              bgColor: '#e2e2e2',
            }}
            onClick={createProject}
          >
            Post a project
          </Button>

          <Button
            borderRadius="25px"
            color="#fafafa"
            bgColor="#0c0c0c"
            fontWeight="regular"
            border="1px solid #0c0c0c"
            py="20px"
            px="25px"
            _hover={{
              bgColor: '#2e2e2e',
            }}
            _active={{
              bgColor: '#2e2e2e',
            }}
            onClick={goToOrganizationProfile}
          >
            My projects
          </Button>
          <Menu>
            <MenuButton>
              <Box
                borderRadius="100%"
                w="60px"
                h="60px"
                alignContent="center"
                backgroundImage={
                  value?.photo_url ? value.photo_url : DefaultProfile
                }
                backgroundColor="#dbdbdb"
                backgroundSize="cover"
                backgroundPosition="center"
                position="relative"
                align="center"
              ></Box>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logout}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
      {!value?.type && (
        <Flex gap="10px" className="button-container">
          <Button
            borderRadius="25px"
            color="#fafafa"
            bgColor="#0c0c0c"
            fontWeight="regular"
            border="1px solid #0c0c0c"
            py="20px"
            px="25px"
            _hover={{
              bgColor: '#2e2e2e',
            }}
            _active={{
              bgColor: '#2e2e2e',
            }}
            onClick={login}
          >
            Sign up
          </Button>

          <Button
            onClick={login}
            p="23px"
            bg="transparent"
            border="1px solid"
            py="20px"
            px="30px"
            borderRadius="25px"
            fontWeight="thin"
            _hover={{
              bgColor: '#e2e2e2',
            }}
            _active={{
              bgColor: '#e2e2e2',
            }}
          >
            Log in
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Navbar;
