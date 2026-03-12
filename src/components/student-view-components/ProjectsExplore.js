import {
  Box,
  Flex,
  Text,
  Spinner,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { SignedInContext } from '../../App';
import {
  getAllProjects,
  hasSeenPopup,
  updateSeenPopup,
  hasCompletedProfile,
} from '../../firebase/helpers';
import PrimaryButtonBlack from '../button-components/PrimaryButtonBlack';
import PrimaryButtonGrey from '../button-components/PrimaryButtonGrey';
import ProjectCard from './ProjectCard';

const ProjectsExplore = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const { value } = useContext(SignedInContext);

  useEffect(() => {
    const checkModal = async () => {
      const hasSeen = await hasSeenPopup(value?.uid);
      const finishedProfile = await hasCompletedProfile(value?.uid);
      if (!hasSeen && !finishedProfile) {
        setShouldShowModal(true);
        onOpen();
      }
    };

    checkModal();
  }, [value, onOpen]);

  const handleCloseModal = async () => {
    await updateSeenPopup(value?.uid);
    setShouldShowModal(false);
    onClose();
  };

  const finishProfile = async () => {
    await updateSeenPopup(value?.uid);
    setShouldShowModal(false);
    onClose();
    window.location.href = `/user/${value?.uid}`;
  };

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getAllProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Flex bgColor="#fafafa" py="40px" px="50px" h="100%" flexDir="column">
      <Text fontWeight="bold" fontSize="30px">
        Top projects for you this week
      </Text>
      <Box mt="40px" bgColor="#e7e7e7" h="2px" w="100%"></Box>
      {loadingProjects ? (
        <Flex justify="center" pt="60px">
          <Spinner size="lg" color="#0c0c0c" />
        </Flex>
      ) : projects.length > 0 ? (
        <Flex
          pt="40px"
          gap="30px"
          justify="center"
          flexDir={isDesktop ? 'row' : 'column'}
        >
          {projects.map((project, id) => {
            return <ProjectCard project={project} key={id} />;
          })}
        </Flex>
      ) : (
        <Flex justify="center" pt="60px">
          <Text color="#8c8c8c" fontSize="18px">No projects available right now. Check back soon!</Text>
        </Flex>
      )}
      {value?.uid && shouldShowModal && (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent pb="10px">
            <ModalHeader>Complete your profile!</ModalHeader>
            <ModalBody>
              <Text mb="20px">
                Before you apply for projects, ensure you've created a profile!
              </Text>
              <Flex justifyContent="right">
                <PrimaryButtonGrey mr="10px" onClick={handleCloseModal}>
                  Do it later
                </PrimaryButtonGrey>
                <PrimaryButtonBlack onClick={finishProfile}>
                  Update Profile
                </PrimaryButtonBlack>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
};

export default ProjectsExplore;
