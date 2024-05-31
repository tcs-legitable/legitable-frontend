import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import StupaidLogo from "../../assets/landing-page-images/stupaid-logo-main.svg";
import TalentButtonIcon from "../../assets/landing-page-images/landing-talent.svg";
import StudentButtonIcon from "../../assets/landing-page-images/landing-student.svg";
import ArrowText1 from "../../assets/images/arrow-text1.svg";
import ArrowText2 from "../../assets/images/arrow-text2.svg";

const LandingPage = ({ handleClick }) => {
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
      <VStack spacing="0px" fontSize="20px">
        <Text pt="15px">Welcome to Stupaid!</Text>
        <Text bg="transparent" color="#969696">
          Where{" "}
          <Box color="#0c0c0c" as="span">
            student creatives
          </Box>{" "}
          become{" "}
          <Box color="#0c0c0c" as="span">
            legit.
          </Box>{" "}
        </Text>
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
          color="#0c0c0c"
          bg="transparent"
          //   bgColor="#fafafa"
          bgGradient="linear(to-r, #c9c9c9 0%, #fafafa 80%)"
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
          //   onClick={() => handleClick("organization")}
        >
          <Image bgColor="inherit" mr="5px" src={TalentButtonIcon} />
          I'm looking for talent
        </Button>
        <Button
          border="1px solid"
          p="23px"
          borderRadius="25px"
          color="#0c0c0c"
          bg="transparent"
          bgGradient="linear(to-r, #c9c9c9 20%, #fafafa 80%)"
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
    </Flex>
  );
};

export default LandingPage;
