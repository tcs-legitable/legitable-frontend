import { Avatar, Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { SignedInContext } from "../App";
import { getUserData } from "../firebase/helpers";
import AddEndorseeModal from "./AddEndorseeModal";

const LoggedIn = () => {
  const { value } = useContext(SignedInContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const data = await getUserData(value);
      return data;
    };

    const fetchUser = async () => {
      const object = await getUserDetails();
      setUser(object);
    };

    fetchUser();
    console.log("user is fetched");
  }, [value]);

  const logout = () => {
    console.log("logging out!");
    localStorage.removeItem("user-uid");
    window.location.reload();
  };

  return (
    <Box>
      <VStack>
        <Avatar boxSize="90px" src={user?.photoURL} alt="profile" />
        <Text pl="20px" fontSize="30px">
          Welcome {user?.firstName}
        </Text>

        <AddEndorseeModal/>

        <Button onClick={logout}>Log out</Button>
      </VStack>
    </Box>
  );
};

export default LoggedIn;
