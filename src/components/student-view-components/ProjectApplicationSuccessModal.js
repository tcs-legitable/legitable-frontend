import {
  Button,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import StupaidLogo from '../../assets/landing-page-images/stupaid-logo-small.svg';

const ProjectApplicationSuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent alignSelf="center" alignContent="center">
        <Flex
          gap="20px"
          flexDir="column"
          p="20px"
          alignItems="center"
          textAlign="center"
        >
          <Image src={StupaidLogo} w="100px" />
          <Text w="260px">
            You've successfully applied for the project! Keep an eye on stupaid
            for updates from the client.
          </Text>
          <Button
            borderRadius="20px"
            w="200px"
            bgColor="#0c0c0c"
            color="#fcfcfc"
            onClick={onClose}
          >
            Got it!
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default ProjectApplicationSuccessModal;
