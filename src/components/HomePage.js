import { Box, Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
// import { SignedInContext } from "../App";
// import LoggedIn from "./LoggedIn";
// import NotLoggedIn from "./NotLoggedIn";
import Waitlist from "./WaitlistLanding";

const HomePage = () => {
  // const { value } = useContext(SignedInContext);
  // return <Box width="100%">{value ? <LoggedIn /> : <NotLoggedIn />}</Box>;
  return (
    <Flex
      // bgColor="pink"
      w="100%"
      justifyContent="center"
      // height="100vh"
      // alignItems="center"
    >
      <Waitlist />
    </Flex>
  );
};

export default HomePage;
