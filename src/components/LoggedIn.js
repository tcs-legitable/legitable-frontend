import { Avatar, Box, Button, Text, useToast, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { SignedInContext } from "../App";
import { getEndorsees, getUserData, deleteEndorsee } from "../firebase/helpers";
import AddEndorseeModal from "./AddEndorseeModal";

const LoggedIn = () => {
  const { value } = useContext(SignedInContext);
  const [user, setUser] = useState(null);
  const [endorsees, setEndorsees] = useState([]);

  const toast = useToast();

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

  const handleDeleteEndorsee = async (id) => {
    try {
      await deleteEndorsee(id, value);
      let updatedEndorsees = await getEndorsees(value);
      setEndorsees(updatedEndorsees);
  
      toast({
        title: 'Endorsee deleted.',
        description: 'Endorsee successfully deleted.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    } catch (error) {
      console.error('Failed to delete endorsee:', error);
    }
  };

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
          {endorsees.map((endorsee, index) => {
            return (
              <VStack key={endorsee.id} bgColor="gray.200" borderRadius="5px" p="10px">
                <Text>{endorsee.name}</Text>
                <Text>{endorsee.email}</Text>
                <Text>Skill: {endorsee.skill}</Text>

                <Button colorScheme='blue' onClick={() => handleDeleteEndorsee(endorsee.id)}>
                  Delete
                </Button>
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
