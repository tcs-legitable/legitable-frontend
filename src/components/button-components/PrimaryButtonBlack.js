import { Button } from '@chakra-ui/react';
import React from 'react';

const PrimaryButtonBlack = ({ children, ...props }) => {
  return (
    <Button
      borderRadius="7px"
      fontWeight="regular"
      border="1.5px solid #0c0c0c"
      _hover={{ bgColor: '#333333' }}
      _active={{ bgColor: '#333333' }}
      bgColor="#0c0c0c"
      color="#fafafa"
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButtonBlack;
