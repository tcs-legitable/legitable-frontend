import { Box, Flex, Image, Input, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import React, { useContext, useState } from 'react';
import { SignedInContext } from '../../App';
import clip from './../../assets/images/clip.svg';
import io from 'socket.io-client';
import { addMessage } from '../../firebase/helpers';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const socket = io.connect("https://legitable-backend.up.railway.app/");
// const socket = io.connect("http://localhost:3001");

const SendMessage = ({ roomId }) => {
  const { value } = useContext(SignedInContext);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, `chat_files/${roomId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const fileURL = await getDownloadURL(storageRef);
    return { fileURL, fileName: file.name };
  };

  const sendMessage = async () => {
    let fileData = null;

    if (file) {
      fileData = await uploadFile();
    }

    const messageData = {
      message: message.trim() !== "" ? message : "",
      room: roomId,
      author: value.name || "Anon.",
      timestamp: new Date(),
      fileURL: fileData?.fileURL || null,
      fileName: fileData?.fileName || null
    };

    console.log("Sending message:", messageData);

    socket.emit("send_message", messageData);

    await addMessage(roomId, messageData);
    setMessage("");
    setFile(null);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleClearFile = () => {
    setFile(null);
  };

  return (
    <Flex bottom="0" left="0" right="0" p="10px" zIndex="1000">
      <Box
        w="40px"
        h="40px"
        borderRadius="8px"
        backgroundColor="#fafafa"
        border="1px solid #ececec"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <label htmlFor="fileInput">
          <Image src={clip} cursor="pointer" />
        </label>
        <Input
          type="file"
          id="fileInput"
          display="none"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </Box>

      <Flex w="100%" ml="12px" align="center">
        <Input 
          placeholder="Message..."
          w="100%"
          value={file ? file.name : message}
          onChange={(event) => {
            if (!file) {
              setMessage(event.target.value);
            }
          }}
          onKeyDown={handleKeyPress}
          border="1px solid #ececec"
          backgroundColor="#fafafa"
          color={file ? "#3181CE" : "black"}
        />
        {file && (
          <IconButton
            aria-label="Clear file"
            icon={<CloseIcon />}
            size="sm"
            onClick={handleClearFile}
            ml="2"
          />
        )}
      </Flex>
    </Flex>
  );
};

export default SendMessage;
