import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { SignedInContext } from '../../App';

const ProjectCardApplyModalApplication = () => {
  const { value } = useContext(SignedInContext);
  const [formValue, setFormValue] = useState('');

  const { name, photo_url } = value;

  return (
    <Flex h="590px" p="30px" color="white" w="400px" flexDir="column">
      <HStack>
        <Image mr="5px" borderRadius="50%" w="65px" src={photo_url} />
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
      <Button
        mt="auto"
        // position="relative"
        border="1px solid #0c0c0c"
        py="20px"
        px="30px"
        borderRadius="25px"
        color="black"
        bgColor="#fafafa"
        fontWeight="regular"
        _hover={{
          bgColor: '#d2d2d2',
        }}
        _active={{
          bgColor: '#d2d2d2',
        }}
      >
        Apply now!
      </Button>
    </Flex>
  );
};

export default ProjectCardApplyModalApplication;
