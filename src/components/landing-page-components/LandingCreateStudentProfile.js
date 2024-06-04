import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import StupaidLogo from '../../assets/landing-page-images/stupaid-logo-small.svg';
import GmailArrow from '../../assets/landing-page-images/continue-w-gmail-arrow-black.svg';

const LandingCreateStudentProfile = ({ goNext, setData, data }) => {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [year, setYear] = useState('');

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const [projectPref, setProjectPref] = useState(0);

  const projectPrefButtons = [
    { id: 0, text: 'In-person', value: 'in-person' },
    { id: 1, text: 'Remote', value: 'remote' },
    { id: 2, text: 'Any', value: 'any' },
  ];

  const handleClick = () => {
    const moreData = {
      input_name: name,
      input_first_name: name.split(' ')[0],
      year: year,
      school: school,
      city: city,
      country: country,
      projectPref: projectPrefButtons[projectPref].value,
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
        <Text pt="15px">Create your student profile</Text>
      </VStack>
      <Flex
        justifyContent="center"
        w="100%"
        // flexDir={{ base: "column", mdLg: "row" }}
        flexDir="column"
        bg="transparent"
        pt="25px"
      >
        <Input
          placeholder="Full name"
          borderRadius="20px"
          value={name}
          _placeholder={{ color: '#969696' }}
          onChange={(e) => setName(e.target.value)}
          mb="10px"
        />
        <Input
          placeholder="Name of School / Institution"
          borderRadius="20px"
          value={school}
          _placeholder={{ color: '#969696' }}
          onChange={(e) => setSchool(e.target.value)}
          mb="10px"
        />
        <Input
          mb="20px"
          placeholder="Year Level"
          borderRadius="20px"
          value={year}
          _placeholder={{ color: '#969696' }}
          onChange={(e) => setYear(e.target.value)}
        />
        <Flex mb="20px" flexDir="column">
          <Text mb="4px">I am based in...</Text>
          <Flex flexDir="row">
            <Input
              placeholder="Country"
              borderRadius="20px"
              value={country}
              _placeholder={{ color: '#969696' }}
              onChange={(e) => setCountry(e.target.value)}
              mb="5px"
            />
            <Input
              placeholder="City"
              borderRadius="20px"
              value={city}
              _placeholder={{ color: '#969696' }}
              onChange={(e) => setCity(e.target.value)}
              mb="5px"
            />
          </Flex>
        </Flex>
        <Flex flexDir="column">
          <Text mb="4px">Project preference</Text>
          <Flex
            flexDir="row"
            pb="30px"
            alignSelf="center"
            justifyContent="space-between"
            w="100%"
          >
            {projectPrefButtons.map(({ id, text, value }) => {
              return (
                <Box
                  key={id}
                  border="1px solid #0c0c0c"
                  p="8px 40px"
                  _hover={{
                    cursor: 'pointer',
                  }}
                  borderRadius="25px"
                  color="#0c0c0c"
                  bg="transparent"
                  onClick={() => setProjectPref(id)}
                  bgColor={id === projectPref && '#d7d7d7'}
                >
                  {text}
                </Box>
              );
            })}
          </Flex>
        </Flex>

        <Button
          isDisabled={
            name === '' ||
            school === '' ||
            year === '' ||
            country === '' ||
            city === '' ||
            projectPref === ''
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

export default LandingCreateStudentProfile;
