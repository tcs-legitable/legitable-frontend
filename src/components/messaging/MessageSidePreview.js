import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { SignedInContext } from '../../App';
import { getAllUsers } from '../../firebase/helpers';
import defaultProfilePic from './../../assets/images/default-pfp.svg';
import { useNavigate } from 'react-router-dom';

const MessageSidePreview = () => {
  const { value } = useContext(SignedInContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const handleNavigate = (user) => {
    const roomId = `room-${[value.uid, user.uid].sort().join('-')}`;
    navigate(`/messaging/${value.uid}/${user.uid}`);
  };

  if (!value || !value.uid) {
    return null;
  }

  const isOrganization = value.type === 'organization';
  const adminUID = 'fDkSwRdRJPXjJ1V0BGwgZ1hLb5M2';

  return (
    <Box>
      {isOrganization ? (
        users.map((user) => {

          //note: if current signed in is Admin, then skip
          if (user.uid === value.uid) return null;

          return (
            <Flex
              key={user.uid}
              ml='30px'
              cursor='pointer'
              onClick={() => handleNavigate(user)}
            >
              <Image src={user.photoURL || defaultProfilePic} borderRadius="20px" w='42px' />

              <Box ml='21px'>
                <Text fontSize='15px' fontWeight='500'>
                  {user.input_name}
                </Text>

                <Text
                  w='200px'
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                  fontSize='14px'
                >
                  Chat with us here!
                </Text>
              </Box>
            </Flex>
          );
        })
      ) : (
        <Flex
          ml='30px'
          cursor='pointer'
          onClick={() => handleNavigate({ uid: adminUID, input_name: 'Stupaid Admin' })}
        >
          <Image src={defaultProfilePic} borderRadius="20px" w='42px' />

          <Box ml='21px'>
            <Text fontSize='15px' fontWeight='500'>
              Stupaid Admin
            </Text>

            <Text
              w='200px'
              whiteSpace='nowrap'
              overflow='hidden'
              textOverflow='ellipsis'
              fontSize='14px'
            >
              Chat with us here!
            </Text>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default MessageSidePreview;
