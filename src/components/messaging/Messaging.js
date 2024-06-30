import { Button, Input } from '@chakra-ui/react';
import React from 'react';

const Messaging = () => {
  return (
    <div>
      <Input placeholder='Enter your message here' textColor='white'/>
      <Button>Submit</Button>
    </div>
  );
};

export default Messaging;
