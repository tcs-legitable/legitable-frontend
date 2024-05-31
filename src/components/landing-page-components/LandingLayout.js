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
import StupaidTCSLogo from "../../assets/images/stupaid-tcs-logo.svg";

const LandingLayout = ({ children }) => {
  const isDesktop = useBreakpointValue({ base: false, mdLg: true });

  return (
    <Box
      position="relative"
      bg="transparent"
      w="100%"
      minH="100vh"
      overflow="hidden"
    >
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

export default LandingLayout;
