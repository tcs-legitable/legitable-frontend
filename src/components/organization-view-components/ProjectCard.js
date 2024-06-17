import { Box, Text, Button, Flex, Link, Image } from '@chakra-ui/react';
import React from 'react';
import arrow from './../../assets/images/up-right-arrow.svg';

const ProjectCard = ({ project }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      mb="4"
      mt="7"
      backgroundColor="white"
    >
      <Flex
        flexDirection="column"
      >
        <Text
          fontFamily="13px"
          fontWeight="200"
          color="#555"
        >
          Started on {project.deadline} • Byron Wang • {project.city}, Canada
        </Text>

        <Text
          display="flex"
          flexDirection="row"
          fontSize="20px"
          fontWeight="500"
        >
          {project.name} | <Box>
            <Text 
              fontSize="12px"
              fontWeight="300" 
              ml="5px" 
              borderWidth="1px"
              borderRadius="20px"
              overflow="hidden"
              p="2"
              backgroundColor="#ececec"
            >
              {project.preference}
            </Text>
          </Box>
        </Text>

        <Text
          fontFamily="13px"
          fontWeight="200"
          color="#555"
        >
          Project links
        </Text>

        <Box pb="30px">
          <Link href={project.example} isExternal>
            <Button
              borderRadius="20px"
              border="1px solid black"
              bg="transparent"
            >
              <Text marginRight="6px" fontWeight="300">
                Contract
              </Text>
              <Image src={arrow} />
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProjectCard;
