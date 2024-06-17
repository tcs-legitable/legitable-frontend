import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import Navbar from '../global-components/Navbar';
import Sidebar from './Sidebar';
import Creatives from './Creatives';

const Home = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Box
      backgroundColor="#fafafa"
      width="100vw"
      height="fitContent"
      minH="100vh"
    >
      <Navbar />
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Creatives filters={filters} />
        <Sidebar onFilterChange={handleFilterChange} />
      </Box>
    </Box>
  );
};

export default Home;
