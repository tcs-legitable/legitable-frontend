import { Box, Button, Flex, HStack, Image, Link, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import DeadlineIcon from '../../assets/images/deadline-icon.svg';
import BudgetIcon from '../../assets/images/budget-icon.svg';
import LinkArrow from '../../assets/images/link-arrow.svg';
import ProjectApplyModal from './ProjectApplyModal';
import { studentAlreadyAppliedForProject } from '../../firebase/helpers';
import { SignedInContext } from '../../App';
import DefaultProfile from '../../assets/images/default-pfp.svg';
import ApplyButtonIcon from '../../assets/images/apply-button-icon.svg';

const ProjectCard = ({ project }, key) => {
  const {
    name,
    id,
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

  const [projectApplyModalOpen, setProjectApplyModalOpen] = useState({});
  const [isTruncated, setIsTruncated] = useState(true);
  const { value } = useContext(SignedInContext);

  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollHeight > textRef.current.clientHeight,
      );
    }
  }, [description]);

  useEffect(() => {
    const checkApplied = async () => {
      const check = await studentAlreadyAppliedForProject(value?.uid, id);
      setAlreadyApplied(check);
    };

    if (value.uid) {
      checkApplied();
    }
  }, [value]);

  const openProjectModal = (id) => {
    setProjectApplyModalOpen((prevModalOpen) => ({
      ...prevModalOpen,
      [id]: true,
    }));
  };

  const closeProjectModal = (id) => {
    setProjectApplyModalOpen((prevModalOpen) => ({
      ...prevModalOpen,
      [id]: false,
    }));
  };
  return (
    <Flex
      border="2px solid #ececec"
      borderRadius="15px"
      p="20px"
      bgColor="white"
      w="100%"
      h={isTruncated ? '780px' : 'fit-content'}
      // minH="1000px"
      flexDir="column"
    >
      <Text fontSize="23px" fontWeight="bold">
        {name}
      </Text>
      <Text py="15px" color="#555555">
        {location} - {project_pref}
      </Text>
      <Box mb="10px" display="flex" flexDir="column" alignItems="center">
        <Text
          ref={textRef}
          color="#555555"
          pb="20px"
          height={isTruncated ? '100px' : 'fit-content'}
          overflow={isTruncated && 'hidden'}
          textOverflow="ellipsis"
          style={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: isTruncated ? 2 : 'none',
          }}
        >
          {description}
        </Text>
        {isTruncated && (
          <Link
            alignSelf="baseline"
            onClick={toggleTruncate}
            color="#8C8C8C"
            cursor="pointer"
          >
            See more
          </Link>
        )}

        {!isTruncated && (
          <Link
            alignSelf="baseline"
            onClick={toggleTruncate}
            color="#8C8C8C"
            cursor="pointer"
          >
            See less
          </Link>
        )}
      </Box>
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
              href={link}
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
      <Flex flexDir="column" pos="relative" marginTop="auto">
        <Flex mb="10px" pt="20px" flexDir="row" align="center">
          <Image
            mr="20px"
            borderRadius="50%"
            w="80px"
            src={photo_url ? photo_url : DefaultProfile}
          />
          <Flex flexDir="column">
            <HStack>
              <Link isExternal href={lead_name?.link}>
                {lead_name?.name}
              </Link>
              <Image src={LinkArrow} />
            </HStack>
            <Text color="#969696">{organization_name}</Text>
          </Flex>
        </Flex>
        <Button
          isDisabled={alreadyApplied}
          alignSelf="center"
          py="24px"
          mb="10px"
          w={{ base: '100%', mdLg: '100%' }}
          fontWeight="regular"
          mt="20px"
          bgColor="#0c0c0c"
          color="white"
          _hover={{
            bgColor: '#2e2e2e',
            color: 'white',
          }}
          _active={{
            bgColor: '#2e2e2e',
            color: 'white',
          }}
          onClick={() => {
            openProjectModal(key);
          }}
        >
          <Image src={ApplyButtonIcon} mr="6px" />
          {alreadyApplied ? 'Already applied' : 'Apply now!'}
        </Button>
      </Flex>
      <ProjectApplyModal
        pt="0px"
        key={key}
        project={project}
        onClose={() => {
          closeProjectModal(key);
        }}
        isOpen={projectApplyModalOpen[key] || false}
        setAlreadyApplied={setAlreadyApplied}
      />
    </Flex>
  );
};

export default ProjectCard;
