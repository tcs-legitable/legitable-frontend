import { Flex } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../global-components/Navbar';
import ProjectsExplore from './ProjectsExplore';

const StudentLanding = () => {
  return (
    <Flex flexDir="column" w="100%" h="100vh">
      <Navbar />
      <ProjectsExplore />
    </Flex>
  );
};

export default StudentLanding;
