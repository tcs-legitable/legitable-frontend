import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import StupaidLogo from "../assets/images/stupaid-logo.svg";
import TalentButtonIcon from "../assets/images/talent-button-icon.svg";
import StudentButtonIcon from "../assets/images/student-button-icon.svg";

const WaitlistLanding = () => {
  return (
    <Flex flexDir="column" alignItems="center">
      <Image w="300px" src={StupaidLogo} />
      <Text pt="20px" fontSize="22px" color="#969696">
        Where <Box as="span">student creatives</Box> become{" "}
        <Box as="span">legit.</Box>{" "}
      </Text>
      <HStack pt="30px">
        <Button
          border="1px solid"
          p="23px"
          borderRadius="25px"
          color="#fafafa"
          bg="transparent"
          fontWeight="thin"
          _hover={{
            bgGradient: "linear(to-r, #4b4b4b 20%, #0C0C0C 80%)",
          }}
        >
          <Image bgColor="inherit" mr="10px" src={TalentButtonIcon} />
          I'm looking for talent
        </Button>
        <Button
          border="1px solid"
          p="23px"
          borderRadius="25px"
          color="#fafafa"
          bg="transparent"
          fontWeight="thin"
          _hover={{
            bgGradient: "linear(to-r, #4b4b4b 20%, #0C0C0C 80%)",
          }}
        >
          <Image bgColor="inherit" mr="10px" src={StudentButtonIcon} /> I'm a
          student
        </Button>
      </HStack>
    </Flex>
  );
};

export default WaitlistLanding;
