import { Box } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../global-components/Navbar';
import Sidebar from './Sidebar';
import Creatives from './Creatives';

const Home = () => {
  return (
    <Box
      backgroundColor="#fafafa"
    >
      <Navbar />
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Creatives />
        <Sidebar />
      </Box>
    </Box>
  );
};

export default Home;
