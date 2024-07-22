import { Box, Image, Text, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import StupaidVerifiedBadge from './../../assets/images/stupaid-verified-badge.svg';
import { useNavigate } from 'react-router-dom';
import PrimaryButtonGrey from '../button-components/PrimaryButtonGrey';
import TemplateSkillImage from '../../assets/images/template-image.svg';
import ArrowPointLeft from '../../assets/images/arrow-point-left.svg';
import ArrowPointRight from '../../assets/images/arrow-point-right.svg';

const CreativeCard = ({
  photo_url,
  city,
  country,
  school,
  projectPref,
  full_name,
  skills,
  skillImages,
  isVerified,
  uid,
}) => {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = () => {
    const max = skillImages.length;
    if (imageIndex + 1 >= max) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  const prevImage = () => {
    const max = skillImages.length - 1;
    const min = 0;
    if (imageIndex - 1 < min) {
      setImageIndex(max);
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  useEffect(() => {
    console.log(skillImages, ' are te images');
  }, []);

  return (
    <Box
      borderRadius="10px"
      display="flex"
      flexDirection="column"
      p="25px"
      my="10px"
      border="1px solid #dbdbdb"
      w="100%"
      maxW="1100px"
    >
      <Box
        w="100%"
        mb="20px"
        h="200px"
        backgroundImage={
          skillImages.length > 0 ? skillImages[imageIndex] : TemplateSkillImage
        }
        borderRadius="10px"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        {skillImages.length > 0 && (
          <PrimaryButtonGrey
            top="35%"
            ml="10px"
            pos="relative"
            float="left"
            bgColor="rgba(250, 250, 250, 0.8)"
            _hover={{ bgColor: 'rgba(239, 239, 239, 0.8)' }}
            _active={{ bgColor: 'rgba(239, 239, 239, 0.8)' }}
            onClick={prevImage}
          >
            <Image src={ArrowPointLeft} />
          </PrimaryButtonGrey>
        )}
        {skillImages.length > 0 && (
          <PrimaryButtonGrey
            top="35%"
            pos="relative"
            float="right"
            mr="10px"
            bgColor="rgba(250, 250, 250, 0.8)"
            _hover={{ bgColor: 'rgba(239, 239, 239, 0.8)' }}
            _active={{ bgColor: 'rgba(239, 239, 239, 0.8)' }}
            onClick={nextImage}
          >
            <Image src={ArrowPointRight} />
          </PrimaryButtonGrey>
        )}
      </Box>
      <Box w="inherit">
        <Box display="flex" mb="7px">
          <Text
            _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => {
              navigate(`/user/${uid}`);
            }}
            fontSize="xl"
            fontWeight="bold"
          >
            {full_name}
          </Text>
          {isVerified && <Image ml="7px" src={StupaidVerifiedBadge} />}
        </Box>

        <Text>
          {city}, {country}
        </Text>

        <Text>{school}</Text>

        <Flex gap="10px" flexWrap="wrap" w="100%" mt="10px">
          {skills &&
            skills.map((skill, id) => {
              return (
                <PrimaryButtonGrey
                  key={id}
                  onClick={() => {
                    if (skill?.link) {
                      window.open(skill?.link, '_blank');
                    }
                  }}
                >
                  {' '}
                  <Text marginRight="6px" fontWeight="300">
                    {skill?.skillName}
                  </Text>
                </PrimaryButtonGrey>
              );
            })}
        </Flex>
      </Box>
    </Box>
  );
};

export default CreativeCard;
