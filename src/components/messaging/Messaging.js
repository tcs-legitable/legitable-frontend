import { Box, Flex, Image, Text, Link } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { SignedInContext } from '../../App';
import { getMessages } from '../../firebase/helpers';
import MessagingHeader from './MessagingHeader';
import SendMessage from './SendMessage';
import defaultProfilePic from './../../assets/landing-page-images/stupaid-logo-main.svg';

const socket = io.connect('https://legitable-backend.up.railway.app/');
// const socket = io.connect("http://localhost:3001");

const Messaging = () => {
  const { user1, user2 } = useParams();
  const { value } = useContext(SignedInContext);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const roomId =
    user1 && user2 ? `room-${[user1, user2].sort().join('-')}` : null;

  const joinRoom = async () => {
    if (roomId) {
      socket.emit('join_room', roomId);
      const initialMessages = await getMessages(roomId);
      setMessages(initialMessages);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (roomId) {
      joinRoom();
      socket.on('receive_message', (data) => {
        console.log('Received message:', data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }

    return () => {
      socket.off('receive_message');
    };
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!roomId) {
    return (
      <Flex
        flexDirection="column"
        backgroundColor="#fafafa"
        w="100%"
        h="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Text textAlign="center" width="50%" color="#8c8c8c">
          Come chat with us by clicking the profile on the left! If you have any
          suggestions or find any bugs, our DM's are always open!
        </Text>
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" backgroundColor="#fafafa" w="100%" h="100vh">
      <MessagingHeader />

      <Box backgroundColor="#fafafa" p="20px" overflowY="auto" flex="1">
        {messages.map((msg, index) => {
          const previousMessage = messages[index - 1];
          const isSameAuthor =
            previousMessage && previousMessage.author === msg.author;
          const nextMessage = messages[index + 1];
          const isLastFromAuthor =
            !nextMessage || nextMessage.author !== msg.author;
          const showProfilePicture =
            msg.author !== value.name && isLastFromAuthor;
          const marginTop = isSameAuthor ? '5px' : '20px';

          const isCurrentUser = msg.author === value.name;

          return (
            <Box key={index} mt={marginTop}>
              {!isCurrentUser && !isSameAuthor && (
                <Text mb="2px" ml="55px" color="#8c8c8c">
                  {msg.author}
                </Text>
              )}
              <Flex
                align="flex-end"
                justify={isCurrentUser ? 'flex-end' : 'flex-start'}
              >
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
                    },
                  }}
                >
                  <p>{msg.message}</p>
                  {msg.fileURL && (
                    <Link
                      href={msg.fileURL}
                      isExternal
                      color={isCurrentUser ? '#63b3ed' : 'blue.500'}
                      textDecoration="underline"
                    >
                      {msg.fileName}
                    </Link>
                  )}
                </Box>
              </Flex>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>

      <SendMessage roomId={roomId} />
    </Flex>
  );
};

export default Messaging;
