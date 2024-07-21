import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { SignedInContext } from '../../App';
import { addMessage, getMessages } from '../../firebase/helpers';
import MessagingHeader from './MessagingHeader';
import SendMessage from './SendMessage';
const socket = io.connect("http://localhost:3001");

const Messaging = () => {
  const { user1, user2 } = useParams();
  const { value } = useContext(SignedInContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // takes the room id from url
  const roomId = `room-${[user1, user2].sort().join('-')}`;

  const joinRoom = async () => {
    if (roomId) {
      socket.emit("join_room", roomId);
      const initialMessages = await getMessages(roomId);
      setMessages(initialMessages);
    }
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const messageData = {
      message,
      room: roomId,
      author: value.name || "Anon.",
      time: new Date().toLocaleTimeString(),
    };

    console.log("Sending message:", messageData);

    socket.emit("send_message", messageData);
    await addMessage(roomId, messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessage("");
  };

  useEffect(() => {
    joinRoom();

    socket.on("receive_message", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [roomId]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Flex flexDirection='column' backgroundColor="#fafafa" w="100%">
      <MessagingHeader/>
      
      <Box backgroundColor='#fafafa' p="20px" mt="20px">
        <Flex w="100%" justifyContent="center">
          <Text>Start your conversation!</Text>
        </Flex>
        {messages.map((msg, index) => (
          <Flex key={index} justifyContent={msg.author === value.name ? 'flex-end' : 'flex-start'}>
            <Box
              p="10px"
              m="5px"
              borderRadius="10px"
              bg={msg.author === value.name ? 'blue.100' : 'gray.100'}
              maxWidth="100%"
            >
              <p><strong>{msg.author}</strong> [{msg.time}]: {msg.message}</p>
            </Box>
          </Flex>
        ))}
      </Box>

      <Flex>
        <Input 
          placeholder='Enter your message here'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button onClick={sendMessage}>Submit</Button>
      </Flex>

      <SendMessage/>
    </Flex>
  );
};

export default Messaging;
