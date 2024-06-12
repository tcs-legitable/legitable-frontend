import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import StupaidLogo from '../assets/images/stupaid-logo.svg';
import ErrorArrow from '../assets/images/error-arrow.svg';
import SuccessArrow from '../assets/images/success-arrow.svg';
import GoBackArrow from '../assets/images/go-back-arrow.svg';
import { addStudentWaitlistEntry } from '../firebase/helpers';
import { v4 as uuidv4 } from 'uuid';
import CheckMark from '../assets/images/check-mark-white.svg';

const WaitingListLandingStudentClicked = () => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');

  // 0: info page
  // 1: skills page
  // 2: successfully sent
  // 3: error when sending
  const [success, setSuccess] = useState(0);
  const isDesktop = useBreakpointValue({ base: false, mdLg: true });

  const [school, setSchool] = useState('');
  const [year, setYear] = useState('');

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const [projectPref, setProjectPref] = useState(0);

  const projectPrefButtons = [
    { id: 0, text: 'In-person', value: 'in-person' },
    { id: 1, text: 'Remote', value: 'remote' },
    { id: 2, text: 'Hybrid', value: 'Hybrid' },
  ];

  const id = uuidv4();

  const [skills, setSkills] = useState([]);

  const skillList = [
    { id: 0, text: 'Branding', value: 'branding' },
    { id: 1, text: 'Graphic Design', value: 'graphic-design' },
    { id: 2, text: 'Digital Art', value: 'digital-art' },
    { id: 3, text: 'Traditional Art', value: 'traditional-art' },
    { id: 4, text: 'Slidedeck Design', value: 'slidedeck-design' },
    { id: 5, text: 'Website Design', value: 'website-design' },
    { id: 6, text: 'Website Development', value: 'website-development' },
    { id: 7, text: 'UI/UX Design', value: 'ui-ux-design' },
    { id: 8, text: 'Social Media Content', value: 'social-media-content' },
    { id: 9, text: 'Photography', value: 'photography' },
    { id: 10, text: 'Videography', value: 'videography' },
    { id: 11, text: 'Animation', value: 'animation' },
    { id: 12, text: '3D Modeling', value: '3d-modeling' },
    { id: 13, text: 'Music Production', value: 'music-production' },
  ];

  // this sets the student info
  const handleClick = async () => {
    const skillNames = skills.map((skill) => {
      return skillList[skill].value;
    });

    try {
      await addStudentWaitlistEntry(
        inputName,
        inputEmail,
        id,
        school,
        year,
        country,
        city,
        projectPrefButtons[projectPref].value,
        skillNames,
      );
      setSuccess(2);
    } catch (error) {
      setSuccess(3);
      console.error(error, ' is the error');
    }
  };

  return (
    <Flex
      zIndex="0"
      bg="transparent"
      flexDir="column"
      alignItems="center"
      // minH={success ="100vh"}
      pb={isDesktop ? '100px' : '0px'}
    >
      {success < 2 && (
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
            if (success === 0) {
              window.location.reload();
            } else {
              setSuccess(0);
            }
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
          w="280px"
        >
          Sign up to get first access to the paid gigs on our platform!
        </Text>
      )}
      {success === 1 && (
        <>
          <VStack spacing="0px" fontSize="20px">
            <Text pt="15px">Select up to 3 skills</Text>
          </VStack>
          <Flex
            align="center"
            justifyContent="center"
            w="100%"
            // minW="800px"
            flexDir="column"
            bg="transparent"
            pt="35px"
          >
            <Flex
              w={{ base: '450px', md: '800px' }}
              flexWrap="wrap"
              align="center"
              justify="center"
              pb="30px"
            >
              {skillList.map(({ id, text, value }) => {
                return (
                  <Box
                    display="flex"
                    flexDir="row"
                    m="4px"
                    key={id}
                    border="1px solid #fafafa"
                    p="8px 30px"
                    _hover={{
                      cursor: 'pointer',
                    }}
                    borderRadius="25px"
                    color="#fafafa"
                    bg="transparent"
                    onClick={() => {
                      const newSkills = [...skills];
                      if (!skills.includes(id)) {
                        while (newSkills.length >= 3) {
                          newSkills.shift();
                        }
                        newSkills.push(id);
                        setSkills(newSkills);
                      } else if (skills.includes(id)) {
                        const filteredList = newSkills.filter(
                          (skill) => skill !== id,
                        );
                        setSkills(filteredList);
                      }
                    }}
                    bgColor={skills.includes(id) && '#303030'}
                  >
                    {skills.includes(id) && <Image pr="10px" src={CheckMark} />}
                    {text}
                  </Box>
                );
              })}
            </Flex>
          </Flex>
          <Button
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
        </>
      )}
      {success === 2 && (
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
      {success === 3 && (
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
            placeholder="Email"
            _placeholder={{ color: '#535353' }}
            type="Email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            mb="10px"
          />
          <Input
            borderRadius="20px"
            focusBorderColor="#fafafa"
            placeholder="Name of School / Institution"
            _placeholder={{ color: '#535353' }}
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            mb="10px"
          />
          <Input
            borderRadius="20px"
            focusBorderColor="#fafafa"
            placeholder="Year Level"
            _placeholder={{ color: '#535353' }}
            type="Email"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            mb="20px"
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
          <Flex flexDir="column" color="#b3b3b3">
            <Text mb="4px">Project preference</Text>
            <Flex
              flexDir="row"
              pb="30px"
              alignSelf="center"
              justifyContent="space-between"
              w="100%"
            >
              {projectPrefButtons.map(({ id, text, value }) => {
                return (
                  <Box
                    key={id}
                    border="1px solid #fafafa"
                    p="8px 40px"
                    _hover={{
                      cursor: 'pointer',
                    }}
                    borderRadius="25px"
                    color="#fafafa"
                    bg="transparent"
                    onClick={() => setProjectPref(id)}
                    bgColor={id === projectPref && '#303030'}
                  >
                    {text}
                  </Box>
                );
              })}
            </Flex>
          </Flex>
          <Button
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
            isDisabled={
              inputName === '' ||
              inputEmail === '' ||
              school === '' ||
              year === '' ||
              country === '' ||
              city === ''
            }
            w="50%"
            alignSelf="center"
            border="1px solid"
            backgroundSize="200% 100%"
            backgroundPosition="right bottom"
            transition="background-position 0.5s ease"
            onClick={() => {
              setSkills([]);
              setSuccess(1);
            }}
          >
            Continue
          </Button>
        </Flex>
      )}
      {success === 2 && (
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
      {success === 3 && (
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

export default WaitingListLandingStudentClicked;
