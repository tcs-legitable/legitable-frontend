import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import StupaidLogo from '../../assets/landing-page-images/stupaid-logo-small.svg';
import GmailArrow from '../../assets/landing-page-images/continue-w-gmail-arrow-black.svg';
import CheckMark from '../../assets/landing-page-images/check-mark.svg';

const LandingSelectSkills = ({ goNext, data, setData }) => {
  const [skills, setSkills] = useState([]);

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

  const handleClick = () => {
    const skillNames = skills.map((skill) => {
      return skillList[skill].value;
    });

    setData({ ...data, skills: skillNames });

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
        <Text pt="15px">Select up to 3 skills</Text>
      </VStack>
      <Flex
        align="center"
        justifyContent="center"
        w="100%"
        minW="800px"
        flexDir="column"
        bg="transparent"
        pt="35px"
      >
        <Flex
          w={{ base: '450px', md: '770px' }}
          flexWrap="wrap"
          align="center"
          justify="center"
          pb="30px"
        >
          {skillList.map(({ id, text }) => {
            return (
              <Box
                display="flex"
                flexDir="row"
                m="4px"
                key={id}
                border="1px solid #0c0c0c"
                p="8px 30px"
                _hover={{
                  cursor: 'pointer',
                }}
                borderRadius="25px"
                color="#0c0c0c"
                bg="transparent"
                onClick={() => {
                  const newSkills = [...skills];
                  if (!skills.includes(id)) {
                    while (newSkills.length >= 3) {
                      newSkills.shift();
                    }
                    newSkills.push(id);
                    setSkills(newSkills);
                  } else if (skills.includes(id)) {
                    const filteredList = newSkills.filter(
                      (skill) => skill !== id,
                    );
                    setSkills(filteredList);
                  }
                }}
                bgColor={skills.includes(id) && '#d7d7d7'}
              >
                {skills.includes(id) && <Image pr="10px" src={CheckMark} />}
                {text}
              </Box>
            );
          })}
        </Flex>

        <Button
          border="1px solid"
          w="180px"
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
        >
          Continue
          <Image pl="10px" src={GmailArrow} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default LandingSelectSkills;
