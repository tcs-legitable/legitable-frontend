import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import WaitingListLandingClicked from "./WaitingListLandingClicked";
import WaitlistLanding from "./WaitlistLanding";
// import { SignedInContext } from "../App";
// import LoggedIn from "./LoggedIn";
// import NotLoggedIn from "./NotLoggedIn";
import WaitlistLandingLayout from "./WaitlistLandingLayout";

const HomePage = () => {
  const [clicked, setClicked] = useState(null);
  // const { value } = useContext(SignedInContext);
  // return <Box width="100%">{value ? <LoggedIn /> : <NotLoggedIn />}</Box>;
  return (
    <Flex w="100%" justifyContent="center" alignItems="center">
      <WaitlistLandingLayout>
        {clicked ? (
          <WaitingListLandingClicked value={clicked} />
        ) : (
          <WaitlistLanding handleClick={setClicked} />
        )}
      </WaitlistLandingLayout>
    </Flex>
  );
};

export default HomePage;
