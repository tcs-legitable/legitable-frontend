import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import StupaidLogo from "../assets/images/stupaid-logo.svg";

const WaitingListLandingClicked = ({ value }) => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const isDesktop = useBreakpointValue({ base: false, mdLg: true });

  return (
    <Flex
      zIndex="0"
      bg="transparent"
      flexDir="column"
      alignItems="center"
      pb={isDesktop ? "100px" : "0px"}
    >
      <Image
        bg="transparent"
        w={{ base: "200px", mdLg: "150px" }}
        src={StupaidLogo}
      />
      <Text bg="transparent" pt="10px" fontSize="20px" color="#969696">
        Where <Box as="span">student creatives</Box> become{" "}
        <Box as="span">legit.</Box>{" "}
      </Text>
      <Flex
        w="100%"
        // flexDir={{ base: "column", mdLg: "row" }}
        flexDir="column"
        bg="transparent"
        pt="35px"
      >
        <Input
          borderRadius="20px"
          focusBorderColor="#fafafa"
          placeholder="Full name"
          _placeholder={{ color: "#535353" }}
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          mb="10px"
        />
        <Input
          borderRadius="20px"
          focusBorderColor="#fafafa"
          placeholder="Email"
          _placeholder={{ color: "#535353" }}
          type="Email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <Button
          isDisabled={inputName === "" || inputEmail === ""}
          w="50%"
          alignSelf="center"
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
          mt="40px"
        >
          {/* <Image bgColor="inherit" mr="5px" src={StudentButtonIcon} />  */}
          Join the waitlist
        </Button>
      </Flex>
    </Flex>
  );
};

export default WaitingListLandingClicked;
