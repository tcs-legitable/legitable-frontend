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
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import EditIcon from '../../assets/images/edit-icon.svg';
import TemplateSkillImage from '../../assets/images/template-image.svg';
import ChevronDownIcon from '../../assets/images/chevron-down.svg';
import { skillOptions } from '../skillOptions';
import { uploadImage } from '../../firebase/helpers';
import { SignedInContext } from '../../App';
import ReplaceIcon from '../../assets/images/replace-icon.svg';

const SkillCard = ({ skill, canEdit }) => {
  const { value } = useContext(SignedInContext);
  const { skillName, image, link, description } = skill;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newLink, setNewLink] = useState(link || '');
  const [newDescription, setNewDescription] = useState(description || '');
  const [newSkillName, setNewSkillName] = useState(skillName || '');
  const [newImage, setNewImage] = useState(image || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleClose = () => {
    setNewLink(link || '');
    setNewDescription(description || '');
    setNewSkillName(skillName || '');
    setNewImage(image || '');
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
    const updatedSkillData = {
      image: newImage,
      link: newLink,
      description: newDescription,
      skillName: newSkillName,
    };

    console.log(updatedSkillData, ' HERE');
    // create this function
    // await updatedSkillData(userId, updatedSkillData);
  };

  return (
    <Flex
      //   maxW="500px"
      border="#efefef solid 2px"
      borderRadius="10px"
      p="20px"
      flexDir="column"
      w="100%"
      h="400px"
      bgColor="white"
    >
      <Text fontSize="20px" fontWeight="bold">
        {skillName}
      </Text>
      <Image py="23px" src={link ? link : TemplateSkillImage} />
      {canEdit && (
        <Button
          border="#545454 solid 1.5px"
          bg="transparent"
          borderRadius="20px"
          mt="auto"
          onClick={onOpen}
        >
          <Image mr="7px" src={EditIcon} />
          Edit Skill
        </Button>
      )}
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
                  >
                    {newSkillName}
                    <Image ml="auto" mr="10px" src={ChevronDownIcon} />
                  </Flex>
                </MenuButton>
                <MenuList>
                  {skillOptions.map((skill) => (
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
                color="#cc0000"
                border="#cc0000 1.5px solid"
                w="100%"
                fontWeight="regular"
              >
                Delete skill
              </Button>
              <Button
                isDisabled={
                  newSkillName === '' ||
                  newDescription === '' ||
                  newImage === ''
                }
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

export default SkillCard;
