import { Box, Button } from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { SignedInContext } from "../App";
import { auth, provider } from "../firebase/firebase";

const NotLoggedIn = () => {
  const { setValue } = useContext(SignedInContext);

  const handleClick = async () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const { uid, email, displayName, photoURL } = user;
        // addUser(uid, displayName, email, photoURL);

        setValue(uid);

        localStorage.setItem("uid", uid);
      })
      .then(() => {});
  };

  useEffect(() => {
    setValue(localStorage.getItem("uid"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Button onClick={handleClick}>Log in with google</Button>
    </Box>
  );
};

export default NotLoggedIn;
