import { Box, Button, Image, Text, Link } from '@chakra-ui/react';
import React from 'react';

const CreativeCard = ({
  photo_url,
  city,
  country,
  school,
  projectPref,
  full_name,
  email,
  skills,
  website,
  // is_verified
}) => {

  //PLACEHOLDER
  const is_verified = true;

  return (
    <Box
      backgroundColor="white"
      borderRadius="10px"
      display="flex"
      flexDirection="row"
    >
      <Image
        src={photo_url}
        alt={`${full_name}'s picture`}
        boxSize="50px"
        mr="10px"
      />

      <Box>
        <Box display="flex" flexDirection="row">
          <Text>
            {city}, {country} • {school} • {projectPref}
          </Text>
        </Box>

        <Box display="flex" flexDirection="row">
          <Text fontSize="xl" fontWeight="bold">
            {full_name}
          </Text>
          {is_verified && (
            <>
              <Text fontSize="xl" mx='10px'>
                |
              </Text>
              <Button>
                Stupaid verified
              </Button>
            </>
          )}
        </Box>

        <Box>
          <Link href={website} isExternal>
            <Button>Website</Button>
          </Link>
        </Box>
      </Box>

      <Button
        border="1px solid"
        p="23px"
        borderRadius="25px"
        color="#fafafa"
        bgColor="#0c0c0c"
        fontWeight="regular"
        _hover={{
          backgroundPosition: 'left bottom',
        }}
        _active={{
          backgroundPosition: 'left bottom',
        }}
      >
        Let's chat!
      </Button>
    </Box>
  );
};

export default CreativeCard;
