import { Button, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import StupaidVerified from '../global-components/StupaidVerified';
import LocationIcon from '../../assets/images/location-icon.svg';
import ProjectPrefIcon from '../../assets/images/project-pref-icon.svg';
import SchoolIcon from '../../assets/images/school-icon.svg';
import EditIcon from '../../assets/images/edit-icon.svg';
import PersonalSiteIcon from '../../assets/images/website-icon.svg';
import DefaultProfile from '../../assets/images/default-pfp.svg';

const ProfileUserInfo = ({ userData, canEdit }) => {
  const {
    input_name,
    city,
    country,
    isVerified,
    photo_url,
    school,
    projectPref,
    personal_site,
  } = userData;
  return (
    <Flex mb="30px" flexDir="column">
      <HStack>
        <Image
          borderRadius="50%"
          src={photo_url ? photo_url : DefaultProfile}
        />
        <VStack alignItems="baseline" ml="20px">
          <Text fontWeight="bold" fontSize="29px">
            {input_name}
          </Text>
          {isVerified && <StupaidVerified />}
        </VStack>
        {canEdit && (
          <Button
            border="#545454 solid 1.5px"
            bg="transparent"
            borderRadius="20px"
            alignSelf="baseline"
            ml="auto"
          >
            <Image mr="5px" src={EditIcon} />
            <Text>Edit profile</Text>
          </Button>
        )}
      </HStack>
      <VStack mt="30px" color="#545454" alignItems="baseline" w="fit-content">
        <HStack>
          <Image src={LocationIcon} />
          <Text>
            {city}, {country}
          </Text>
        </HStack>
        <HStack>
          <Image src={SchoolIcon} />
          <Text>{school}</Text>
        </HStack>
        <HStack>
          <Image src={ProjectPrefIcon} />
          <Text>{projectPref}</Text>
        </HStack>
        {personal_site && (
          <HStack mt="2px">
            <Image src={PersonalSiteIcon} />
            <Text>{personal_site}</Text>
          </HStack>
        )}
      </VStack>
    </Flex>
  );
};

export default ProfileUserInfo;
