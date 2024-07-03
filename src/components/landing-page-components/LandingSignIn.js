import { Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import StupaidLogo from '../../assets/landing-page-images/stupaid-logo-small.svg';
import GmailArrow from '../../assets/landing-page-images/continue-w-gmail-arrow-black.svg';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebase';
import { doesUserExist, getUserData } from '../../firebase/helpers';
import { useNavigate } from 'react-router-dom';
import { SignedInContext } from '../../App';

const LandingSignIn = ({ goNext, setData }) => {
  const navigate = useNavigate();
  const { setValue } = useContext(SignedInContext);

  const handleClick = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);

      const { uid, email, displayName } = user;
      const exists = await doesUserExist(uid);
      let newInfo = {};
      if (exists) {
        const info = await getUserData(uid);
        newInfo = {
          uid: uid,
          name: info?.input_name,
          type: 'student',
          photo_url: info?.photo_url,
        };
      } else {
        newInfo = {
          uid: uid,
          name: displayName,
          type: 'student',
          photo_url: null,
        };
      }
      localStorage.setItem('view', 'student');
      setValue(newInfo);

      if (exists) {
        navigate('/projects');
      }

      const data = {
        uid: uid,
        input_name: displayName,
        first_name: displayName.split(' ')[0],
        email: email,
        photo_url: null,
      };
      setData(data);

      goNext();
    } catch (error) {
      console.error('An error occurred during sign-in:', error);
    }
  };

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
        w={{ base: '200px', mdLg: '150px' }}
        src={StupaidLogo}
      />
      <VStack spacing="0px" fontSize="20px">
        <Text pt="15px">Sign in with your Gmail to begin</Text>
      </VStack>
      <Flex
        justifyContent="center"
        w="100%"
        flexDir={{ base: 'column', mdLg: 'row' }}
        bg="transparent"
        pt="25px"
      >
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
          onClick={() => handleClick()}
        >
          Continue with Gmail
          <Image pl="10px" src={GmailArrow} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default LandingSignIn;
