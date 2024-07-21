import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import StupaidLogo from '../../assets/landing-page-images/stupaid-logo-small.svg';
import GmailArrow from '../../assets/landing-page-images/continue-w-gmail-arrow-black.svg';
import { skillOptions } from '../skillOptions';
import PrimaryButtonBlack from '../button-components/PrimaryButtonBlack';

const LandingSelectSkills = ({ goNext, data, setData }) => {
  const [skills, setSkills] = useState([]);

  const handleClick = () => {
    const skillNames = skills.map((skill) => {
      return {
        skillName: skillOptions[skill].text,
        description: null,
        image: null,
        link: null,
      };
    });

    setData({
      ...data,
      skills: skillNames,
      projects: [],
      isVerified: false,
      personal_site: null,
      type: 'student',
    });

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
          {skillOptions.map(({ id, text }) => {
            const skillColors = ['#F3D1F4', '#C3D61E', '#A4F1EB'];
            const skillIndex = skills.indexOf(id);
            const bgColor =
              skillIndex !== -1 ? skillColors[skillIndex] : 'transparent';
            console.log(bgColor, ' iS COOLR');

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
                borderRadius="7px"
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
                bgColor={bgColor}
              >
                {text}
              </Box>
            );
          })}
        </Flex>

        <PrimaryButtonBlack px="43px" onClick={() => handleClick()}>
          Continue
          <Image pl="10px" src={GmailArrow} />
        </PrimaryButtonBlack>
      </Flex>
    </Flex>
  );
};

export default LandingSelectSkills;
