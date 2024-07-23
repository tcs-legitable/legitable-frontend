import { Flex, Image, Text, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedInContext } from '../../App';
import StupaidLogo from '../../assets/landing-page-images/stupaid-logo-small.svg';
import { addStupaidUser } from '../../firebase/helpers';
import PrimaryButtonBlack from '../button-components/PrimaryButtonBlack';

const LandingFinal = ({ data }) => {
  const navigate = useNavigate();
  const { setValue } = useContext(SignedInContext);

  const handleClick = async () => {
    localStorage.setItem('view', 'student');
    const newInfo = {
      uid: data?.uid,
      name: data?.input_name,
      type: 'student',
      photo_url: data?.photo_url,
    };
    setValue(newInfo);
    await addStupaidUser(data);
    navigate('/projects');
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
          Yay, you’ve completed the first step towards becoming more legit!
        </Text>
      </VStack>
      <Flex
        justifyContent="center"
        w="100%"
        flexDir={{ base: 'column', mdLg: 'row' }}
        bg="transparent"
        pt="25px"
      >
        <PrimaryButtonBlack onClick={handleClick} px="30px">
          Let's get stupaid!
        </PrimaryButtonBlack>
      </Flex>
    </Flex>
  );
};

export default LandingFinal;
