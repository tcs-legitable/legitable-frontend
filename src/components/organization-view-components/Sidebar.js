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

const Sidebar = () => {
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [preference, setPreference] = useState('');
  const [verified, setVerified] = useState(false);

  const preferenceList = [
    { id: 0, text: 'In-person', value: 'in-person' },
    { id: 1, text: 'Remote', value: 'remote' },
    { id: 2, text: 'Any', value: 'any' },
  ];

  const skillList = [
    { id: 0, text: 'Branding', value: 'branding' },
    { id: 1, text: 'Graphic Design', value: 'graphic-design' },
    { id: 2, text: 'Digital Art', value: 'digital-art' },
    { id: 3, text: 'Traditional Art', value: 'traditional-art' },
    { id: 4, text: 'Slidedeck Design', value: 'slidedeck-design' },
    { id: 5, text: 'Website Design', value: 'website-design' },
    { id: 6, text: 'Website Development', value: 'website-development' },
    { id: 7, text: 'UI/UX Design', value: 'ui-ux-design' },
    { id: 8, text: 'Social Media Content', value: 'social-media-content' },
    { id: 9, text: 'Photography', value: 'photography' },
    { id: 10, text: 'Videography', value: 'videography' },
    { id: 11, text: 'Animation', value: 'animation' },
    { id: 12, text: '3D Modeling', value: '3d-modeling' },
    { id: 13, text: 'Music Production', value: 'music-production' },
  ];

  const test = () => {
    console.log('Skill:', skill);
    console.log('Location:', location);
    console.log('Preference:', preference);
    console.log('Switch:', verified);
  };

  return (
    <Box
      backgroundColor="white"
      width="40%"
      borderLeft="outset">
      <Text
        fontWeight="700"
        ml="60px"
        mt="60px"
      >
        Skills
      </Text>
      <Select
        placeholder="Select a skill"
        borderRadius="20px"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        color={skill ? '#000' : '#969696'}
        mb="10px"
        ml="60px"
        mr="60px"
        width="100%"
      >
        {skillList.map(({ id, text, value }) => (
          <option key={id} value={value}>
            {text}
          </option>
        ))}
      </Select>

      <Text
        fontWeight="700"
        ml="60px"
        mt="30px"
      >
        Location
      </Text>
      <Input
        placeholder="e.g. Vancouver"
        borderRadius="20px"
        value={location}
        _placeholder={{ color: '#969696' }}
        onChange={(e) => setLocation(e.target.value)}
        mb="10px"
        ml="60px"
      />

      <Text
        fontWeight="700"
        ml="60px"
        mt="30px"
      >
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
        <Flex
          w={{ base: '300px', md: '400px' }}
          flexWrap="wrap"
          align="center"
          ml="60px"
          pb="20px"
        >
          {preferenceList.map(({ id, text, value }) => {
            return (
              <Box
                display="flex"
                flexDir="row"
                m="4px"
                key={id}
                border="1px solid #0c0c0c"
                p="8px 20px"
                _hover={{
                  cursor: 'pointer',
                }}
                borderRadius="25px"
                color="#0c0c0c"
                bg="transparent"
                onClick={() => setPreference(value)}
                bgColor={preference === value ? '#d7d7d7' : 'transparent'}
              >
                {text}
              </Box>
            );
          })}
        </Flex>
      </Flex>

      <Box
        display="flex"
        flexDirection="row"
        ml="60px"
      >
        <Box
          width="60%"
        >
          <Text
            fontWeight="700">
            Stupaid verified
          </Text>
          <Text>
            Show only hand-selected verified Stupaid creatives
          </Text>
        </Box>

        {/* FIX COLOR */}
        <Box
          alignContent="center"
        >
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
        width="100%"
        border="1px solid"
        p="23px"
        ml="60px"
        mt="50px"
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
        onClick={test}
      >
        Find your creative
      </Button>
    </Box>
  );
};

export default Sidebar;
