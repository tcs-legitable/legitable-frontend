import { Box, Button } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { SignedInContext } from "../App";
import { getUserData } from "../firebase/helpers";

const Chat = () => {
  const [user, setUser] = useState(null);
  const { value } = useContext(SignedInContext);

  const dummy = useRef();
  const messagesRef = collection(db, "messages");
  const messageQuery = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages] = useCollectionData(messageQuery, { idField: "id" });

  const [formValue, setFormValue] = useState("");

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

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = user;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      p="10px"
      borderRadius="10px"
      w="300px"
      h="400px"
      overflowY="scroll"
      bgColor="grey"
    >
      <Box>
        {messages &&
          messages.map((msg) => (
            <ChatMessage uid={user?.uid} key={msg.id} message={msg} />
          ))}
        <span ref={dummy}></span>
      </Box>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />
        <Button type="submit" disabled={!formValue}>
          submit
        </Button>
      </form>
    </Box>
  );
};

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === props.uid ? "sent" : "received";

  return (
    <Box
      textAlign={messageClass === "sent" && "-webkit-right"}
      bg="transparent"
      className={`message ${messageClass}`}
    >
      <img
        src={
          photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
        }
        alt="Avatar"
      />
      <p>{text}</p>
    </Box>
  );
}

export default Chat;
