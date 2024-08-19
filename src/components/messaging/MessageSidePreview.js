import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { SignedInContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from './../../assets/images/default-pfp.svg';
import { getOrganizationData, getUserData, getUserRooms } from '../../firebase/helpers';

const MessageSidePreview = () => {
  const { value } = useContext(SignedInContext); // The logged-in user's UID
  const [rooms, setRooms] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      if (value && value.uid) {
        const userRooms = await getUserRooms(value.uid);
        setRooms(userRooms);
      }
    };

    fetchRooms();
  }, [value]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomDetails = await Promise.all(
          rooms.map(async (room) => {
            if (typeof room !== 'string') {
              return null; // Skip processing this room
            }
  
            const roomParticipants = room.split('-').slice(1);
            const otherParticipantUID = roomParticipants.find(uid => uid !== value.uid);
  
            if (!otherParticipantUID) {
              return null; // Skip processing if no valid UID
            }
  
            try {
              const userData = await getUserData(otherParticipantUID);
              const orgData = await getOrganizationData(otherParticipantUID);
              return {
                roomId: room,
                photo_url: userData?.photo_url || orgData?.photo_url || defaultProfilePic,
                displayName: userData?.input_name || orgData?.input_name || 'Unknown'
              };
            } catch (error) {
              return null; // Skip processing in case of error
            }
          })
        );

  
        // Filter out any null values that might have resulted from errors
        setRoomData(roomDetails.filter(detail => detail !== null));
      } catch (error) {
        console.log(error);
      }
    };
  
    if (rooms.length > 0) {
      fetchRoomData();
    }
  }, [rooms, value.uid]);

  const handleNavigate = (roomId) => {
    // Extract the UIDs from the roomId to construct the URL
    const roomParticipants = roomId.split('-').slice(1);
    navigate(`/messaging/${roomParticipants[0]}/${roomParticipants[1]}`);
  };

  if (!value || !value.uid) {
    return null;
  }

  return (
    <Box>
      {roomData.map((room, index) => (
        <Flex
          key={index}
          ml="30px"
          mb="10px"
          cursor="pointer"
          onClick={() => handleNavigate(room.roomId)}
        >
          <Image src={room?.photo_url || defaultProfilePic} borderRadius="20px" w="42px" />
          <Box ml="21px">
            <Text fontSize="15px" fontWeight="500">
              Chat with {room.displayName}
            </Text>
            <Text w="200px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" fontSize="14px">
              Start chatting
            </Text>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default MessageSidePreview;
