import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../global-components/Navbar';
import ProjectsExplore from './ProjectsExplore';

const StudentLanding = ({ view }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!view || view !== 'student') {
      navigate('/student-signup');
    }
  }, []);

  return (
    <Flex className="landing" flexDir="column" w="100%" h="100%">
      <Navbar />
      <ProjectsExplore />
    </Flex>
  );
};

export default StudentLanding;
