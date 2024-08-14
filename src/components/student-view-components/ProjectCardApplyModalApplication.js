import { Box, Flex, HStack, Image, Text, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from '@chakra-ui/react';
import React, { useContext, useState, useEffect } from 'react';
import { SignedInContext } from '../../App';
import { applyForProject, hasCompletedProfile } from '../../firebase/helpers';
import DefaultProfile from '../../assets/images/default-pfp.svg';
import PrimaryButtonGrey from '../button-components/PrimaryButtonGrey';
import PrimaryButtonBlack from '../button-components/PrimaryButtonBlack';

const ProjectCardApplyModalApplication = ({ handleApply, project, setAlreadyApplied }) => {
  const { value } = useContext(SignedInContext);
  const [formValue, setFormValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [allowApplication, setAllowApplication] = useState(false);

  const { name, photo_url } = value;

  useEffect(() => {
    if (allowApplication) {
      handleClick();
    }
  }, [allowApplication]);

  const handleClick = async () => {
    if (value?.uid) {
      const finishedProfile = await hasCompletedProfile(value.uid);

      if (!finishedProfile && !allowApplication) {
        setShouldShowModal(true);
        onOpen();
      } else {
        const applied = await applyForProject(value.uid, project.id, formValue);
        setAlreadyApplied(applied);
        handleApply();
      }
    }
  };

  const handleCloseModal = () => {
    setShouldShowModal(false);
    onClose();
  };

  const finishProfile = () => {
    setShouldShowModal(false);
    onClose();
    window.location.href = `/user/${value?.uid}`;
  };

  const applyAnyways = () => {
    setAllowApplication(true);
    setShouldShowModal(false);
    onClose();
  };

  return (
    <Flex h="590px" p="30px" color="white" w="400px" flexDir="column">
      <HStack>
        <Image
          mr="5px"
          borderRadius="50%"
          w="65px"
          src={photo_url ? photo_url : DefaultProfile}
        />
        <Text fontWeight="regular">{name}</Text>
      </HStack>
      <Box my="25px" bgColor="#535353" h="1px"></Box>
      <Flex flexDir="column">
        <Text pb="10px">Note to client</Text>
        <Textarea
          onChange={(e) => {
            setFormValue(e.target.value);
          }}
          value={formValue}
          border="1.5px solid #535353"
          _placeholder={{
            color: '#969696',
          }}
          h="200px"
          resize="none"
          placeholder="Add a note to your application to increase your chances of getting selected"
        />
      </Flex>
      <PrimaryButtonGrey mt="auto" onClick={handleClick}>
        Apply now!
      </PrimaryButtonGrey>

      {value?.uid && shouldShowModal && (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent pb="10px">
            <ModalHeader>Complete your profile!</ModalHeader>
            <ModalBody>
              <Text mb="20px">
                Your profile is not complete. Completing your profile will increase your chances of getting selected for projects.
              </Text>
              <Flex justifyContent="right">
                <PrimaryButtonGrey mr="10px" onClick={applyAnyways}>
                  Apply anyways
                </PrimaryButtonGrey>
                <PrimaryButtonBlack onClick={finishProfile}>
                  Complete Profile
                </PrimaryButtonBlack>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
};

export default ProjectCardApplyModalApplication;
