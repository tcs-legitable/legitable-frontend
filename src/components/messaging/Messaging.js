import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { SignedInContext } from '../../App';
import { getMessages } from '../../firebase/helpers';
import MessagingHeader from './MessagingHeader';
import SendMessage from './SendMessage';
import defaultProfilePic from './../../assets/images/default-pfp.svg';

// const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://legitable-backend.up.railway.app/");

const Messaging = () => {
  const { user1, user2 } = useParams();
  const { value } = useContext(SignedInContext);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // takes the room id from url
  const roomId = `room-${[user1, user2].sort().join('-')}`;

  const joinRoom = async () => {
    if (roomId) {
      socket.emit("join_room", roomId);
      const initialMessages = await getMessages(roomId);
      setMessages(initialMessages);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Flex flexDirection="column" backgroundColor="#fafafa" w="100%" h="100vh">
      <MessagingHeader/>
      
      <Box backgroundColor="#fafafa" p="20px" overflowY="auto" flex="1">
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
        <div ref={messagesEndRef} />
      </Box>

      <SendMessage roomId={roomId} />
    </Flex>
  );
};

export default Messaging;
