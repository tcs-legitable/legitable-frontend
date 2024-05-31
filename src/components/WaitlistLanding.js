import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import StupaidLogo from "../assets/images/stupaid-logo.svg";
import TalentButtonIcon from "../assets/images/talent-button-icon.svg";
import StudentButtonIcon from "../assets/images/student-button-icon.svg";
import ArrowText1 from "../assets/images/arrow-text1.svg";
import ArrowText2 from "../assets/images/arrow-text2.svg";

const WaitlistLanding = ({ handleClick }) => {
  const isDesktop = useBreakpointValue({ base: false, mdLg: true });

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
        w={{ base: "300px", mdLg: "250px" }}
        src={StupaidLogo}
      />
      <Text bg="transparent" pt="15px" fontSize="20px" color="#969696">
        Where{" "}
        <Box color="#fafafa" as="span">
          student creatives
        </Box>{" "}
        become{" "}
        <Box color="#fafafa" as="span">
          legit.
        </Box>{" "}
      </Text>
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
          bg="transparent"
          bgGradient="linear(to-r, #4b4b4b 20%, #0C0C0C 80%)"
          backgroundSize="200% 100%"
          backgroundPosition="right bottom"
          transition="background-position 0.5s ease"
          fontWeight="thin"
          _hover={{
            backgroundPosition: "left bottom",
          }}
          _active={{
            backgroundPosition: "left bottom",
          }}
          mr={{ base: "0px", mdLg: "10px" }}
          onClick={() => handleClick("organization")}
        >
          <Image bgColor="inherit" mr="5px" src={TalentButtonIcon} />
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
          _active={{
            backgroundPosition: "left bottom",
          }}
          ml={{ base: "0px", mdLg: "10px" }}
          mt={{ base: "10px", mdLg: "0px" }}
          onClick={() => handleClick("student")}
        >
          <Image bgColor="inherit" mr="5px" src={StudentButtonIcon} /> I'm a
          student
        </Button>
      </Flex>
      {isDesktop && (
        <Image
          bg="transparent"
          position="relative"
          bottom="265px"
          right="224px"
          src={ArrowText1}
        />
      )}
      {isDesktop && (
        <Image
          pb="0"
          mb="0"
          bg="transparent"
          bottom="95px"
          left="310px"
          position="relative"
          src={ArrowText2}
        />
      )}
    </Flex>
  );
};

export default WaitlistLanding;
