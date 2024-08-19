import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { SignedInContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from './../../assets/landing-page-images/stupaid-logo-main.svg';
import { getUserRooms } from '../../firebase/helpers';

const MessageSidePreview = () => {
  const { value } = useContext(SignedInContext); // The logged-in user's UID
  const [rooms, setRooms] = useState([]);
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
      {rooms.map((roomId, index) => {
        const roomParticipants = roomId.split('-').slice(1);
        const displayName = roomParticipants.find(uid => uid !== value.uid);

        return (
          <Flex
            key={index}
            ml="30px"
            mb="10px"
            cursor="pointer"
            onClick={() => handleNavigate(roomId)}
          >
            <Image src={defaultProfilePic} borderRadius="20px" w="42px" />
            <Box ml="21px">
              <Text fontSize="15px" fontWeight="500">
                Chat with {displayName || "Unknown"}
              </Text>
              <Text w="200px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" fontSize="14px">
                Start chatting
              </Text>
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
};

export default MessageSidePreview;


// import { Box, Flex, Image, Text } from '@chakra-ui/react';
// import React, { useContext, useEffect, useState } from 'react';
// import { SignedInContext } from '../../App';
// import { useNavigate } from 'react-router-dom';
// import defaultProfilePic from './../../assets/landing-page-images/stupaid-logo-main.svg';

// const MessageSidePreview = () => {
//   const { value } = useContext(SignedInContext); // The logged-in user's UID
//   const navigate = useNavigate();

//   const handleNavigate = (uid1, uid2) => {
//     // Navigate to the chat room between the two specified UIDs
//     navigate(`/messaging/${uid1}/${uid2}`);
//   };

//   if (!value || !value.uid) {
//     return null;
//   }

//   // Define your pairs of UIDs (student and business)
//   const chatPairs = [
//     {
//       name: 'Chat with Business 1',
//       studentUID: 'l0fgjm4zF2dYw2cCBD5RL2rIFV02', // Example student UID
//       businessUID: 'UsYASiY8jNb9nnEUfpG2mhZ3Wgb2' // Example business UID
//     },
//     {
//       name: 'Chat with Business 2',
//       studentUID: 'UsYASiY8jNb9nnEUfpG2mhZ3Wgb2', // Another student UID
//       businessUID: 'Business2UID' // Another business UID
//     },
//   ];

//   return (
//     <Box>
//       {chatPairs.map((chat, index) => (
//         <Flex
//           key={index}
//           ml="30px"
//           mb="10px"
//           cursor="pointer"
//           onClick={() => handleNavigate(chat.studentUID, chat.businessUID)}
//         >
//           <Image src={defaultProfilePic} borderRadius="20px" w="42px" />
//           <Box ml="21px">
//             <Text fontSize="15px" fontWeight="500">{chat.name}</Text>
//             <Text w="200px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" fontSize="14px">
//               Start chatting with {chat.name}
//             </Text>
//           </Box>
//         </Flex>
//       ))}
//     </Box>
//   );
// };

// export default MessageSidePreview;






// import { Box, Flex, Image, Text } from '@chakra-ui/react';
// import React, { useContext, useEffect, useState } from 'react';
// import { SignedInContext } from '../../App';
// import { getAllUsers } from '../../firebase/helpers';
// import defaultProfilePic from './../../assets/landing-page-images/stupaid-logo-main.svg';
// import { useNavigate } from 'react-router-dom';

// const MessageSidePreview = () => {
//   const { value } = useContext(SignedInContext);
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const fetchedUsers = await getAllUsers();
//       setUsers(fetchedUsers);
//     };

//     fetchUsers();
//   }, []);

//   const handleNavigate = (user) => {
//     const roomId = `room-${[value.uid, user.uid].sort().join('-')}`;
//     navigate(`/messaging/${value.uid}/${user.uid}`);
//   };

//   if (!value || !value.uid) {
//     return null;
//   }

//   const isOrganization = value.type === 'organization';
//   const adminUID = 'fDkSwRdRJPXjJ1V0BGwgZ1hLb5M2';

//   return (
//     <Box>
//       {isOrganization ? (
//         users.map((user) => {

//           //note: if current signed in is Admin, then skip
//           if (user.uid === value.uid) return null;

//           return (
//             <Flex
//               key={user.uid}
//               ml='30px'
//               mb='10px'
//               cursor='pointer'
//               onClick={() => handleNavigate(user)}
//             >
//               <Image src={user.photoURL || defaultProfilePic} borderRadius="20px" w='42px' />

//               <Box ml='21px'>
//                 <Text fontSize='15px' fontWeight='500'>
//                   {user.input_name}
//                 </Text>

//                 <Text
//                   w='200px'
//                   whiteSpace='nowrap'
//                   overflow='hidden'
//                   textOverflow='ellipsis'
//                   fontSize='14px'
//                 >
//                   Chat with us here!
//                 </Text>
//               </Box>
//             </Flex>
//           );
//         })
//       ) : (
//         <Flex
//           ml='30px'
//           cursor='pointer'
//           onClick={() => handleNavigate({ uid: adminUID, input_name: 'Stupaid Admin' })}
//         >
//           <Image src={defaultProfilePic} borderRadius="20px" w='42px' />

//           <Box ml='21px'>
//             <Text fontSize='15px' fontWeight='500'>
//               Stupaid Admin
//             </Text>

//             <Text
//               w='200px'
//               whiteSpace='nowrap'
//               overflow='hidden'
//               textOverflow='ellipsis'
//               fontSize='14px'
//             >
//               Chat with us here!
//             </Text>
//           </Box>
//         </Flex>
//       )}
//     </Box>
//   );
// };

// export default MessageSidePreview;
