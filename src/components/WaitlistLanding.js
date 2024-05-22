import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import StupaidLogo from "../assets/images/stupaid-logo.svg";
import TalentButtonIcon from "../assets/images/talent-button-icon.svg";
import StudentButtonIcon from "../assets/images/student-button-icon.svg";
import ArrowText1 from "../assets/images/arrow-text1.svg";
import ArrowText2 from "../assets/images/arrow-text2.svg";

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
          bgGradient="linear(to-r, #4b4b4b 20%, #0C0C0C 80%)"
          backgroundSize="200% 100%"
          backgroundPosition="right bottom"
          transition="background-position 0.5s ease"
          fontWeight="thin"
          _hover={{
            backgroundPosition: "left bottom",
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
          bgGradient="linear(to-r, #4b4b4b 20%, #0C0C0C 80%)"
          backgroundSize="200% 100%"
          backgroundPosition="right bottom"
          transition="background-position 0.5s ease"
          fontWeight="thin"
          _hover={{
            backgroundPosition: "left bottom",
          }}
        >
          <Image bgColor="inherit" mr="10px" src={StudentButtonIcon} /> I'm a
          student
        </Button>
      </HStack>
      <Image
        bg="transparent"
        position="relative"
        bottom="285px"
        right="254px"
        src={ArrowText1}
      />
      <Image
        bg="transparent"
        bottom="95px"
        left="310px"
        position="relative"
        src={ArrowText2}
      />
    </Flex>
  );
};

export default WaitlistLanding;
