import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Home = () => {
  return (
    <Box>
        <Navbar/>
        <Sidebar/>
    </Box>
  )
}

export default Home
