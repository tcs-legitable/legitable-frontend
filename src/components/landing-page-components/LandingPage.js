import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import LandingPageFunFooter from '../../assets/images/landing-page-fun-footer.svg';
import StupaidLogo from '../../assets/landing-page-images/stupaid-logo-main.svg';
import TalentButtonIcon from '../../assets/images/talent-button.svg';
import StudentButtonIcon from '../../assets/images/student-icon.svg';
import { useNavigate } from 'react-router-dom';
import PrimaryButtonBlack from '../button-components/PrimaryButtonBlack';
import { SignedInContext } from '../../App';

const LandingPage = ({ goNext }) => {
  const navigate = useNavigate();
  const { value } = useContext(SignedInContext);

  return (
    <Flex
      zIndex="0"
      bg="transparent"
      flexDir="column"
      alignItems="center"
      pb="0px"
    >
      <Text pb="10px" fontWeight="bold" fontSize="20px">
        Welcome to ...
      </Text>
      <Image
        bg="transparent"
        w={{ base: '300px', mdLg: '250px' }}
        src={StupaidLogo}
      />
      <Text
        fontSize="20px"
        color="#5E5E5E"
        textAlign="center"
        w={{ base: '330px', mdLg: '420px' }}
        pt="15px"
      >
        A platform for connecting passionate business owners to eager creative
        students to work on cool projects.
      </Text>
      <Flex
        w="100%"
        flexDir={{ base: 'column', mdLg: 'row' }}
        bg="transparent"
        pt="25px"
        pb={{ base: '30px', mdLg: '60px' }}
        justify="center"
      >
        <PrimaryButtonBlack
          px="30px"
          mr={{ base: '0px', mdLg: '10px' }}
          onClick={() => navigate('/home')}
        >
          <Image bgColor="inherit" mr="5px" src={TalentButtonIcon} />
          I'm looking for talent
        </PrimaryButtonBlack>
        <PrimaryButtonBlack
          px="30px"
          onClick={() => {
            if (Object.keys(value).length === 0) {
              goNext();
            } else {
              navigate('/home');
            }
          }}
          ml={{ base: '0px', mdLg: '10px' }}
          mt={{ base: '10px', mdLg: '0px' }}
        >
          <Image bgColor="inherit" mr="5px" src={StudentButtonIcon} />
          I'm a student
        </PrimaryButtonBlack>
      </Flex>
      <Image
        w="100%"
        position="absolute"
        bottom={{ base: '0', lg: '-7' }}
        src={LandingPageFunFooter}
      />
    </Flex>
  );
};

export default LandingPage;
