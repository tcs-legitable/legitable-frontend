import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import WaitingListLandingClicked from "../WaitingListLandingClicked";
import WaitlistLanding from "../WaitlistLanding";
import LandingLayout from "./LandingLayout";
import LandingPage from "./LandingPage";

const GetStartedLandingPage = () => {
  const [clicked, setClicked] = useState(null);
  return (
    <Flex
      className="landing"
      w="100%"
      justifyContent="center"
      alignItems="center"
    >
      <LandingLayout>
        <LandingPage />
        {/* {clicked ? (
          <WaitingListLandingClicked value={clicked} />
        ) : (
          <WaitlistLanding handleClick={setClicked} />
        )} */}
      </LandingLayout>
    </Flex>
  );
};

export default GetStartedLandingPage;
