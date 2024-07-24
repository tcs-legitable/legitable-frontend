import { Flex, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { SignedInContext } from '../../App';
import { getMyProjects } from '../../firebase/helpers';
import Navbar from '../global-components/Navbar';
import ProjectStatusBadge from '../misc-components/ProjectStatusBadge';

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
    <Flex w="100%" flexDir="column" h="inherit" minH="100vh" bgColor="#ffffff">
      <Navbar />
      <Flex px="60px" flexDir="column">
        <Text fontWeight="bold" fontSize="21px" mt="25px" mb="10px">
          My projects
        </Text>
        <Flex
          alignItems="center"
          flexDir="column"
          justifyContent="center"
          w="100%"
        >
          <Flex
            px="10px"
            fontWeight="bold"
            py="25px"
            w="100%"
            color="#8C8C8C"
            flexDir="row"
            fontSize={{ base: '10px', mdLg: '13px' }}
          >
            <Text w="30%">PROJECT NAME</Text>
            <Text w="17.5%">START DATE</Text>
            <Text w="17.5%">DEADLINE</Text>
            <Text w="17.5%">PEOPLE</Text>
            <Text w="17.5%">STAGE</Text>
            <Text w="17.5%">STATUS</Text>
          </Flex>
          {projects.length === 0 && (
            <Flex
              borderY="1px solid #E8E8E8"
              bgColor="#fafafa"
              w="100%"
              py="20px"
              px="10px"
              flexDir="row"
              fontSize={{ base: '13px', mdLg: '16px' }}
              justifyContent="center"
            >
              Create a project
            </Flex>
          )}
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
              status,
            } = project;
            return (
              <Flex
                borderY="1px solid #E8E8E8"
                bgColor="#fafafa"
                w="100%"
                key={id}
                py="20px"
                px="10px"
                flexDir="row"
                fontSize={{ base: '10px', mdLg: '13px' }}
                alignItems="center"
              >
                <Text w="30%" fontWeight="bold">
                  {name}
                </Text>
                <Text w="17.5%">
                  {status === 'unassigned' ? '--' : createdAt}
                </Text>
                <Text w="17.5%">
                  {status === 'unassigned' ? '--' : deadline}
                </Text>
                <Text w="17.5%">--</Text>
                <Text w="17.5%">--</Text>
                <Text w="17.5%">
                  <ProjectStatusBadge>Unassigned</ProjectStatusBadge>
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OrganizationProjectsPage;
