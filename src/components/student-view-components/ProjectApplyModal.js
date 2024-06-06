import {
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import ProjectCardApplyModal from './ProjectCardApplyModal';
import ProjectCardApplyModalApplication from './ProjectCardApplyModalApplication';

const ProjectApplyModal = ({ isOpen, onClose, project, key }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={isDesktop ? '800px' : '400px'} alignItems="center">
        <Flex
          overflow="hidden"
          borderRadius={isDesktop ? '20px' : '5px'}
          w={isDesktop ? '800px' : '400px'}
          bgColor="#0c0c0c"
          flexDir={isDesktop ? 'row' : 'column'}
        >
          <ProjectCardApplyModal key={key} project={project} />
          <ProjectCardApplyModalApplication key={key} project={project} />
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default ProjectApplyModal;
