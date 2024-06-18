import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { SignedInContext } from '../../App';
import { getMyProjects } from '../../firebase/helpers';
import Navbar from '../global-components/Navbar';

const OrganizationProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  const { value } = useContext(SignedInContext);

  useEffect(() => {
    const fetchProjects = async () => {
      if (value?.uid) {
        const fetchedProjects = await getMyProjects(value?.uid);
        setProjects(fetchedProjects);
      }
    };

    fetchProjects();
  }, [value]);
  return (
    <Flex w="100%" flexDir="column" h="inherit" minH="100vh" bgColor="#fafafa">
      <Navbar />
      <Flex p="20px" flexDir="column">
        <Text fontWeight="bold" fontSize="26px" mt="20px" mb="30px">
          My Projects
        </Text>
        <Box w="100%" bgColor="#e7e7e7" h="1.5px" mb="20px"></Box>
        <Flex
          alignItems="center"
          flexDir="column"
          gap="20px"
          justifyContent="center"
          w="100%"
        >
          {projects.map((project, id) => {
            const {
              budget,
              city,
              createdAt,
              deadline,
              description,
              example,
              name,
              preference,
              skill,
              optionalNote,
            } = project;
            return (
              <Flex
                maxW="1100px"
                border="1.5px solid #ededed"
                borderRadius="10px"
                bgColor="white"
                w="100%"
                h="150px"
                key={id}
                p="20px"
              >
                <VStack alignItems="baseline">
                  <Text color="#555555">
                    Started on {createdAt.split('T')[0]} - {city}
                  </Text>
                  <HStack mt="13px" spacing="20px">
                    <Text fontWeight="bold" fontSize="20px">
                      {name}
                    </Text>
                    <Box h="50%" w="1.5px" bgColor="black"></Box>
                    <Box bgColor="#ececec" p="13px" borderRadius="20px">
                      {preference}
                    </Box>
                  </HStack>
                </VStack>
                <Button
                  bgColor="#0c0c0c"
                  color="white"
                  borderRadius="20px"
                  fontWeight="light"
                  ml="auto"
                  mr="20px"
                  position="relative"
                >
                  Update status
                </Button>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OrganizationProjectsPage;
