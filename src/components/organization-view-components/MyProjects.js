import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Navbar from '../global-components/Navbar';
import { getAllProjects } from '../../firebase/helpers';
import ProjectCard from './ProjectCard';

const MyProjects = () => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await getAllProjects();
      setProjects(projectsData);
    };

    fetchProjects();
  }, []);

  return (
    <Flex
      flexDirection="column"
      backgroundColor="white"
    >
      <Navbar/>
      <Flex
        backgroundColor="#fafafa"
        width="100vw"
        height="100vh"
        flexDirection="column"
        pl="60px"
        pr="60px"
        h="fit-content"
      >
        <Flex>
          <Text
            mt="30px"
            fontSize="30px"
            fontWeight="600"
          >
            My projects
          </Text>
        </Flex>

        <Text
          fontSize="24px"
          fontWeight="300"
        >
          Live projects
        </Text>

        <Text
          fontSize="24px"
          fontWeight="300"
        >
          Unassigned projects
        </Text>

        <Box>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Box>

      </Flex>
    </Flex>
  );
};

export default MyProjects;
