import { Box } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Creatives from './Creatives'

const Home = () => {
  return (
    <Box>
        <Navbar/>
        <Creatives/>
        <Sidebar/>
    </Box>
  )
}

export default Home
