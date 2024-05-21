import { Flex, HStack, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import StupaidTCSLogo from "../assets/images/stupaid-tcs-logo.svg";

const WaitlistLandingLayout = ({ children }) => {
  return (
    <Flex direction="column" alignItems="center">
      <HStack mt="100px" mb="130px">
        <Text color="#969696">Created by</Text>
        <Image src={StupaidTCSLogo} />
      </HStack>
      {children}
      <Link mt="130px" mb="100px" href="mailto:team@thecreativesolution.ca">
        <Text textDecoration="underline" color="#969696">
          team@thecreativesolution.ca
        </Text>
      </Link>
    </Flex>
  );
};

export default WaitlistLandingLayout;
