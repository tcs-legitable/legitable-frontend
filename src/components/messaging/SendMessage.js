import { Box, Flex, Image, Input } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { SignedInContext } from '../../App';
import clip from './../../assets/images/clip.svg';
import io from 'socket.io-client';
import { addMessage } from '../../firebase/helpers';

const socket = io.connect("https://legitable-backend.up.railway.app/");
// const socket = io.connect("http://localhost:3001");

const SendMessage = ({ roomId }) => {
  const { value } = useContext(SignedInContext);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const messageData = {
      message,
      room: roomId,
      author: value.name || "Anon.",
      timestamp: new Date()
    };

    console.log("Sending message:", messageData);

    socket.emit("send_message", messageData);
  
    await addMessage(roomId, messageData);
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Flex
      bottom="0"
      left="0"
      right="0"
      p="10px"
      zIndex="1000"
    >
      <Box
        w="40px"
        h="40px"
        borderRadius="8px"
        backgroundColor="#fafafa"
        border="1px solid #ececec"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={clip} />
      </Box>

      <Input 
        placeholder="Message..."
        ml="12px"
        w="100%"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyPress}
        border="1px solid #ececec"
        backgroundColor="#fafafa"
      />
    </Flex>
  );
};

export default SendMessage;
