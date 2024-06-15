import React, { useContext } from 'react';
// import StupaidLogo from './../../assets/images/stupaid-logo.svg';
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

const Navbar = () => {
  const { value } = useContext(SignedInContext);
  const navigate = useNavigate();

  const login = () => {
    navigate('/landing');
  };

  const logout = () => {
    localStorage.removeItem('user-data');
    window.location.reload();
  };

  const goToProfile = () => {
    navigate('/user/' + value?.uid);
  };

  return (
    <Box
      w="100%"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      py="15px"
      paddingLeft="1.5vw"
      paddingRight="1.5vw"
      borderBottom="2px solid #ececec"
    >
      <Flex alignItems="center">
        <Image
          mx="30px"
          w={{ base: '150px', mdLg: '120px' }}
          src={StupaidLogo}
        />
        <Text fontWeight="thin" fontSize="20px" color="#555555">
          Hi,{' '}
          <Box as="span" textDecoration="underline 1.3px">
            {value === {} ? 'test_user' : value?.name}
          </Box>
        </Text>
      </Flex>

      {value?.type === 'student' ? (
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
          >
            My projects
          </Button>

          <Menu>
            <MenuButton
            // as={
            //   <Image
            //     _hover={{ cursor: 'pointer' }}
            //     w="55px"
            //     borderRadius="50%"
            //     src={value?.photo_url}
            //   />
            // }
            >
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
              {/* <Image
                _hover={{ cursor: 'pointer' }}
                w="55px"
                borderRadius="50%"
                src={value?.photo_url ? value.photo_url : DefaultProfile}
              /> */}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={goToProfile}>My profile</MenuItem>
              <MenuItem onClick={logout}>Log out</MenuItem>
            </MenuList>
          </Menu>
          {/* <Image
            _hover={{ cursor: 'pointer' }}
            w="55px"
            borderRadius="50%"
            src={value?.photo_url}
          /> */}
        </Flex>
      ) : (
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

          <Button
            onClick={login}
            border="1px solid"
            p="23px"
            borderRadius="25px"
          >
            Log in
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
