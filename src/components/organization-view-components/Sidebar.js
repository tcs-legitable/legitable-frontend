import {
  Box,
  Flex,
  Image,
  Input,
  Select,
  Switch,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { skillOptions } from '../skillOptions';
import StupaidVerifiedBadge from '../../assets/images/stupaid-verified-badge.svg';
import PrimaryButtonBlack from '../button-components/PrimaryButtonBlack';

const Sidebar = ({ onFilterChange }) => {
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [verified, setVerified] = useState(false);

  const handleFilterChange = () => {
    onFilterChange({
      skill,
      location,
      verified,
    });
  };

  return (
    <Box textAlign="-webkit-center">
      <Flex alignItems="baseline" w="80%" flexDir="column">
        <Text fontWeight="700">Skills</Text>
        <Select
          placeholder="Select a skill"
          borderRadius="7px"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          color={skill ? '#000' : '#969696'}
          mb="10px"
          mt="10px"
          width="100%"
        >
          {skillOptions.map(({ id, text }) => (
            <option key={id} value={text}>
              {text}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex alignItems="baseline" w="80%" flexDir="column">
        <Text fontWeight="700" mt="20px">
          Location
        </Text>
        <Input
          placeholder="e.g. Vancouver"
          borderRadius="7px"
          value={location}
          _placeholder={{ color: '#969696' }}
          onChange={(e) => setLocation(e.target.value)}
          mb="10px"
          mt="10px"
        />
      </Flex>

      <Box w="80%" textAlign="left" display="flex" flexDirection="row" mt="5px">
        <Box>
          <Flex>
            <Text
              w={{ base: 'min-content', mdLg: 'fit-content' }}
              fontWeight="700"
            >
              Stupaid verified
            </Text>
            <Image ml="7px" src={StupaidVerifiedBadge} />
          </Flex>
          <Text mt="10px" fontSize="16px">
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

      <PrimaryButtonBlack mt="20px" width="80%" onClick={handleFilterChange}>
        Find your creative
      </PrimaryButtonBlack>
    </Box>
  );
};

export default Sidebar;
