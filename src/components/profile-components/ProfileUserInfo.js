import {
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
  Spinner,
} from '@chakra-ui/react';
import React, { useContext, useRef, useState } from 'react';
import StupaidVerified from '../global-components/StupaidVerified';
import LocationIcon from '../../assets/images/location-icon.svg';
import ProjectPrefIcon from '../../assets/images/project-pref-icon.svg';
import SchoolIcon from '../../assets/images/school-icon.svg';
import EditIcon from '../../assets/images/edit-icon.svg';
import PersonalSiteIcon from '../../assets/images/website-icon.svg';
import DefaultProfile from '../../assets/images/default-pfp.svg';
import ReplaceIcon from '../../assets/images/replace-icon.svg';
import BackArrow from '../../assets/images/back-arrow-black.svg';
import {
  formatUrl,
  updateStupaidUser,
  uploadImage,
} from '../../firebase/helpers';
import { SignedInContext } from '../../App';
import PrimaryButtonGrey from '../button-components/PrimaryButtonGrey';
import PrimaryButtonBlack from '../button-components/PrimaryButtonBlack';

const ProfileUserInfo = ({ userId, userData, canEdit }) => {
  const { value, setValue } = useContext(SignedInContext);

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
  const [newImage, setNewImage] = useState(photo_url);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleClose = () => {
    setNewName(input_name);
    setNewSchool(school);
    setNewYear(year);
    setNewCountry(country);
    setNewCity(city);
    setNewWebsite(personal_site);
    setNewProjectPref(projectPref);
    setNewImage(photo_url);
    onClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const file = fileInputRef.current.files[0];
    let globalUrl = null;
    if (file) {
      try {
        setLoading(true);
        const { url } = await uploadImage(
          file,
          value?.uid,
          `${value?.uid}/profile-pic/${file.name}`,
        );
        globalUrl = url;
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false);
      }
    }
    const updatedData = {
      input_name: newName,
      full_name: newName,
      input_first_name: newName.split(' ')[0],
      first_name: newName.split(' ')[0],
      personal_site: newWebsite,
      projectPref: newProjectPref,
      city: newCity,
      country: newCountry,
      year: newYear,
      school: newSchool,
      photo_url: globalUrl !== null ? globalUrl : photo_url,
    };
    await updateStupaidUser(userId, updatedData);
    const updatedContextValue = {
      ...value,
      name: newName,
      photo_url: globalUrl !== null ? globalUrl : photo_url,
    };
    setValue(updatedContextValue);
    onClose();
  };

  return (
    <Flex mb="30px" flexDir="column">
      <HStack>
        <Box
          borderRadius="100%"
          w="110px"
          h="110px"
          backgroundImage={photo_url ? photo_url : DefaultProfile}
          backgroundColor="#dbdbdb"
          backgroundSize="cover"
          backgroundPosition="center"
        ></Box>
        <VStack alignItems="baseline" ml="20px">
          <Text fontWeight="bold" fontSize="29px">
            {input_name}
          </Text>
          {isVerified && <StupaidVerified />}
        </VStack>
        {canEdit && (
          <PrimaryButtonGrey alignSelf="baseline" ml="auto" onClick={onOpen}>
            <Image mr="5px" src={EditIcon} />
            <Text>Edit profile</Text>
          </PrimaryButtonGrey>
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
              href={formatUrl(personal_site)}
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
            <Flex flexDir={{ base: 'column', md: 'row' }}>
              <VStack mb={{ base: '70px', md: 0 }}>
                <Box
                  borderRadius="100%"
                  w="110px"
                  h="110px"
                  backgroundImage={newImage ? newImage : DefaultProfile}
                  backgroundColor="#dbdbdb"
                  backgroundSize="cover"
                  backgroundPosition="center"
                >
                  {loading && (
                    <Spinner
                      size={{ base: 'lg', md: 'xl' }}
                      thickness="4px"
                      color="blue.500"
                      position="absolute"
                      top={{ base: '34vh', md: '40vh' }}
                      left={{ base: '46vw', md: '8.5vw' }}
                      transform="translate(-50%, -50%)"
                    />
                  )}
                </Box>
                <PrimaryButtonGrey
                  w={{ sm: '80%', md: '100%' }}
                  mt="20px"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Image mr="10px" src={ReplaceIcon} />
                  <Text>Replace</Text>
                  <Input
                    borderRadius="20px"
                    type="file"
                    accept="image/*"
                    opacity="0"
                    position="absolute"
                    width="100%"
                    height="100%"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </PrimaryButtonGrey>
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
                    wrap="wrap"
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
                  <PrimaryButtonGrey onClick={handleClose} w="100%">
                    <Image src={BackArrow} mr="8px" />
                    Back to profile
                  </PrimaryButtonGrey>
                  <PrimaryButtonBlack
                    isDisabled={
                      newName === '' ||
                      newSchool === '' ||
                      newYear === '' ||
                      newCountry === '' ||
                      newCity === '' ||
                      loading
                    }
                    w="100%"
                    mr={3}
                    onClick={handleSave}
                  >
                    Save changes
                  </PrimaryButtonBlack>
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
