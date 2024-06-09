import { HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import StupaidVerifiedStar from '../../assets/images/star-stupaid-verified.svg';

const StupaidVerified = () => {
  return (
    <HStack spacing="5px" borderRadius="28px" bgColor="#d7d7d7" p="6px 11px">
      <Image p="0px" src={StupaidVerifiedStar} />
      <Text fontSize="14px" fontWeight="regular">
        Stupaid verified
      </Text>
    </HStack>
  );
};

export default StupaidVerified;
