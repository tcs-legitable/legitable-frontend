import { Button } from '@chakra-ui/react';
import React from 'react';

const PrimaryButtonGrey = ({ children, ...props }) => {
  return (
    <Button
      borderRadius="7px"
      fontWeight="regular"
      border="1.5px solid #E8E8E8"
      _hover={{ bgColor: '#EFEFEF' }}
      _active={{ bgColor: '#EFEFEF' }}
      bgColor="#fafafa"
      color="#0c0c0c"
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButtonGrey;
