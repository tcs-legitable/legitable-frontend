// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Box, Text, VStack } from "@chakra-ui/react";
// import { getEndorsees } from '../firebase/helpers';

// const EndorseesPage = () => {
//   const { userId } = useParams();
//   const [endorsees, setEndorsees] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getEndorsees(userId);
//       setEndorsees(data);
//     };

//     fetchData();
//   }, [userId]);

//   return (
//     <Box>
//       <VStack>
//         {endorsees.map((endorsee, index) => (
//           <Box key={index}>
//             <Text>Name: {endorsee.name}</Text>
//             <Text>Email: {endorsee.email}</Text>
//             <Text>Skill: {endorsee.skill}</Text>
//           </Box>
//         ))}
//       </VStack>
//     </Box>
//   );
// };

// export default EndorseesPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, VStack } from "@chakra-ui/react";
import { doc, updateDoc, getDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { getEndorsees } from '../firebase/helpers';

const EndorseesPage = () => {
  const { userId } = useParams();
  const [endorsees, setEndorsees] = useState([]);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const updateViewsAndGetEndorsees = async () => {
      console.log("Effect running for userID:", userId);
      const userRef = doc(db, "users", userId);
  
      // Increment the view count
      await updateDoc(userRef, {
        viewCount: increment(1)
      });
  
      // Fetch the updated document to get the new view count and endorsees
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setViewCount(userData.viewCount);
        setEndorsees(userData.endorsees || []);
      }
    };
  
    updateViewsAndGetEndorsees();
  }, [userId]);

  return (
    <Box>
      <Text>Page Views: {viewCount}</Text>
      <VStack>
        {endorsees.map((endorsee, index) => (
          <Box key={index}>
            <Text>Name: {endorsee.name}</Text>
            <Text>Email: {endorsee.email}</Text>
            <Text>Skill: {endorsee.skill}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default EndorseesPage;

