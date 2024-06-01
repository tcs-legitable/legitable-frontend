import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import WaitingListLandingOrganizationClicked from "./WaitingListLandingOrganizationClicked";
import WaitingListLandingStudentClicked from "./WaitingListLandingStudentClicked";
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
    <Flex
      className="waitlist"
      w="100%"
      justifyContent="center"
      alignItems="center"
    >
      <WaitlistLandingLayout>
        <Box mb="100px">
          {clicked ? (
            clicked === "student" ? (
              <WaitingListLandingStudentClicked />
            ) : (
              <WaitingListLandingOrganizationClicked value={clicked} />
            )
          ) : (
            <WaitlistLanding handleClick={setClicked} />
          )}
        </Box>
      </WaitlistLandingLayout>
    </Flex>
  );
};

export default HomePage;
