import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const NewProject = () => {

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [example, setExample] = useState("");
  const [optionalNote, setOptionalNote] = useState("");

  return (
    <Flex
      backgroundColor="#fafafa"
      width="100vw"
      height="100vh"
      flexDirection="column"
      pl="60px"
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
        >
          <Text
            fontWeight="600"
          >
            Project deadline*
          </Text>
          {/* <Input
            placeholder="*DATE SELECT TEMPLATE*"
            borderRadius="10px"
            value={projectDeadline}
            onChange={(e) => setProjectDeadline(e.target.value)}
            _placeholder={{ color: '#969696' }}
          /> */}
          <Input 
            // placeholder='Select Date' 
            size='md' 
            type='date'
            value={projectDeadline}
            onChange={(e) => setProjectDeadline(e.target.value)} 
            color={projectDeadline ? 'inherit' : '#969696'}
          />
        </Flex>
        <Flex
          flexDirection="column"
        >
          <Text
            fontWeight="600"
          >
            Project budget (CAD)*
          </Text>
          <Input
            placeholder="Provide a budget of the entire project - we will help break it down between deliverables"
            borderRadius="10px"
            value={projectBudget}
            onChange={(e) => setProjectBudget(e.target.value)}
            _placeholder={{ color: '#969696' }}
          />
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

      <Flex>
        <Flex
          flexDirection="column"
        >
          <Text
            fontWeight="600"
          >
            Location*
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
        >
          <Text
            fontWeight="600"
          >
            Project preference*
          </Text>
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
        color="#fafafa"
        bgColor="#0c0c0c"
        fontWeight="300"
        _hover={{
          backgroundPosition: 'left bottom',
        }}
        _active={{
          backgroundPosition: 'left bottom',
        }}
      >
        Create project
      </Button>
    </Flex>
  );
};

export default NewProject;
