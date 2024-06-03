import { Box, Button, Flex, Image, Text, Link } from '@chakra-ui/react';
import React from 'react';

const CreativeCard = ({ photo_url, city, country, school, projectPref, full_name, email, skills, website }) => {
  return (
    <Box 
        backgroundColor='white'
        borderRadius="10px"
        display='flex'
        flexDirection='row'
    >
        <Image src={photo_url} alt={`${full_name}'s picture`} boxSize="50px" mr="10px"/>

        <Box>
            <Box
                display='flex'
                flexDirection='row'
            >
                <Text>{city}, {country}</Text>
                <Text>•</Text>
                <Text>{school}</Text>
                <Text>•</Text>
                <Text>{projectPref}</Text>
            </Box>

            <Box
                display='flex'
                flexDirection='row'
            >
                <Text fontSize="xl" fontWeight="bold">
                    {full_name}
                </Text>
            </Box>
            
            <Box>
                <Link href={website} isExternal>
                    <Button>Website</Button>
                </Link>
            </Box>
        </Box>
    </Box>
  );
}

export default CreativeCard;