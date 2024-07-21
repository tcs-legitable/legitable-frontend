import React, { useContext } from 'react';
import StupaidLogo from './../../assets/landing-page-images/stupaid-logo-main.svg';
import DefaultProfile from '../../assets/images/default-pfp.svg';
import WhiteCheckMark from '../../assets/images/white-check-mark.svg';
import Burger from '../../assets/images/burger.svg';
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
  useBreakpointValue,
} from '@chakra-ui/react';
import { SignedInContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import PrimaryButtonGrey from '../button-components/PrimaryButtonGrey';
import PrimaryButtonBlack from '../button-components/PrimaryButtonBlack';

const Navbar = () => {
  const { value } = useContext(SignedInContext);
  const isDesktop = useBreakpointValue({ base: false, mdLg: true });
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
      borderBottom="2px solid #ececec"
      mx="auto"
      mt="22px"
    >
      <Flex alignItems="center">
        <Image
          cursor="pointer"
          onClick={goLanding}
          mx="30px"
          w="120px"
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
          {isDesktop ? (
            <>
              <PrimaryButtonGrey
                onClick={() => {
                  navigate('/projects');
                }}
              >
                Find work
              </PrimaryButtonGrey>
              <PrimaryButtonGrey onClick={exploreCreatives}>
                Peers
              </PrimaryButtonGrey>
              <PrimaryButtonGrey onClick={goToOrganizationProfile}>
                My projects
              </PrimaryButtonGrey>
            </>
          ) : (
            <Menu>
              <MenuButton mr="10px" aria-label="Options" variant="outline">
                <PrimaryButtonGrey>
                  <Image src={Burger} />
                </PrimaryButtonGrey>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    navigate('/projects');
                  }}
                >
                  Find work
                </MenuItem>
                <MenuItem onClick={exploreCreatives}>Peers</MenuItem>
                <MenuItem onClick={goToOrganizationProfile}>
                  My projects
                </MenuItem>
              </MenuList>
            </Menu>
          )}

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
          {isDesktop ? (
            <>
              <PrimaryButtonGrey onClick={exploreCreatives}>
                Explore
              </PrimaryButtonGrey>
              <PrimaryButtonGrey onClick={goToOrganizationProfile}>
                My projects
              </PrimaryButtonGrey>
              <PrimaryButtonBlack onClick={createProject} mr="10px">
                <Image src={WhiteCheckMark} mr="9px" />
                Post a project
              </PrimaryButtonBlack>
            </>
          ) : (
            <Menu>
              <MenuButton mr="10px" aria-label="Options" variant="outline">
                <PrimaryButtonGrey>
                  <Image src={Burger} />
                </PrimaryButtonGrey>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={exploreCreatives}>Explore</MenuItem>
                <MenuItem onClick={goToOrganizationProfile}>
                  My projects
                </MenuItem>
                <MenuItem onClick={createProject}>Post a project</MenuItem>
              </MenuList>
            </Menu>
          )}
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
          <PrimaryButtonBlack onClick={login}>Sign up</PrimaryButtonBlack>
          <PrimaryButtonGrey onClick={login}>Log in</PrimaryButtonGrey>
        </Flex>
      )}
    </Box>
  );
};

export default Navbar;
