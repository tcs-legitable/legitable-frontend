import { Button, Flex, Image, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import StupaidLogo from '../../assets/landing-page-images/stupaid-logo-small.svg';
import GmailArrow from '../../assets/landing-page-images/continue-w-gmail-arrow-black.svg';

const LandingCreateOrganizationProfile = ({ goNext, setData, data }) => {
  const [name, setName] = useState('');

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const [socialLink, setSocialLink] = useState('');
  const [organizationName, setOrganizationName] = useState('');

  const handleClick = () => {
    const moreData = {
      input_name: name,
      input_first_name: name.split(' ')[0],
      organizationName: organizationName,
      socialLink: socialLink,
      city: city,
      country: country,
      projects: [],
      type: 'organization',
    };

    setData({ ...data, ...moreData });
    goNext();
  };

  return (
    <Flex
      zIndex="0"
      bg="transparent"
      flexDir="column"
      alignItems="center"
      pb="0px"
    >
      <Image
        bg="transparent"
        w={{ base: '200px', mdLg: '150px' }}
        src={StupaidLogo}
      />
      <VStack spacing="0px" fontSize="20px">
        <Text pt="15px">Create your profile</Text>
      </VStack>
      <Flex
        justifyContent="center"
        w="100%"
        flexDir="column"
        bg="transparent"
        pt="25px"
      >
        <Input
          placeholder="Full name"
          borderRadius="10px"
          value={name}
          _placeholder={{ color: '#969696' }}
          onChange={(e) => setName(e.target.value)}
          mb="10px"
        />
        <Input
          placeholder="Organization Name"
          borderRadius="10px"
          value={organizationName}
          _placeholder={{ color: '#969696' }}
          onChange={(e) => setOrganizationName(e.target.value)}
          mb="10px"
        />
        <Input
          mb="20px"
          placeholder="Social Link (e.g. Linkedin)"
          borderRadius="10px"
          value={socialLink}
          _placeholder={{ color: '#969696' }}
          onChange={(e) => setSocialLink(e.target.value)}
        />
        <Flex mb="20px" flexDir="column">
          <Text mb="4px">I am based in...</Text>
          <Flex gap="10px" flexDir="row">
            <Input
              placeholder="Country"
              borderRadius="10px"
              value={country}
              _placeholder={{ color: '#969696' }}
              onChange={(e) => setCountry(e.target.value)}
              mb="5px"
            />
            <Input
              placeholder="City"
              borderRadius="10px"
              value={city}
              _placeholder={{ color: '#969696' }}
              onChange={(e) => setCity(e.target.value)}
              mb="5px"
            />
          </Flex>
        </Flex>

        <Button
          isDisabled={
            name === '' ||
            organizationName === '' ||
            socialLink === '' ||
            country === '' ||
            city === ''
          }
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
          onClick={() => handleClick()}
          w="50%"
          alignSelf="center"
        >
          Continue
          <Image pl="10px" src={GmailArrow} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default LandingCreateOrganizationProfile;
