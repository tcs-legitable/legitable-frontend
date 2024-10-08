import { Box, Flex, HStack, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import DeadlineIcon from '../../assets/images/deadline-icon.svg';
import BudgetIcon from '../../assets/images/budget-icon.svg';
import LinkArrow from '../../assets/images/link-arrow.svg';
import DefaultProfile from '../../assets/images/default-pfp.svg';
import { formatUrl } from '../../firebase/helpers';

const ProjectCardApplyModal = ({ project, key }) => {
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
    <Flex p="30px" bgColor="white" w="400px" flexDir="column">
      <Text color="#555555">
        {location} - {project_pref}
      </Text>
      <Text py="20px" fontSize="23px" fontWeight="bold">
        {name}
      </Text>
      <Text color="#555555" pb="20px">
        {description}
      </Text>
      <HStack py="7px">
        <Image src={DeadlineIcon} />
        <Text color="#969696">
          Deadline{' '}
          <Box pl="10px" color="#0c0c0c" as="span">
            {deadline}
          </Box>
        </Text>
      </HStack>
      <HStack pb="20px">
        <Image src={BudgetIcon} />
        <Text color="#969696">
          Budget (CAD){' '}
          <Box pl="10px" color="#0c0c0c" as="span">
            {budget}
          </Box>
        </Text>
      </HStack>
      {tags.map((tag, id) => {
        return (
          <Box
            color="#555555"
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
      <Text color="#555555" pt="20px">
        Example links
      </Text>
      <Flex pt="15px" flexDir="column">
        {links.map(({ display_name, link }, id) => {
          return (
            <Link
              w="fit-content"
              color="#969696"
              isExternal
              href={formatUrl(link)}
              key={id}
              textDecoration="underline"
            >
              <HStack>
                <Text>{display_name}</Text>
                <Image src={LinkArrow} />
              </HStack>
            </Link>
          );
        })}
      </Flex>
      <Flex pt="20px" flexDir="row" align="center">
        <Image
          mr="20px"
          borderRadius="50%"
          w="80px"
          src={photo_url ? photo_url : DefaultProfile}
        />
        <Flex flexDir="column">
          <HStack>
            <Link src={lead_name?.link}>{lead_name?.name}</Link>
            <Image src={LinkArrow} />
          </HStack>
          <Text color="#969696">{organization_name}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProjectCardApplyModal;
