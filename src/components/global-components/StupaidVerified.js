import { HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import StupaidVerifiedStar from '../../assets/images/Star-stupaid-verified1.svg';

const StupaidVerified = () => {
  return (
    <HStack spacing="5px" borderRadius="28px" bgColor="#d3e3ed" p="6px 11px">
      <Image p="0px" alt="huh" src={StupaidVerifiedStar} />
      <Text fontSize="14px" fontWeight="regular">
        Stupaid verified
      </Text>
    </HStack>
  );
};

export default StupaidVerified;
