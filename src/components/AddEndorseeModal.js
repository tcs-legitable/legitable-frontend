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
  VStack,
} from "@chakra-ui/react";
import { SignedInContext } from "../App";
import { addEndorsee } from "../firebase/helpers";
import { v4 } from "uuid";
import useSkills from '../hooks/useSkills';

const AddEndorseeModal = () => {
  const { value } = useContext(SignedInContext);
  const toast = useToast();

  const skills = useSkills();

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
          const filteredSkills = skills.filter((skill) => 
            skill.toLowerCase().includes(value.toLowerCase())
          );
          setSuggestions(filteredSkills);
      }
  }

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
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={!name || !email || !skill || buttonClicked}
              onClick={saveEndorsee}
              colorScheme="blue"
            >
              Add to your trusted circle
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEndorseeModal;
