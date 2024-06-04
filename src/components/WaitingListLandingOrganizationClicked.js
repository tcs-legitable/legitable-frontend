import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import StupaidLogo from '../assets/images/stupaid-logo.svg';
import ErrorArrow from '../assets/images/error-arrow.svg';
import SuccessArrow from '../assets/images/success-arrow.svg';
import GoBackArrow from '../assets/images/go-back-arrow.svg';
import {
  addOrganizationWaitlistEntry,
  addWaitlistEntry,
} from '../firebase/helpers';
import { v4 as uuidv4 } from 'uuid';

const WaitingListLandingOrganizationClicked = ({ value }) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');

  // 0: not sent
  // 1: successfully sent
  // 2: error when sending
  const [success, setSuccess] = useState(0);
  const isDesktop = useBreakpointValue({ base: false, mdLg: true });

  const [socialLink, setSocialLink] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const id = uuidv4();

  const handleClick = async () => {
    try {
      await addOrganizationWaitlistEntry(
        inputName,
        organizationName,
        inputEmail,
        socialLink,
        country,
        city,
        id,
      );
      setSuccess(1);
    } catch (error) {
      setSuccess(2);
      console.error(error, ' is the error');
    }
  };

  return (
    <Flex
      zIndex="0"
      bg="transparent"
      flexDir="column"
      alignItems="center"
      pb={isDesktop ? '100px' : '70px'}
    >
      {success === 0 && (
        <Button
          fontSize="15px"
          fontWeight="thin"
          pos="absolute"
          left="60px"
          top={{ base: '130px', md: '60px' }}
          bg="transparent"
          borderRadius="25px"
          color="#fafafa"
          outline="1px solid #fafafa"
          onClick={() => {
            window.location.reload();
          }}
          _hover={{
            outline: '2px solid #fafafa',
          }}
          _active={{
            outline: '2px solid #fafafa',
          }}
        >
          <Image src={GoBackArrow} pr="10px" />
          Go back
        </Button>
      )}
      <Image
        bg="transparent"
        w={{ base: '200px', mdLg: '150px' }}
        src={StupaidLogo}
      />
      {success === 0 && (
        <Text
          textAlign="center"
          bg="transparent"
          pt="10px"
          fontSize="20px"
          color="#969696"
        >
          Where{' '}
          <Box color="#fafafa" as="span">
            student creatives
          </Box>{' '}
          become{' '}
          <Box color="#fafafa" as="span">
            legit.
          </Box>{' '}
        </Text>
      )}
      {success === 1 && (
        <Text
          textAlign="center"
          bg="transparent"
          pt="10px"
          fontSize="20px"
          color="#969696"
        >
          <Box as="span">Yay! </Box>
          You've taken the first step to becoming more legit.
        </Text>
      )}
      {success === 2 && (
        <Text
          textAlign="center"
          bg="transparent"
          pt="10px"
          fontSize="20px"
          color="#969696"
        >
          <Box as="span">Oh no :( </Box>
          Something went wrong, please try again.
        </Text>
      )}
      {success === 0 && (
        <Flex w="100%" flexDir="column" bg="transparent" pt="35px">
          <Input
            borderRadius="20px"
            focusBorderColor="#fafafa"
            placeholder="Full name"
            _placeholder={{ color: '#535353' }}
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            mb="10px"
          />
          <Input
            borderRadius="20px"
            focusBorderColor="#fafafa"
            placeholder="Organization Name"
            _placeholder={{ color: '#535353' }}
            type="text"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            mb="10px"
          />
          <Input
            borderRadius="20px"
            focusBorderColor="#fafafa"
            placeholder="Email"
            _placeholder={{ color: '#535353' }}
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            mb="10px"
          />
          <Input
            borderRadius="20px"
            focusBorderColor="#fafafa"
            placeholder="Social Link (e.g. Linkedin)"
            _placeholder={{ color: '#535353' }}
            type="text"
            value={socialLink}
            onChange={(e) => setSocialLink(e.target.value)}
            mb="10px"
          />
          <Flex mb="20px" flexDir="column">
            <Text mb="4px" color="#b3b3b3">
              I am based in...
            </Text>
            <Flex flexDir="row">
              <Input
                placeholder="Country"
                borderRadius="20px"
                value={country}
                _placeholder={{ color: '#969696' }}
                onChange={(e) => setCountry(e.target.value)}
                mb="5px"
              />
              <Box w="13px"></Box>
              <Input
                placeholder="City"
                borderRadius="20px"
                value={city}
                _placeholder={{ color: '#969696' }}
                onChange={(e) => setCity(e.target.value)}
                mb="5px"
              />
            </Flex>
          </Flex>
          <Button
            isDisabled={
              inputName === '' ||
              inputEmail === '' ||
              organizationName === '' ||
              country === '' ||
              city === ''
            }
            borderRadius="20px"
            bg="transparent"
            mt="20px"
            p="20px 30px"
            fontWeight="regular"
            color="#0c0c0c"
            backgroundColor="#fafafa"
            _hover={{
              backgroundColor: '#b3b3b3',
            }}
            _active={{
              backgroundColor: '#b3b3b3',
            }}
            onClick={handleClick}
          >
            Submit your application
          </Button>
          {/* <Button
            isDisabled={inputName === "" || inputEmail === ""}
            w="50%"
            alignSelf="center"
            border="1px solid"
            p="23px"
            borderRadius="25px"
            color="#fafafa"
            bg="transparent"
            bgGradient="linear(to-r, #4b4b4b 20%, #0C0C0C 80%)"
            backgroundSize="200% 100%"
            backgroundPosition="right bottom"
            transition="background-position 0.5s ease"
            fontWeight="thin"
            _hover={{
              backgroundPosition: "left bottom",
            }}
            _active={{
              backgroundPosition: "left bottom",
            }}
            mt="40px"
            onClick={handleClick}
          >
            Join the waitlist
          </Button> */}
        </Flex>
      )}
      {success === 1 && (
        <Button
          w="fit-content"
          alignSelf="center"
          border="1px solid"
          p="23px"
          borderRadius="25px"
          color="#fafafa"
          bg="transparent"
          bgGradient="linear(to-r, #4b4b4b 20%, #0C0C0C 80%)"
          backgroundSize="200% 100%"
          backgroundPosition="right bottom"
          transition="background-position 0.5s ease"
          fontWeight="thin"
          _hover={{
            backgroundPosition: 'left bottom',
          }}
          _active={{
            backgroundPosition: 'left bottom',
          }}
          mt="40px"
          onClick={() => {
            window.open('https://www.thecreativesolution.ca/', '_blank');
          }}
        >
          Check out our other work
          <Image on bg="transparent" ml="5px" src={SuccessArrow} />
        </Button>
      )}
      {success === 2 && (
        <Button
          isDisabled={inputName === '' || inputEmail === ''}
          w="fit-content"
          alignSelf="center"
          border="1px solid"
          p="23px"
          borderRadius="25px"
          color="#fafafa"
          bg="transparent"
          bgGradient="linear(to-r, #4b4b4b 20%, #0C0C0C 80%)"
          backgroundSize="200% 100%"
          backgroundPosition="right bottom"
          transition="background-position 0.5s ease"
          fontWeight="thin"
          _hover={{
            backgroundPosition: 'left bottom',
          }}
          _active={{
            backgroundPosition: 'left bottom',
          }}
          mt="40px"
          onClick={() => {
            window.location.reload();
          }}
        >
          Back to homepage
          <Image on bg="transparent" ml="5px" src={ErrorArrow} />
        </Button>
      )}
    </Flex>
  );
};

export default WaitingListLandingOrganizationClicked;
