import { Avatar, Box, Button, Text, useToast, VStack } from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { SignedInContext } from "../App";
import { db } from "../firebase/firebase";
import {
  getEndorsees,
  getEndorseeUserData,
  deleteEndorsee,
} from "../firebase/helpers";
import AddEndorseeModal from "./AddEndorseeModal";

import CopyLink from "./CopyLink";

const LoggedIn = () => {
  const { value } = useContext(SignedInContext);
  const [user, setUser] = useState(null);
  const [endorsees, setEndorsees] = useState([]);

  const toast = useToast();

  useEffect(() => {
    const getUserDetails = async () => {
      const data = await getEndorseeUserData(value);
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
    const unsub = onSnapshot(doc(db, "users", value), (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      console.log(source, " data: ", doc?.data());
      const data = doc?.data();
      if (data) setEndorsees(data?.endorsees);
    });

    return () => unsub();
  }, [value]);

  const handleDeleteEndorsee = async (id) => {
    try {
      await deleteEndorsee(id, value);
      let updatedEndorsees = await getEndorsees(value);
      setEndorsees(updatedEndorsees);

      toast({
        title: "Successfully deleted.",
        description: "Person successfully removed from trusted circle.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      console.error("Failed to remove from trusted circle:", error);
    }
  };

  const logout = () => {
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

        <CopyLink />

        <AddEndorseeModal />

        <VStack>
          {endorsees.map((endorsee, index) => {
            return (
              <VStack
                key={index}
                w="340px"
                bgColor="gray.200"
                borderRadius="5px"
                p="10px"
                alignItems="baseline"
              >
                <Text>
                  <Box as="span" fontWeight="bold">
                    Name:
                  </Box>{" "}
                  {endorsee.name}
                </Text>
                <Text>
                  <Box as="span" fontWeight="bold">
                    Email:
                  </Box>{" "}
                  {endorsee.email}
                </Text>
                <Text>
                  <Box as="span" fontWeight="bold">
                    Skill:
                  </Box>{" "}
                  {endorsee.skill}
                </Text>

                <Button
                  colorScheme="blue"
                  onClick={() => handleDeleteEndorsee(endorsee.id)}
                >
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
