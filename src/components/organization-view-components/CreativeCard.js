import {
  Box,
  Button,
  Image,
  Text,
  Link,
  Flex,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import star from './../../assets/images/Star-stupaid-verified1.svg';
import arrow from './../../assets/images/up-right-arrow.svg';
import DefaultProfile from '../../assets/images/default-pfp.svg';

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
  isVerified,
}) => {
  const toast = useToast();

  return (
    <Box
      // backgroundColor="pink"
      borderRadius="10px"
      display="flex"
      flexDirection="row"
      p="25px"
      my="10px"
      border="1px solid #dbdbdb"
      width="90%"
      maxW="1100px"
    >
      <Box
        mr="20px"
        borderRadius="50%"
        w="200px"
        h="60px"
        backgroundImage={photo_url ? photo_url : DefaultProfile}
        backgroundColor="#dbdbdb"
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
      ></Box>
      <Box width="200%">
        <Box display="flex" flexDirection="row">
          <Text color="#555" fontSize="13px" mb="7px">
            {city}, {country} • {school} • {projectPref}
          </Text>
        </Box>

        <Box display="flex" flexDirection="row" mb="7px">
          <Text fontSize="xl" fontWeight="bold">
            {full_name}
          </Text>
          {isVerified && (
            <>
              <Text fontSize="xl" mx="10px">
                |
              </Text>
              <Button borderRadius="25px">
                <Image src={star} />
                <Text marginLeft="6px" fontSize="12px" fontWeight="300">
                  Stupaid verified
                </Text>
              </Button>
            </>
          )}
        </Box>

        <Flex gap="10px" mt="10px">
          {skills.map((skill, id) => {
            return (
              <Link key={id} href={website} isExternal>
                <Button
                  borderRadius="25px"
                  border="1px solid black"
                  bg="transparent"
                >
                  <Text marginRight="6px" fontWeight="300">
                    {skill?.skillName ? skill?.skillName : skill}
                  </Text>
                  <Image src={arrow} />
                </Button>
              </Link>
            );
          })}
        </Flex>
      </Box>

      <Box width="100%" textAlign="right">
        <Button
          // mt="30px"
          border="1px solid"
          p="15px"
          borderRadius="25px"
          color="#fafafa"
          bgColor="#0c0c0c"
          fontWeight="300"
          _hover={{
            backgroundPosition: 'left bottom',
          }}
          _active={{
            backgroundPosition: 'left bottom',
          }}
          onClick={() =>
            toast({
              title: 'Invite sent!',
              description: `Sent an invite to ${full_name.split(' ')[0]}`,
              status: 'success',
              duration: 1300,
              isClosable: true,
            })
          }
        >
          Invite to apply
        </Button>
      </Box>
    </Box>
  );
};

export default CreativeCard;
