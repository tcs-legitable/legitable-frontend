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
  const isDesktop = useBreakpointValue({ base: false, lg: true });

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
          top="110px"
          left="0"
          zIndex="0"
          pointerEvents="none"
        />
      )}
      {isDesktop && (
        <Image
          src={Background2}
          position="absolute"
          bottom="155px"
          right="0"
          zIndex="0"
          pointerEvents="none"
        />
      )}
      <Flex direction="column" alignItems="center">
        <HStack mt="80px" mb="130px">
          <Text color="#969696">Created by</Text>
          <Image zIndex={100} src={StupaidTCSLogo} />
        </HStack>
        {children}
        <Link mb="78px" href="mailto:team@thecreativesolution.ca">
          <Text textDecoration="underline" color="#969696">
            team@thecreativesolution.ca
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default WaitlistLandingLayout;
