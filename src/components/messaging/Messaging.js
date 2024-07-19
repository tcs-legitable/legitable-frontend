import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { SignedInContext } from '../../App';
// const socket = io.connect("http://localhost:3001");
// const socket = io.connect("legitable-backend.up.railway.app");
const socket = io.connect("");
import { addMessage, getMessages } from '../../firebase/helpers';

const Messaging = () => {

  const { value } = useContext(SignedInContext);

  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const joinRoom = async () => {
    if (room !== "") {
      socket.emit("join_room", room);
      const initialMessages = await getMessages(room);
      setMessages(initialMessages);
    }
  };

  const sendMessage = async () => {
    if (message.trim() === "") return; //so we don't send an empty message
    
    const messageData = {
      message, 
      // room,
      author: value.name || "Anon.",
      time: new Date().toLocaleDateString(),
    };

    socket.emit("send_message", { room, ...messageData });
    await addMessage(room, messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    };
  };

  return (
    <Flex flexDirection='column' backgroundColor="white">
      <Box backgroundColor='white' p="20px" mt="20px" width="100%" maxWidth="600px">

        <Flex w="100%" justifyContent="center">
          <Text>
            Start your conversation!
          </Text>
        </Flex>

        {messages.map((msg, index) => (
          <Flex key={index} justifyContent={msg.author === value.name ? 'flex-end' : 'flex-start'}>
            <Box
              p="10px"
              m="5px"
              borderRadius="10px"
              bg={msg.author === value.name ? 'blue.100' : 'gray.100'}
              maxWidth="80%"
            >
              <p><strong>{msg.author}</strong> [{msg.time}]: {msg.message}</p>
            </Box>
          </Flex>
        ))}
      </Box>

      <Flex>
        <Input placeholder='Enter room number'
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <Button onClick={joinRoom}>Join room</Button>
      </Flex>
      <Flex>
        <Input placeholder='Enter your message here'
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyDown={handleKeyPress}
        />
        <Button onClick={sendMessage}>Submit</Button>
      </Flex>
    </Flex>
  );
};

export default Messaging;
