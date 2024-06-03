import { Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import StupaidLogo from "../../assets/landing-page-images/stupaid-logo-small.svg";
import GmailArrow from "../../assets/landing-page-images/continue-w-gmail-arrow-black.svg";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { doesUserExist } from "../../firebase/helpers";
import { useNavigate } from "react-router-dom";

const LandingSignIn = ({ goNext, setData }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      console.log(user, " is the user");

      const { uid, email, displayName, photoURL } = user;
      const exists = await doesUserExist(uid);

      if (exists) {
        navigate("/home");
      }

      const data = {
        uid: uid,
        full_name: displayName,
        first_name: displayName.split(" ")[0],
        email: email,
        photo_url: photoURL,
      };
      setData(data);

      goNext();
    } catch (error) {
      console.error("An error occurred during sign-in:", error);
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
        w={{ base: "200px", mdLg: "150px" }}
        src={StupaidLogo}
      />
      <VStack spacing="0px" fontSize="20px">
        <Text pt="15px">Sign in with your Gmail to begin</Text>
      </VStack>
      <Flex
        justifyContent="center"
        w="100%"
        flexDir={{ base: "column", mdLg: "row" }}
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
            backgroundPosition: "left bottom",
          }}
          _active={{
            backgroundPosition: "left bottom",
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
