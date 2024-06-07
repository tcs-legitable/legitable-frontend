import { Flex } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedInContext } from '../../App';
import Navbar from '../global-components/Navbar';
import ProjectsExplore from './ProjectsExplore';

const StudentLanding = ({ view }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!view || view !== 'student') {
      navigate('/landing');
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
