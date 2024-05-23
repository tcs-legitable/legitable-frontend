import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import StupaidTCSLogo from "../assets/images/stupaid-tcs-logo.svg";
import Background1 from "../assets/images/background-1.svg";
import Background2 from "../assets/images/background-2.svg";

const WaitlistLandingLayout = ({ children }) => {
  const isDesktop = useBreakpointValue({ base: false, mdLg: true });

  return (
    <Box
      position="relative"
      bg="transparent"
      w="100%"
      minH="100vh"
      overflow="hidden"
    >
      {isDesktop && (
        <Image
          src={Background1}
          position="absolute"
          bg="transparent"
          top="110px"
          left="0"
          zIndex="0"
          pointerEvents="none"
        />
      )}
      {isDesktop && (
        <Image
          src={Background2}
          bg="transparent"
          position="absolute"
          top="45px"
          right="0"
          zIndex="0"
          pointerEvents="none"
        />
      )}
      <Flex
        direction="column"
        alignItems="center"
        minH={{ base: "760px", mdLg: "700px" }}
      >
        <HStack mt="80px" mb="130px">
          <Text color="#969696">Created by</Text>
          <Image zIndex={100} src={StupaidTCSLogo} />
        </HStack>
        {children}
        <Link
          position="absolute"
          bottom="60px"
          left="50%"
          transform="translateX(-50%)"
          mb="0"
          href="mailto:team@thecreativesolution.ca"
        >
          <Text textDecoration="underline" color="#969696">
            team@thecreativesolution.ca
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default WaitlistLandingLayout;
