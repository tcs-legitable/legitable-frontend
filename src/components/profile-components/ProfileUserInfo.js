import {
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Input,
  Box,
  Link,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import StupaidVerified from '../global-components/StupaidVerified';
import LocationIcon from '../../assets/images/location-icon.svg';
import ProjectPrefIcon from '../../assets/images/project-pref-icon.svg';
import SchoolIcon from '../../assets/images/school-icon.svg';
import EditIcon from '../../assets/images/edit-icon.svg';
import PersonalSiteIcon from '../../assets/images/website-icon.svg';
import DefaultProfile from '../../assets/images/default-pfp.svg';
import ReplaceIcon from '../../assets/images/replace-icon.svg';
import BackArrow from '../../assets/images/back-arrow-black.svg';
import { updateStupaidUser } from '../../firebase/helpers';
import { SignedInContext } from '../../App';

const ProfileUserInfo = ({ userId, userData, canEdit }) => {
  const { setValue, value } = useContext(SignedInContext);

  const {
    input_name,
    city,
    country,
    isVerified,
    photo_url,
    school,
    projectPref,
    personal_site,
    year,
  } = userData;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const projectPrefButtons = [
    { id: 0, text: 'In-person', value: 'in-person' },
    { id: 1, text: 'Remote', value: 'remote' },
    { id: 2, text: 'Hybrid', value: 'hybrid' },
  ];

  // edit setters
  const [newName, setNewName] = useState(input_name);
  const [newSchool, setNewSchool] = useState(school);
  const [newYear, setNewYear] = useState(year);
  const [newCountry, setNewCountry] = useState(country);
  const [newCity, setNewCity] = useState(city);
  const [newProjectPref, setNewProjectPref] = useState(projectPref);
  const [newWebsite, setNewWebsite] = useState(personal_site);

  const handleClose = () => {
    setNewName(input_name);
    setNewSchool(school);
    setNewYear(year);
    setNewCountry(country);
    setNewCity(city);
    setNewWebsite(personal_site);
    setNewProjectPref(projectPref);
    onClose();
  };

  const handleSave = async () => {
    const updatedData = {
      input_name: newName,
      full_name: newName,
      input_first_name: newName.split(' ')[0],
      personal_site: newWebsite,
      projectPref: newProjectPref,
      city: newCity,
      country: newCountry,
      year: newYear,
      school: newSchool,
    };
    await updateStupaidUser(userId, updatedData);
    let storedValue = localStorage.getItem('user-data');
    if (storedValue) {
      storedValue = JSON.parse(storedValue);
      const updatedLocalStorage = {
        ...storedValue,
        name: newName,
      };
      setValue(updatedLocalStorage);
      localStorage.setItem('user-data', JSON.stringify(updatedLocalStorage));
    }
    onClose();
  };

  return (
    <Flex mb="30px" flexDir="column">
      <HStack>
        <Image
          borderRadius="50%"
          src={photo_url ? photo_url : DefaultProfile}
        />
        <VStack alignItems="baseline" ml="20px">
          <Text fontWeight="bold" fontSize="29px">
            {input_name}
          </Text>
          {isVerified && <StupaidVerified />}
        </VStack>
        {canEdit && (
          <Button
            border="#545454 solid 1.5px"
            bg="transparent"
            borderRadius="20px"
            alignSelf="baseline"
            ml="auto"
            onClick={onOpen}
          >
            <Image mr="5px" src={EditIcon} />
            <Text>Edit profile</Text>
          </Button>
        )}
      </HStack>
      <VStack mt="30px" color="#545454" alignItems="baseline" w="fit-content">
        <HStack>
          <Image src={LocationIcon} />
          <Text>
            {city}, {country}
          </Text>
        </HStack>
        <HStack>
          <Image src={SchoolIcon} />
          <Text>{school}</Text>
        </HStack>
        <HStack>
          <Image src={ProjectPrefIcon} />
          <Text>{projectPref}</Text>
        </HStack>
        {personal_site && (
          <HStack mt="2px">
            <Image src={PersonalSiteIcon} />
            <Link
              href={personal_site}
              target="_blank"
              textDecoration="underline"
            >
              {personal_site}
            </Link>
          </HStack>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent p="40px" h="fit-content" maxW="800px">
          <ModalBody>
            <Flex flexDir="row">
              <VStack>
                <Image src={photo_url ? photo_url : DefaultProfile} />
                <Button
                  borderRadius="20px"
                  fontWeight="regular"
                  w="100%"
                  border="#0d0d0d 1.5px solid"
                  bg="transparent"
                  mt="20px"
                >
                  <Image mr="10px" src={ReplaceIcon} />
                  <Text>Replace</Text>
                </Button>
              </VStack>
              <Box mx="30px" h="inherit" bgColor="#ececec" w="1.5px"></Box>
              <Flex gap="20px" flexDir="column">
                <VStack alignItems="baseline">
                  <Text fontWeight="bold">Full name</Text>
                  <Input
                    placeholder="Full name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </VStack>
                <VStack alignItems="baseline">
                  <Text fontWeight="bold">School / Institution</Text>
                  <Input
                    placeholder="Name of School / Institution"
                    value={newSchool}
                    onChange={(e) => setNewSchool(e.target.value)}
                  />
                </VStack>
                <VStack alignItems="baseline">
                  <Text fontWeight="bold">Year level</Text>
                  <Input
                    placeholder="Select year level"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                  />
                </VStack>
                <HStack>
                  <VStack alignItems="baseline">
                    <Text fontWeight="bold">Country</Text>
                    <Input
                      placeholder="Select country"
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                    />
                  </VStack>
                  <VStack alignItems="baseline">
                    <Text fontWeight="bold">City</Text>
                    <Input
                      placeholder="Select city"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                    />
                  </VStack>
                </HStack>
                <VStack alignItems="baseline">
                  <Text fontWeight="bold">Project Preference</Text>
                  <Flex
                    flexDir="row"
                    alignSelf="center"
                    justifyContent="space-between"
                    w="100%"
                    gap="10px"
                  >
                    {projectPrefButtons.map(({ id, text }) => {
                      return (
                        <Box
                          key={id}
                          border="1px solid #0c0c0c"
                          p="8px 40px"
                          _hover={{
                            cursor: 'pointer',
                          }}
                          borderRadius="15px"
                          color="#0c0c0c"
                          bg="transparent"
                          onClick={() => setNewProjectPref(text)}
                          bgColor={newProjectPref === text && '#d7d7d7'}
                        >
                          {text}
                        </Box>
                      );
                    })}
                  </Flex>
                </VStack>
                <VStack alignItems="baseline">
                  <Text fontWeight="bold">Website URL (Optional)</Text>
                  <Input
                    placeholder="Link to personal portfolio"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                  />
                </VStack>
                <HStack mt="10px">
                  <Button
                    borderRadius="15px"
                    fontWeight="regular"
                    w="100%"
                    border="#0d0d0d 1.5px solid"
                    bg="transparent"
                    onClick={handleClose}
                  >
                    <Image src={BackArrow} mr="8px" />
                    Back to profile
                  </Button>
                  <Button
                    isDisabled={
                      newName === '' ||
                      newSchool === '' ||
                      newYear === '' ||
                      newCountry === '' ||
                      newCity === ''
                    }
                    borderRadius="15px"
                    border="#101010 1.5px solid"
                    bgColor="#101010"
                    fontWeight="regular"
                    w="100%"
                    colorScheme="blue"
                    mr={3}
                    onClick={handleSave}
                    _hover={{
                      bgColor: 'black',
                    }}
                    _active={{
                      bgColor: 'black',
                    }}
                  >
                    Save changes
                  </Button>
                </HStack>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ProfileUserInfo;
