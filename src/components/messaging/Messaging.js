import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { SignedInContext } from '../../App';
import { addMessage, getMessages } from '../../firebase/helpers';
import MessagingHeader from './MessagingHeader';
import SendMessage from './SendMessage';
import { formatISO } from 'date-fns';
import defaultProfilePic from './../../assets/images/default-pfp.svg';

// const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://legitable-backend.up.railway.app/");

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
      time: formatISO(new Date()),
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
    <Flex flexDirection='column' backgroundColor="#fafafa" w="100%" h='100vh'>
      <MessagingHeader/>
      
      <Box backgroundColor='#fafafa' p="20px" mt="20px" overflowY='auto'>
        <Flex w="100%" justifyContent="center">
          <Text>Start your conversation!</Text>
        </Flex>
        {messages.map((msg, index) => {
          const previousMessage = messages[index - 1];
          const isSameAuthor = previousMessage && previousMessage.author === msg.author;
          const nextMessage = messages[index + 1];
          const isLastFromAuthor = !nextMessage || nextMessage.author !== msg.author;
          const showProfilePicture = msg.author !== value.name && isLastFromAuthor;
          const marginTop = isSameAuthor ? "5px" : "20px";
          
          const isCurrentUser = msg.author === value.name;

          return (
            <Flex key={index} mt={marginTop} align="flex-end" justify={isCurrentUser ? 'flex-end' : 'flex-start'}>
              {!isCurrentUser && (
                <Box w="50px" minW="50px">
                  {showProfilePicture && (
                    <Image 
                      src={defaultProfilePic} 
                      borderRadius="full" 
                      boxSize="40px" 
                      mr="10px" 
                    />
                  )}
                </Box>
              )}
              <Box
                p="10px"
                borderRadius="10px"
                bg={isCurrentUser ? '#ae7bef' : '#eaeaea'}
                color={isCurrentUser ? 'white' : 'black'}
                maxWidth="80%"
                position="relative"
                sx={{
                  ':hover .message-time': {
                    opacity: 1,
                  }
                }}
              >
                <p>{msg.message}</p>
            
              </Box>
            </Flex>
          );
        })}
      </Box>

      <Flex>
        <Input 
          placeholder='Enter your message here'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyPress}
          borderColor='#ECECEC'
          _hover={{ borderColor: '#ECECEC' }}
          _focus={{ borderColor: '#ECECEC' }}
          backgroundColor='#FAFAFA'
        />
        <Button onClick={sendMessage}>Submit</Button>
      </Flex>

      <SendMessage />
    </Flex>
  );
};

export default Messaging;
