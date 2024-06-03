import { Box, Button, Flex, Image, Text, Link } from '@chakra-ui/react';
import React from 'react';

const CreativeCard = ({ image, location, school, work, name, endorsements, website }) => {
  return (
    <Box 
        border="1px solid #ccc"
        borderRadius="10px"
        display='flex'
        flexDirection='row'
        backgroundColor='white'
    >
        <Image src={image} alt={`${name}'s picture`} boxSize="50px" />

        <Box>
            <Flex mb="10px" justifyContent="space-between">
                <Text>{location}</Text>
                <Text>{school}</Text>
                <Text>{work}</Text>
            </Flex>

            <Flex mb="10px">
                <Flex flexDir="column" justifyContent="center">
                    <Text fontSize="xl" fontWeight="bold">{name}</Text>
                    <Text>{endorsements} endorsements</Text>
                </Flex>
            </Flex>

            <Box>
                <Link href={website} isExternal>
                    <Button>Click me</Button>
                </Link>
            </Box>
        </Box>
    </Box>
  );
}

export default CreativeCard;

