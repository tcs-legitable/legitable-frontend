import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import StupaidLogo from "../assets/images/stupaid-logo.svg";

const WaitlistLanding = () => {
  return (
    <Flex>
      <Image src={StupaidLogo} />
    </Flex>
  );
};

export default WaitlistLanding;
