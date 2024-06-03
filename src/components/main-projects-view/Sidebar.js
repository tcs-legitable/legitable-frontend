import { Box, Button, Flex, Switch, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

const Sidebar = () => {

  const [preference, setPreference] = useState('');

  const preferenceList = [
    { id: 0, text: "In-person", value: "in-person" },
    { id: 1, text: "Remote", value: "remote" },
    { id: 2, text: "Any", value: "any" },
  ];

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

        <Flex
        align="center"
        justifyContent="center"
        w="100%"
        flexDir="column"
        bg="transparent"
        pt="10px"
        >
            <Flex
            w={{ base: "300px", md: "400px" }}
            flexWrap="wrap"
            align="center"
            justify="center"
            pb="20px"
            >
            {preferenceList.map(({ id, text, value }) => {
                return (
                <Box
                    display="flex"
                    flexDir="row"
                    m="4px"
                    key={id}
                    border="1px solid #0c0c0c"
                    p="8px 20px"
                    _hover={{
                      cursor: "pointer",
                    }}
                    borderRadius="25px"
                    color="#0c0c0c"
                    bg="transparent"
                    onClick={() => setPreference(value)}
                    bgColor={preference === value ? "#d7d7d7" : "transparent"}
                >
                    {text}
                </Box>
                );
            })}
            </Flex>
        </Flex>

        <Box
            display='flex'
            flexDirection='row'
        >
            <Box>
                <Text>
                    Stupaid verified
                </Text>
                <Text>
                    Show only hand-selected verified Stupaid creatives
                </Text>
            </Box>

            {/* FIX COLOR */}
            <Switch colorScheme='teal' size='lg' />
        </Box>

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
