import { Box, Button, Image, Text, Link } from '@chakra-ui/react';
import React from 'react';
import star from './../../assets/images/Star-stupaid-verified.svg';
import arrow from './../../assets/images/up-right-arrow.svg';

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
      marginBottom="20px"
      marginLeft="60px"
      border="1px solid #dbdbdb"
    >
      <Image
        src={photo_url}
        alt={`${full_name}'s picture`}
        boxSize="50px"
        mr="20px"
        ml="30px"
        mt="30px"
        borderRadius="full"
      />

      <Box
        mt="30px"
      >
        <Box display="flex" flexDirection="row">
          <Text
            color="#555"
            fontSize="13px"
            mb="7px"
          >
            {city}, {country} • {school} • {projectPref}
          </Text>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          mb="7px"
        >
          <Text fontSize="xl" fontWeight="bold">
            {full_name}
          </Text>
          {is_verified && (
            <>
              <Text fontSize="xl" mx='10px'>
                |
              </Text>
              <Button
                borderRadius="25px"
              >
                <Image src={star} />
                <Text
                  marginLeft="6px"
                  fontSize="12px"
                >
                  Stupaid verified
                </Text>
              </Button>
            </>
          )}
        </Box>

        <Box
          pb="30px"
        >
          <Link href={website} isExternal>
            <Button
              borderRadius="25px"
              border="1px solid black"
              bg="transparent"
            >
              <Text marginRight='6px'>
                Graphic Design
              </Text>
              <Image src={arrow} />
            </Button>
          </Link>
        </Box>
      </Box>

      <Button
        mt="30px"
        border="1px solid"
        p="20px"
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
