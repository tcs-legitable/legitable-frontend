import { Box, Button, Flex, Input } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { SignedInContext } from '../../App';
const socket = io.connect("http://localhost:3001");

const Messaging = () => {

  const { value } = useContext(SignedInContext);

  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    if (message.trim() === "") return; //so we don't send an empty message
    
    const messageData = {
      message, 
      room,
      author: value.name,
      time: new Date().toLocaleDateString(),
    };

    socket.emit("send_message", messageData);
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
    <Flex flexDirection='column'>
      <Flex>
        <Input placeholder='Enter room number' textColor='white'
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <Button onClick={joinRoom}>Join room</Button>
      </Flex>
      <Flex>
        <Input placeholder='Enter your message here' textColor='white'
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyDown={handleKeyPress}
        />
        <Button onClick={sendMessage}>Submit</Button>
      </Flex>

      <Box backgroundColor='white'>
        <h1>Messages:</h1>
        {messages.map((msg, index) => (
          <div key={index}>
            <p><strong>{msg.author}</strong> [{msg.time}]: {msg.message}</p>
          </div>
        ))}
      </Box>
    </Flex>
  );
};

export default Messaging;
