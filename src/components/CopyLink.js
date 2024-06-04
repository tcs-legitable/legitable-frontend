import React, { useContext } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { SignedInContext } from '../App';

const CopyLink = () => {
  const { value } = useContext(SignedInContext);
  const toast = useToast();

  const copyUrlToClipboard = async () => {
    const host = window.location.origin;
    const url = `${host}/endorsees/${value}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'URL Copied!',
        description: 'The link has been copied to your clipboard.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Failed to Copy',
        description: 'Unable to copy the URL. Please try again.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Button colorScheme="blue" onClick={copyUrlToClipboard}>
      Copy Link to Clipboard
    </Button>
  );
};

export default CopyLink;
