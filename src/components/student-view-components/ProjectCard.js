import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';

const ProjectCard = ({ project }) => {
  const {
    name,
    location,
    deadline,
    budget,
    project_pref,
    tags,
    description,
    photo_url,
    lead_name,
    links,
    organization_name,
  } = project;
  return (
    <Flex
      border="2px solid #ececec"
      borderRadius="20px"
      p="20px"
      bgColor="white"
      w="100%"
      flexDir="column"
    >
      <Text color="#555555">
        {location} - {project_pref}
      </Text>
      <Text py="20px" fontSize="23px" fontWeight="bold">
        {name}
      </Text>
      <Text pb="20px">{description}</Text>
      <Text py="7px">Deadline {deadline}</Text>
      <Text pb="20px">Budget (CAD) {budget}</Text>
      {tags.map((tag, id) => {
        return (
          <Box
            my="5px"
            borderRadius="20px"
            py="6px"
            px="15px"
            w="fit-content"
            border="1px solid #ececec"
            key={id}
          >
            {tag}
          </Box>
        );
      })}
      <Text pt="20px">Example links</Text>
      <Flex pt="15px" flexDir="column">
        {links.map(({ display_name, link }, id) => {
          return (
            <Link isExternal href={link} key={id} textDecoration="underline">
              {display_name}
            </Link>
          );
        })}
      </Flex>
      <Flex pt="20px" flexDir="row" align="center">
        <Image mr="20px" borderRadius="50%" w="80px" src={photo_url} />
        <Flex flexDir="column">
          <Link>{lead_name?.name}</Link>
          <Text>{organization_name}</Text>
        </Flex>
      </Flex>
      <Button>Apply now!</Button>
    </Flex>
  );
};

export default ProjectCard;
