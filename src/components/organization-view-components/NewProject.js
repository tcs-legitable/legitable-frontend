import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const NewProject = () => {
  return (
    <Flex
      backgroundColor="#fafafa"
      width="100vw"
      height="100vh"
      flexDirection="column"
    >
      <Text>
        Create a project
      </Text>
      
      <Text>
        Project name*
      </Text>

      <Text>
        Project description*
      </Text>

      <Text>
        Project deadline*
      </Text>

      <Text>
        Project budget (CAD)*
      </Text>

      <Text>
        Examples / References*
      </Text>

      <Text>
        Location*
      </Text>

      <Text>
        Project preference*
      </Text>

      <Text>
        Optional note
      </Text>

      <Button>
        Create project
      </Button>
    </Flex>
  );
};

export default NewProject;
