import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
} from "@chakra-ui/react";
import { SignedInContext } from "../App";
import { addEndorsee } from "../firebase/helpers";
import { v4 } from "uuid";

const AddEndorseeModal = () => {
  const { value } = useContext(SignedInContext);
  const toast = useToast();

  const allSkills = ["Software Developer", "Designer", "PM", "Photographer/Videographer"];

  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skill, setSkill] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const onOpen = () => setIsOpen(true);

  const onClose = () => {
    setIsOpen(false);
    setName("");
    setEmail("");
    setSkill("");
    setSuggestions([]);
  };

  const updateSkill = (skill) => {
      setSkill(skill);
      setSuggestions([]);
  }

  const onSkillChange = (e) => {
      const value = e.target.value;
      setSkill(value);

      if(!value) {
          setSuggestions([]);
      } else {
          const filteredSkills = allSkills.filter((skill) => 
            skill.toLowerCase().includes(value.toLowerCase())
          );
          setSuggestions(filteredSkills);
      }
  }

  const handleMenuItemClick = (skill) => setSkill(skill);

  const saveEndorsee = async () => {
    if (!buttonClicked) {
      setButtonClicked(true);
      const uniqueId = v4();
      let data = {
        id: uniqueId,
        name: name,
        email: email,
        skill: skill,
      };

      await addEndorsee(value, data);

      setName("");
      setEmail("");
      setSkill("");
      onClose();
      toast({
        description: "Endorsee Saved!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setButtonClicked(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Add an endorsee</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Who would you like to endorse?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box className="modal-content">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <Input
                value={skill}
                onChange={onSkillChange}
                placeholder="Skill"
              />
              {suggestions.length> 0 && (
                  <VStack align="stretch">
                      {suggestions.map((suggestion) => (
                        <Button
                        key={suggestion}
                        variant="ghost"
                        justifyContent="start"
                        onClick={() => updateSkill(suggestion)}
                        >
                        {suggestion}
                        </Button>
                    ))}
                  </VStack>
              )}
              {/* <Menu>
                <MenuButton as={Button}>{skill || "Select Skill"}</MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => handleMenuItemClick("Software Developer")}
                  >
                    Software Developer
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("Designer")}>
                    Designer
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("PM")}>
                    PM
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleMenuItemClick("Photographer/Videographer")
                    }
                  >
                    Photographer/Videographer
                  </MenuItem>
                </MenuList>
              </Menu> */}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={!name || !email || !skill || buttonClicked}
              onClick={saveEndorsee}
              colorScheme="blue"
            >
              Add endorsee
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEndorseeModal;
