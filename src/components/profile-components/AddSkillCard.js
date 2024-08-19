import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import AddSkillIcon from '../../assets/images/add-skill-icon.svg';
import TemplateSkillImage from '../../assets/images/template-image.svg';
import ChevronDownIcon from '../../assets/images/chevron-down.svg';
import { skillOptions } from '../skillOptions';
import {
  addSkill,
  getExistingSkillNames,
  uploadImage,
} from '../../firebase/helpers';
import { SignedInContext } from '../../App';
import ReplaceIcon from '../../assets/images/replace-icon.svg';

const AddSkillCard = ({ addSkillInState }) => {
  const { value } = useContext(SignedInContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newLink, setNewLink] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newSkillName, setNewSkillName] = useState('');
  const [newImage, setNewImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [availableSkills, setAvailableSkills] = useState(skillOptions);

  useEffect(() => {
    const fetchExistingSkills = async () => {
      const existingSkills = await getExistingSkillNames(value?.uid);
      const filteredSkills = skillOptions.filter(
        (skill) => !existingSkills.includes(skill.text),
      );
      setAvailableSkills(filteredSkills);
    };

    if (isOpen) {
      fetchExistingSkills();
    }
  }, [isOpen, value?.uid]);

  const handleClose = () => {
    setNewLink('');
    setNewDescription('');
    setNewSkillName('');
    setNewImage('');
    onClose();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const { url, path } = await uploadImage(
          file,
          value?.uid,
          `${value?.uid}/images/${file.name}`,
        );
        setNewImage(url);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSave = async () => {
    const newSkillData = {
      image: newImage,
      link: newLink,
      description: newDescription,
      skillName: newSkillName,
    };

    // create this function
    await addSkill(value?.uid, newSkillData);
    addSkillInState(newSkillData);
    handleClose();
  };

  return (
    <Flex
      maxW="600px"
      border="#efefef solid 2px"
      borderRadius="10px"
      p="20px"
      flexDir="column"
      w="100%"
      h="440px"
      bgColor="white"
      align="center"
      justifyContent="center"
    >
      <Button
        bg="transparent"
        border="#555555 1.5px solid"
        borderRadius="20px"
        w="200px"
        onClick={onOpen}
        fontSize="18px"
        fontWeight="regular"
      >
        <Image mr="8px" w="13px" src={AddSkillIcon} />
        Add a skill
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent h="fit-content" maxW="800px" p="20px">
          <ModalBody>
            <Box
              borderRadius="20px"
              my="20px"
              w="100%"
              h="200px"
              alignContent="center"
              backgroundImage={
                newImage ? `url(${newImage})` : TemplateSkillImage
              }
              backgroundColor="#dbdbdb"
              backgroundSize="cover"
              backgroundPosition="center"
              position="relative"
              align="center"
            >
              {isUploading && (
                <Spinner
                  size="xl"
                  thickness="4px"
                  color="blue.500"
                  position="absolute"
                  top="65%"
                  left="45%"
                />
              )}
              {!newImage && (
                <Button
                  fontWeight="regular"
                  border="#555555 1.5px solid"
                  borderRadius="20px"
                  bgColor="#fafafa"
                >
                  <Image mr="10px" src={ReplaceIcon} />
                  Add skill cover image
                </Button>
              )}
              <Input
                type="file"
                accept="image/*"
                opacity="0"
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                cursor="pointer"
                onChange={handleImageUpload}
              />
            </Box>
            <VStack alignItems="baseline" fontWeight="bold">
              <Text>Skill</Text>
              <Menu>
                <MenuButton w="100%">
                  <Flex
                    p="10px"
                    borderRadius="8px"
                    border="#555555 1.5px solid"
                    minH="36px"
                  >
                    {newSkillName}
                    <Image ml="auto" mr="10px" src={ChevronDownIcon} />
                  </Flex>
                </MenuButton>
                <MenuList maxH="200px" overflowY="auto">
                  {availableSkills.map((skill) => (
                    <MenuItem
                      key={skill.id}
                      onClick={() => setNewSkillName(skill.text)}
                    >
                      {skill.text}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </VStack>
            <VStack my="20px" alignItems="baseline" fontWeight="bold">
              <Text>Description</Text>
              <Textarea
                placeholder="Please provide a short description of this skill and your experience"
                value={newDescription}
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
              />
            </VStack>
            <VStack my="20px" alignItems="baseline" fontWeight="bold">
              <Text>Link to relevant work example</Text>
              <Input
                placeholder="ex: https://example.com"
                value={newLink}
                onChange={(e) => {
                  setNewLink(e.target.value);
                }}
              />
            </VStack>
            <Flex
              mt="25px"
              gap="10px"
              flexDir={{ base: 'column', smMd: 'row' }}
            >
              <Button
                borderRadius="20px"
                bg="transparent"
                color="#0c0c0c"
                border="#0c0c0c 1.5px solid"
                w="100%"
                fontWeight="regular"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                isDisabled={newSkillName === '' || isUploading}
                _hover={{
                  bgColor: '#383838',
                }}
                _active={{
                  bgColor: '#383838',
                }}
                borderRadius="20px"
                bgColor="#0d0d0d"
                color="#fafafa"
                border="#0d0d0d 1.5px solid"
                w="100%"
                fontWeight="regular"
                onClick={handleSave}
              >
                Save changes
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AddSkillCard;
