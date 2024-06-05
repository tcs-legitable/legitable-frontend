import { Box, Button, Image, Text, Fade } from '@chakra-ui/react';
import { signInWithPopup } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { SignedInContext } from '../App';
import { auth, provider } from '../firebase/firebase';
import { addUser } from '../firebase/helpers';
import { ReactComponent as Logo } from '../assets/images/tcs-logo.svg';
import googleLogo from '../assets/images/google-logo.png';

const NotLoggedIn = () => {
  const { setValue } = useContext(SignedInContext);
  const [show, setShow] = useState(false);

  const handleClick = async () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const { uid, email, displayName, photoURL } = user;
        addUser(uid, displayName, email, photoURL);
        setValue(uid);

        localStorage.setItem('user-uid', uid);
      })
      .then(() => {});
  };

  useEffect(() => {
    setValue(localStorage.getItem('user-uid'));
    let timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box w="100%" h="90vh">
      <Box
        margin="30px"
        w="fit-content"
        _hover={{ cursor: 'pointer' }}
        onClick={() => {
          window.open('https://www.thecreativesolution.ca/', '_blank');
        }}
      >
        <Logo width="50px" />
      </Box>
      <Box
        pt="20px"
        display="flex"
        flexDir="column"
        alignItems="center"
        textAlign="center"
        w="100%"
        maxH="100vh"
      >
        <Fade in={show} transition={{ enter: { duration: 1.5 } }}>
          <Box
            w={{ base: '380px', md: '800px' }}
            fontWeight="bold"
            fontSize={{ base: '34px', md: '40px' }}
          >
            <Text as="span">Welcome to </Text>
            <Text color="#808080" as="span">
              Legitable
            </Text>
            <Text as="span">
              : A Gateway to Legitimate Connections for Introverts
            </Text>
          </Box>
        </Fade>
        <Fade in={show} transition={{ enter: { duration: 1.5, delay: 0.5 } }}>
          <Text
            w={{ base: '370px', md: '630px' }}
            pt={{ base: '35px', md: '50px' }}
            fontSize={{ base: '22px', md: '30px' }}
          >
            Harness the power of trusted networks to spotlight talent within
            every circle
          </Text>
        </Fade>
        <Fade in={show} transition={{ enter: { duration: 1.5, delay: 1 } }}>
          <Text
            fontSize={{ base: '29px', md: '40px' }}
            pt={{ base: '35px', md: '50px' }}
          >
            Join. Curate. Share.
          </Text>
        </Fade>
        <Fade in={show} transition={{ enter: { duration: 1.5, delay: 1.5 } }}>
          <Button
            mt={{ base: '40px', md: '50px' }}
            textColor="#EAEAEA"
            _hover={{
              bgColor: '#3C3C3C',
            }}
            bgColor="#545454"
            onClick={handleClick}
            p="20px"
            py="30px"
            fontWeight="medium"
            mb="40px"
          >
            <Image
              boxSize={10}
              color="pink"
              bgColor="inherit"
              src={googleLogo}
            />
            Sign In With Google
          </Button>
        </Fade>
      </Box>
    </Box>
  );
};

export default NotLoggedIn;
