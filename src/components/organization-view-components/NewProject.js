import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { skillOptions } from '../skillOptions';
import Navbar from '../global-components/Navbar';
import { addProject } from '../../firebase/helpers';
import { SignedInContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const NewProject = () => {
  const { value } = useContext(SignedInContext);

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDeadline, setProjectDeadline] = useState('');
  const [projectBudget, setProjectBudget] = useState('');
  const [example, setExample] = useState('');
  const [skill, setSkill] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPreference, setSelectedPreference] = useState('');
  const [optionalNote, setOptionalNote] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isValid =
      projectName &&
      projectDescription &&
      projectDeadline &&
      projectBudget &&
      example &&
      skill &&
      selectedCity &&
      selectedPreference;
    setIsFormValid(isValid);
  }, [
    projectName,
    projectDescription,
    projectDeadline,
    projectBudget,
    example,
    skill,
    selectedCity,
    selectedPreference,
  ]);

  const handleCreateProject = async () => {
    if (!isFormValid) return;

    const projectData = {
      name: projectName,
      ownerUid: value?.uid,
      description: projectDescription,
      deadline: projectDeadline,
      budget: projectBudget,
      example: example,
      skill: skill,
      city: selectedCity,
      preference: selectedPreference,
      optionalNote: optionalNote,
      createdAt: new Date().toISOString(),
    };

    try {
      await addProject(value?.uid, projectData);
      navigate('/organization/' + value?.uid);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const cities = [
    { id: 1, name: 'Vancouver' },
    { id: 2, name: 'Toronto' },
  ];

  const preferences = [
    { id: 1, name: 'In-person' },
    { id: 2, name: 'Remote' },
  ];

  return (
    <Flex flexDirection="column">
      <Navbar />
      <Flex
        gap="10px"
        backgroundColor="#fafafa"
        width={{ base: '500px', smMd: '700px', mdLg: '900px' }}
        minHeight="100vh"
        height="fit-content"
        flexDirection="column"
        pl="60px"
        pr="60px"
      >
        <Text mt="30px" fontSize="24px">
          Create a project
        </Text>

        <Text mt="20px" fontWeight="600">
          Project name*
        </Text>
        <Input
          mt="7px"
          placeholder="e.g. Store banner design"
          borderRadius="10px"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          _placeholder={{ color: '#969696' }}
        />

        <Text mt="20px" fontWeight="600">
          Project description*
        </Text>
        <Input
          mt="7px"
          placeholder="Please provide 1-3 lines explaining the project"
          borderRadius="10px"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          _placeholder={{ color: '#969696' }}
        />

        <Flex mt="20px">
          <Flex flexDirection="column" w="50%" mr="20px">
            <Text fontWeight="600">Project deadline*</Text>
            <Input
              mt="7px"
              type="date"
              value={projectDeadline}
              onChange={(e) => setProjectDeadline(e.target.value)}
              color={projectDeadline ? 'inherit' : '#969696'}
            />
          </Flex>

          <Flex flexDirection="column" w="50%" ml="20px">
            <Text fontWeight="600">Project budget (CAD)*</Text>
            <Textarea
              mt="7px"
              resize="none"
              placeholder="Provide a budget of the entire project - we will help break it down between deliverables"
              borderRadius="10px"
              type="number"
              value={projectBudget}
              onChange={(e) => setProjectBudget(e.target.value)}
              _placeholder={{ color: '#969696' }}
            />
          </Flex>
        </Flex>

        <Text mt="20px" fontWeight="600">
          Examples / References*
        </Text>
        <Input
          mt="7px"
          placeholder="Provide links of similar work or desired outcome of project"
          borderRadius="10px"
          value={example}
          onChange={(e) => setExample(e.target.value)}
          _placeholder={{ color: '#969696' }}
        />

        <Text mt="20px" fontWeight="600">
          Skills*
        </Text>
        <Select
          placeholder="Select relevant skills"
          borderRadius="10px"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          color={skill ? '#000' : '#969696'}
          mb="10px"
          mt="10px"
          width="100%"
        >
          {skillOptions.map(({ id, text, value }) => (
            <option key={id} value={value}>
              {text}
            </option>
          ))}
        </Select>

        <Flex
          mt="20px"
          flexDirection={{ base: 'column', mdLg: 'row' }}
          w="100%"
          gap={{ base: '25px', mdLg: '0px' }}
        >
          <Flex flex="1" flexDirection="column" mr="20px">
            <Text fontWeight="600">Location*</Text>

            <Flex mt="7px" flexDirection="row">
              {cities.map((city) => (
                <Box
                  key={city.id}
                  display="flex"
                  flexDir="row"
                  m="4px"
                  p="10px 45px"
                  _hover={{
                    cursor: 'pointer',
                  }}
                  borderRadius="10px"
                  color={selectedCity === city.name ? 'black' : '#555'}
                  bgColor={
                    selectedCity === city.name ? '#d7d7d7' : 'transparent'
                  }
                  border={
                    selectedCity === city.name
                      ? '1px solid black'
                      : '1px solid #969696'
                  }
                  onClick={() => setSelectedCity(city.name)}
                  fontSize="15px"
                >
                  {city.name}
                </Box>
              ))}
            </Flex>
          </Flex>

          <Flex flex="1" flexDirection="column">
            <Text fontWeight="600">Project preference*</Text>

            <Flex mt="7px" flexDirection="row">
              {preferences.map((preference) => (
                <Box
                  key={preference.id}
                  display="flex"
                  flexDir="row"
                  m="4px"
                  p="10px 45px"
                  _hover={{
                    cursor: 'pointer',
                  }}
                  borderRadius="10px"
                  color={
                    selectedPreference === preference.name ? 'black' : '#555'
                  }
                  bgColor={
                    selectedPreference === preference.name
                      ? '#d7d7d7'
                      : 'transparent'
                  }
                  border={
                    selectedPreference === preference.name
                      ? '1px solid black'
                      : '1px solid #969696'
                  }
                  onClick={() => setSelectedPreference(preference.name)}
                  fontSize="15px"
                >
                  {preference.name}
                </Box>
              ))}
            </Flex>
          </Flex>
        </Flex>

        <Text mt="20px" fontWeight="600">
          Optional note
        </Text>
        <Textarea
          mt="7px"
          placeholder="Any additional information you wish for the creator to know?"
          borderRadius="10px"
          value={optionalNote}
          onChange={(e) => setOptionalNote(e.target.value)}
          _placeholder={{ color: '#969696' }}
        />

        <Button
          mb="30px"
          alignSelf="center"
          width="100%"
          border="1.5px solid"
          p="4px 10px"
          mt="30px"
          borderRadius="7px"
          color={isFormValid ? '#fafafa' : '#969696'}
          fontWeight="300"
          _hover={isFormValid ? { bgColor: '#333333' } : { bgColor: '#e0e0e0' }}
          _active={
            isFormValid ? { bgColor: '#333333' } : { bgColor: '#e0e0e0' }
          }
          bgColor={isFormValid ? '#0c0c0c' : '#e0e0e0'}
          onClick={handleCreateProject}
          disabled={!isFormValid}
          _disabled={{
            cursor: 'not-allowed',
            opacity: 0.6,
          }}
        >
          Create project
        </Button>
      </Flex>
    </Flex>
  );
};

export default NewProject;
