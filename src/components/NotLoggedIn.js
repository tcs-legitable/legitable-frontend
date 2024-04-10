import { Box, Button, VStack } from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { SignedInContext } from "../App";
import { auth, provider } from "../firebase/firebase";
import { addUser } from "../firebase/helpers";

const NotLoggedIn = () => {
  const { setValue } = useContext(SignedInContext);

  const handleClick = async () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const { uid, email, displayName, photoURL } = user;
        addUser(uid, displayName, email, photoURL);
        setValue(uid);

        localStorage.setItem("user-uid", uid);
      })
      .then(() => {});
  };

  useEffect(() => {
    setValue(localStorage.getItem("user-uid"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <VStack>
        <Button onClick={handleClick} paddingTop='20px'>Log in with google</Button>
      </VStack>
    </Box>
  );
};

export default NotLoggedIn;
