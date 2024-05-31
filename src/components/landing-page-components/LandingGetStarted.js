import { Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import StupaidLogo from "../../assets/landing-page-images/stupaid-logo-small.svg";

const LandingGetStarted = ({ goNext }) => {
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
        <Text pt="15px">Let's get started!</Text>
      </VStack>
      <Flex
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
          mr={{ base: "0px", mdLg: "10px" }}
          onClick={() => goNext()}
        >
          I'm a new user
        </Button>
        <Button
          border="1px solid"
          p="23px"
          borderRadius="25px"
          color="#0c0c0c"
          bgColor="#fafafa"
          fontWeight="regular"
          _hover={{
            backgroundPosition: "left bottom",
          }}
          _active={{
            backgroundPosition: "left bottom",
          }}
          ml={{ base: "0px", mdLg: "10px" }}
          mt={{ base: "10px", mdLg: "0px" }}
          // onClick={() => goNext()}
        >
          I'm a returning user
        </Button>
      </Flex>
    </Flex>
  );
};

export default LandingGetStarted;
