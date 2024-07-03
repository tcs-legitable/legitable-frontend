import { Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedInContext } from '../../App';
import StupaidLogo from '../../assets/landing-page-images/stupaid-logo-small.svg';
import { addOrganization } from '../../firebase/helpers';

const OrganizationLandingFinal = ({ data }) => {
  const navigate = useNavigate();
  const { setValue } = useContext(SignedInContext);

  const handleClick = async () => {
    await addOrganization(data);
    localStorage.setItem('view', 'organization');
    const newInfo = {
      uid: data?.uid,
      name: data?.input_name,
      type: 'organization',
      photo_url: data?.photo_url,
    };
    setValue(newInfo);
    navigate('/home');
  };

  return (
    <Flex
      zIndex="0"
      bg="transparent"
      flexDir="column"
      alignItems="center"
      pb="0px"
    >
      <Image
        bg="transparent"
        w={{ base: '200px', mdLg: '150px' }}
        src={StupaidLogo}
      />
      <VStack spacing="0px" fontSize="20px">
        <Text w="380px" align="center" pt="15px">
          You're all set!
        </Text>
        <Text>Let's create your first project!</Text>
      </VStack>
      <Flex
        justifyContent="center"
        w="100%"
        flexDir={{ base: 'column', mdLg: 'row' }}
        bg="transparent"
        pt="25px"
      >
        <Button
          border="1px solid"
          p="23px"
          borderRadius="25px"
          color="#fafafa"
          bgColor="#0c0c0c"
          fontWeight="regular"
          _hover={{
            backgroundPosition: 'left bottom',
          }}
          _active={{
            backgroundPosition: 'left bottom',
          }}
          onClick={handleClick}
        >
          Let's get stupaid
        </Button>
      </Flex>
    </Flex>
  );
};

export default OrganizationLandingFinal;
