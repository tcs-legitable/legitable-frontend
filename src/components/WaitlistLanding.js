import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import StupaidLogo from "../assets/images/stupaid-logo.svg";
import TalentButtonIcon from "../assets/images/talent-button-icon.svg";
import StudentButtonIcon from "../assets/images/student-button-icon.svg";
import ArrowText1 from "../assets/images/arrow-text1.svg";
import ArrowText2 from "../assets/images/arrow-text2.svg";

const WaitlistLanding = () => {
  return (
    <Flex
      zIndex="0"
      bg="transparent"
      flexDir="column"
      alignItems="center"
      pb="0px"
    >
      <Image bg="transparent" w="250px" src={StupaidLogo} />
      <Text bg="transparent" pt="15px" fontSize="20px" color="#969696">
        Where <Box as="span">student creatives</Box> become{" "}
        <Box as="span">legit.</Box>{" "}
      </Text>
      <HStack bg="transparent" pt="25px">
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
        bottom="265px"
        right="224px"
        src={ArrowText1}
      />
      <Image
        pb="0"
        mb="0"
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
