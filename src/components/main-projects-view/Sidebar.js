import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'

const Sidebar = () => {
  return (
    <Box
        backgroundColor='white'
        width='40%'
        float='right'
    >
        <Text>
            Skills
        </Text>

        <Text>
            location
        </Text>

        <Text>
            Project preference
        </Text>

        <Text>
            Stupaid verified
        </Text>

        <Button
            border="1px solid"
            p="23px"
            borderRadius="25px"
            color="#fafafa"
            bgColor="#0c0c0c"
            fontWeight="regular"
            _hover={{
              backgroundPosition: "left bottom",
            }}
            _active={{
              backgroundPosition: "left bottom",
            }}
        >
            Find your creative
        </Button>
    </Box>
  )
}

export default Sidebar
