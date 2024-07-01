import { Box, Button, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

const Messaging = () => {

  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", {
      message, room
    });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div>
      <Input placeholder='Enter room number' textColor='white'
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <Button onClick={joinRoom}>Join room</Button>
      <Input placeholder='Enter your message here' textColor='white' 
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <Button onClick={sendMessage}>Submit</Button>

      <Box
        backgroundColor='white'
      >
        <h1>Message:</h1>
        {messageReceived}
      </Box>
    </div>
  );
};

export default Messaging;
