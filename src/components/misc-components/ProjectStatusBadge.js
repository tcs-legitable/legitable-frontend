import { Box } from '@chakra-ui/react';
import React from 'react';

const ProjectStatusBadge = ({ children, ...props }) => {
  return (
    <Box
      borderRadius="10px"
      w="fit-content"
      color="white"
      bgColor="#8C8C8C"
      p="6px 11px"
      {...props}
    >
      {children}
    </Box>
  );
};

export default ProjectStatusBadge;
