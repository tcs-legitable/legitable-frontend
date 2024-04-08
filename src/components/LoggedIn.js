import { Avatar, Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { SignedInContext } from "../App";
import { getEndorsees, getUserData } from "../firebase/helpers";
import AddEndorseeModal from "./AddEndorseeModal";

const LoggedIn = () => {
  const { value } = useContext(SignedInContext);
  const [user, setUser] = useState(null);
  const [endorsees, setEndorsees] = useState([]);

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

  useEffect(() => {
    const fetchEndorsees = async () => {
      let values = await getEndorsees(value);
      setEndorsees(values);
    };

    fetchEndorsees();
    console.log("updated endorsees");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    console.log(endorsees, " is ENDORSSESS");
  }, [endorsees]);

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

        <AddEndorseeModal />

        <VStack>
          {endorsees.map(({ name, email, skill }, index) => {
            return (
              <VStack bgColor="gray.200" borderRadius="5px" p="10px">
                <Text>{name}</Text>
                <Text>{email}</Text>
                <Text>Skill: {skill}</Text>
              </VStack>
            );
          })}
        </VStack>

        <Button onClick={logout}>Log out</Button>
      </VStack>
    </Box>
  );
};

export default LoggedIn;
