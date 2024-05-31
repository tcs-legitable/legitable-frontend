import { Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import StupaidLogo from "../../assets/landing-page-images/stupaid-logo-small.svg";
import GmailArrow from "../../assets/landing-page-images/continue-w-gmail-arrow-black.svg";

const LandingSignIn = ({ goNext }) => {
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
          onClick={() => goNext()}
        >
          Continue with Gmail
          <Image pl="10px" src={GmailArrow} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default LandingSignIn;
