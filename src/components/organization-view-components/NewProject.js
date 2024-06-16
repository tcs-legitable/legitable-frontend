import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Select, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { skillOptions } from '../skillOptions';
import Navbar from '../global-components/Navbar';
import { addProject } from '../../firebase/helpers';

const NewProject = () => {

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [example, setExample] = useState("");
  const [skill, setSkill] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPreference, setSelectedPreference] = useState("");
  const [optionalNote, setOptionalNote] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  
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
  }, [projectName, projectDescription, projectDeadline, projectBudget, example, skill, selectedCity, selectedPreference]);

  const handleCreateProject = async () => {
    if (!isFormValid) return;
    
    const projectData = {
      name: projectName,
      description: projectDescription,
      deadline: projectDeadline,
      budget: projectBudget,
      example: example,
      skill: skill,
      city: selectedCity,
      preference: selectedPreference,
      optionalNote: optionalNote,
      createdAt: new Date().toISOString()
    };
    
    try {
      await addProject(projectData);
      console.log("Project data:", projectData);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const cities = [
    { id: 1, name: "Vancouver" },
    { id: 2, name: "Toronto" }
  ];

  const preferences = [
    { id: 1, name: "In-person"},
    { id: 2, name: "Remote" }
  ];

  //   const handleCreateProject = () => {
  //     console.log("Project Name:", projectName);
  //     console.log("Project Description:", projectDescription);
  //     console.log("Project Deadline:", projectDeadline);
  //     console.log("Project Budget:", projectBudget);
  //     console.log("Example:", example);
  //     console.log("Skill:", skill);
  //     console.log("Selected City:", selectedCity);
  //     console.log("Selected Preference:", selectedPreference);
  //     console.log("Optional Note:", optionalNote);
  //   };

  return (
    <Flex
      flexDirection="column"
      backgroundColor="white"
    >
      <Navbar/>
      <Flex
        backgroundColor="#fafafa"
        width="100vw"
        height="100vh"
        flexDirection="column"
        pl="60px"
        pr="60px"
      >
        <Text
          mt="30px"
          fontSize="24px"
        >
        Create a project
        </Text>
      
        <Text
          fontWeight="600"
        >
        Project name*
        </Text>
        <Input
          placeholder="e.g. Store banner design"
          borderRadius="10px"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          _placeholder={{ color: '#969696' }}
        />

        <Text
          fontWeight="600"
        >
        Project description*
        </Text>
        <Input
          placeholder="Please provide 1-3 lines explaining the project"
          borderRadius="10px"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          _placeholder={{ color: '#969696' }}
        />

        <Flex>
          <Flex
            flexDirection="column"
            w="50%"
            mr="20px"
          >
            <Text
              fontWeight="600"
            >
            Project deadline*
            </Text>
            <Input 
              size='md' 
              type='date'
              value={projectDeadline}
              onChange={(e) => setProjectDeadline(e.target.value)} 
              color={projectDeadline ? 'inherit' : '#969696'}
            />
          </Flex>

          <Flex
            flexDirection="column"
            w="50%"
            ml="20px"
          >
            <Text
              fontWeight="600"
            >
            Project budget (CAD)*
            </Text>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                fontSize="1.2em"
              >
              $
              </InputLeftElement>
              <Input
                placeholder="Provide a budget of the entire project - we will help break it down between deliverables"
                borderRadius="10px"
                type="number"
                value={projectBudget}
                onChange={(e) => setProjectBudget(e.target.value)}
                _placeholder={{ color: '#969696' }}
              />
            </InputGroup>
          </Flex>
        </Flex>

        <Text
          fontWeight="600"
        >
        Examples / References*
        </Text>
        <Input
          placeholder="Provide links of similar work or desired outcome of project"
          borderRadius="10px"
          value={example}
          onChange={(e) => setExample(e.target.value)}
          _placeholder={{ color: '#969696' }}
        />

        <Text
          fontWeight="600"
        >
        Skills*
        </Text>
        <Select
          placeholder="Select relevant skills (max 5)"
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

        <Flex>
          <Flex
            flexDirection="column"
            w="50%"
            mr="20px"
          >
            <Text
              fontWeight="600"
            >
            Location*
            </Text>

            <Flex
              flexDirection="row"
            >
              {cities.map((city) => (
                <Box
                  key={city.id}
                  display="flex"
                  flexDir="row"
                  m="4px"
                  p="4px 10px"
                  _hover={{
                    cursor: 'pointer',
                  }}
                  borderRadius="10px"
                  color={selectedCity === city.name ? 'black' : '#555'}
                  bgColor={selectedCity === city.name ? '#d7d7d7' : 'transparent'}
                  border={selectedCity === city.name ? "1px solid black" : "1px solid #969696" }
                  onClick={() => setSelectedCity(city.name)}
                  fontSize="15px"
                >
                  {city.name}
                </Box>
              ))}
            </Flex>
          </Flex>
        
          <Flex
            flexDirection="column"
          >
            <Text
              fontWeight="600"
            >
            Project preference*
            </Text>

            <Flex
              flexDirection="row"
            >
              {preferences.map((preference) => (
                <Box
                  key={preference.id}
                  display="flex"
                  flexDir="row"
                  m="4px"
                  p="4px 10px"
                  _hover={{
                    cursor: 'pointer',
                  }}
                  borderRadius="10px"
                  color={selectedPreference === preference.name ? 'black' : '#555'}
                  bgColor={selectedPreference === preference.name ? '#d7d7d7' : 'transparent'}
                  border={selectedPreference === preference.name ? "1px solid black" : "1px solid #969696" }
                  onClick={() => setSelectedPreference(preference.name)}
                  fontSize="15px"
                >
                  {preference.name}
                </Box>
              ))}
            </Flex>
          </Flex>
        </Flex>

        <Text
          fontWeight="600"
        >
        Optional note
        </Text>
        <Input
          placeholder="Any additional information you wish for the creator to know?"
          borderRadius="10px"
          value={optionalNote}
          onChange={(e) => setOptionalNote(e.target.value)}
          _placeholder={{ color: '#969696' }}
        />

        <Button
          width="100%"
          border="1px solid"
          p="4px 10px"
          mt="30px"
          borderRadius="25px"
          color={isFormValid ? "#fafafa" : "#969696"}
          bgColor={isFormValid ? "#0c0c0c" : "#e0e0e0"}
          fontWeight="300"
          _hover={{
            backgroundPosition: 'left bottom',
          }}
          _active={{
            backgroundPosition: 'left bottom',
          }}
          onClick={handleCreateProject}
          disabled={!isFormValid}
          _disabled={{
            cursor: "not-allowed",
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
