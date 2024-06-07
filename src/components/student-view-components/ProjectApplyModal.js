import {
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ProjectApplicationSuccessModal from './ProjectApplicationSuccessModal';
import ProjectCardApplyModal from './ProjectCardApplyModal';
import ProjectCardApplyModalApplication from './ProjectCardApplyModalApplication';

const ProjectApplyModal = ({
  isOpen,
  onClose,
  project,
  setAlreadyApplied,
  key,
}) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const [triggerSuccessModal, setTriggerSuccessModal] = useState(false);

  const handleApply = () => {
    onClose();
    setTriggerSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setTriggerSuccessModal(false);
  };

  return (
    <>
      {triggerSuccessModal ? (
        <ProjectApplicationSuccessModal
          isOpen={triggerSuccessModal}
          onClose={handleSuccessClose}
        />
      ) : (
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
              <ProjectCardApplyModalApplication
                onClose={onClose}
                key={key}
                project={project}
                triggerSuccessModal={triggerSuccessModal}
                handleApply={handleApply}
                setAlreadyApplied={setAlreadyApplied}
              />
            </Flex>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ProjectApplyModal;
