import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { SignedInContext } from "../App";
import { auth, provider } from "../firebase/firebase";
import { addUser } from "../firebase/helpers";
import { ReactComponent as Logo } from "../assets/images/tcs-logo.svg";
import googleLogo from "../assets/images/google-logo.png";

const NotLoggedIn = () => {
  const { setValue } = useContext(SignedInContext);

  const handleClick = async () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const { uid, email, displayName, photoURL } = user;
        addUser(uid, displayName, email, photoURL);
        setValue(uid);

        localStorage.setItem("user-uid", uid);
      })
      .then(() => {});
  };

  useEffect(() => {
    setValue(localStorage.getItem("user-uid"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box w="100%" h="100%">
      <Box margin="30px" bgColor="blue" w="fit-content">
        <Logo width="50px" />
      </Box>
      <VStack textAlign="center">
        <Box
          w={{ base: "380px", md: "800px" }}
          fontWeight="bold"
          fontSize={{ base: "34px", md: "40px" }}
        >
          <Text as="span">Welcome to </Text>
          <Text color="#808080" as="span">
            Legitable
          </Text>
          <Text as="span">
            : A Gateway to Legitimate Connections for Introverts
          </Text>
        </Box>
        <Text
          w={{ base: "370px", md: "630px" }}
          pt="40px"
          fontSize={{ base: "22px", md: "30px" }}
        >
          Harness the power of trusted networks to spotlight talent within every
          circle
        </Text>
        <Text fontSize={{ base: "29px", md: "44px" }} pt="40px">
          Join. Curate. Share.
        </Text>
        <Button
          mt="50px"
          textColor="#EAEAEA"
          _hover={{
            bgColor: "#3C3C3C",
          }}
          bgColor="#545454"
          onClick={handleClick}
          p="20px"
          py="30px"
        >
          <Image boxSize={10} color="pink" bgColor="inherit" src={googleLogo} />
          Sign In With Google
        </Button>
      </VStack>
    </Box>
  );
};

export default NotLoggedIn;
