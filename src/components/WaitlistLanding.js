import { Box, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import StupaidLogo from "../assets/images/stupaid-logo.svg";
import StupaidTCSLogo from "../assets/images/stupaid-tcs-logo.svg";

const Waitlist = () => {
  return (
    <Box>
      <HStack>
        <Text color="#969696">Created by</Text>
        <Image src={StupaidTCSLogo} />
      </HStack>
    </Box>
  );
};

export default Waitlist;
