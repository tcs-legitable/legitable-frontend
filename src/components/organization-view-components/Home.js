import { Box, useBreakpointValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import Navbar from '../global-components/Navbar';
import Sidebar from './Sidebar';
import Creatives from './Creatives';

const Home = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const isDesktop = useBreakpointValue({ base: false, mdLg: true });

  return (
    <Box
      backgroundColor="#fafafa"
      width="100vw"
      height="fitContent"
      minH="100vh"
    >
      <Navbar />
      <Box
        mt="30px"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Creatives filters={filters} />
        {isDesktop && <Sidebar onFilterChange={handleFilterChange} />}
      </Box>
    </Box>
  );
};

export default Home;
