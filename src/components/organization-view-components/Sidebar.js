import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Switch,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { skillOptions } from '../skillOptions';

const Sidebar = ({ onFilterChange }) => {
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [preference, setPreference] = useState('');
  const [verified, setVerified] = useState(false);

  const preferenceList = [
    { id: 0, text: 'In-person', value: 'in-person' },
    { id: 1, text: 'Remote', value: 'remote' },
    { id: 2, text: 'Any', value: 'any' },
  ];

  const test = () => {
    console.log('Skill:', skill);
    console.log('Location:', location);
    console.log('Preference:', preference);
    console.log('Switch:', verified);
  };

  const handleFilterChange = () => {
    onFilterChange({
      skill,
      location,
      preference,
      verified,
    });
  };

  return (
    <Box backgroundColor="white" width="30%" borderLeft="outset">
      <Text fontWeight="700" ml="60px" mt="60px">
        Skills
      </Text>
      <Flex w="70%" marginLeft="60px">
        <Select
          placeholder="Select a skill"
          borderRadius="20px"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          color={skill ? '#000' : '#969696'}
          mb="10px"
          //FIX THIS
          // pl="60px"
          // pr="60px"
          mt="10px"
          width="100%"
        >
          {skillOptions.map(({ id, text, value }) => (
            <option key={id} value={value}>
              {text}
            </option>
          ))}
        </Select>
      </Flex>

      <Text fontWeight="700" ml="60px" mt="20px">
        Location
      </Text>
      <Flex w="70%" marginLeft="60px">
        <Input
          placeholder="e.g. Vancouver"
          borderRadius="20px"
          value={location}
          _placeholder={{ color: '#969696' }}
          onChange={(e) => setLocation(e.target.value)}
          mb="10px"
          //FIX THIS
          // ml="60px"
          mt="10px"
        />
      </Flex>

      <Text fontWeight="700" ml="60px" mt="20px">
        Project preference
      </Text>

      <Flex
        align="center"
        justifyContent="center"
        w="100%"
        flexDir="column"
        bg="transparent"
        pt="10px"
      >
        <Flex flexWrap="wrap" align="center" FIX THIS pb="20px">
          {preferenceList.map(({ id, text, value }) => {
            return (
              <Box
                display="flex"
                flexDir="row"
                m="4px"
                key={id}
                border="1px solid #0c0c0c"
                p="4px 10px"
                _hover={{
                  cursor: 'pointer',
                }}
                borderRadius="25px"
                color="#0c0c0c"
                bg="transparent"
                onClick={() => setPreference(value)}
                bgColor={preference === value ? '#d7d7d7' : 'transparent'}
                fontSize="15px"
              >
                {text}
              </Box>
            );
          })}
        </Flex>
      </Flex>

      <Box display="flex" flexDirection="row" ml="60px" mt="5px">
        <Box width="60%">
          <Text fontWeight="700">Stupaid verified</Text>
          <Text mt="10px">
            Show only hand-selected verified Stupaid creatives
          </Text>
        </Box>

        {/* FIX COLOR */}
        <Box alignContent="center">
          <Switch
            colorScheme="teal"
            size="lg"
            ml="10px"
            isChecked={verified}
            onChange={() => setVerified(!verified)}
          />
        </Box>
      </Box>

      <Button
        width="70%"
        border="1px solid"
        p="4px 10px"
        ml="60px"
        mt="30px"
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
        onClick={handleFilterChange}
      >
        Find your creative
      </Button>
    </Box>
  );
};

export default Sidebar;
