import { Button, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import StupaidVerified from '../global-components/StupaidVerified';

const ProfileUserInfo = ({ userData, canEdit }) => {
  const {
    input_name,
    city,
    country,
    isVerified,
    photo_url,
    school,
    projectPref,
  } = userData;
  return (
    <Flex mb="30px" flexDir="column">
      <HStack>
        <Image borderRadius="50%" src={photo_url} />
        <VStack alignItems="baseline" ml="20px">
          <Text fontWeight="bold" fontSize="29px">
            {input_name}
          </Text>
          {isVerified && <StupaidVerified />}
          {canEdit && (
            <Button>
              <Text>Edit profile</Text>
            </Button>
          )}
        </VStack>
      </HStack>
    </Flex>
  );
};

export default ProfileUserInfo;
