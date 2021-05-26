import { Button } from '@chakra-ui/button';
import { AttachmentIcon } from '@chakra-ui/icons';
import { Box, Center, HStack, Text } from '@chakra-ui/layout';
import { Table, Tbody, Td, Tr } from '@chakra-ui/table';
import { IconDocument, IconUpload } from 'components/ui/Icons';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import secureApiFetch from 'services/api';

const AttachmentsDropzone = ({ parentType, parentId, onUploadFinished = null }) => {
  const onFileDrop = (newFiles) => {
    setAcceptedFiles(newFiles);
  };
  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const onUploadButtonClick = (ev) => {
    const formData = new FormData();
    formData.append('parentType', parentType);
    formData.append('parentId', parentId);
    acceptedFiles.forEach((file) => {
      formData.append('attachment[]', file);
    });

    secureApiFetch('/attachments', {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        setAcceptedFiles([]);
        if (onUploadFinished) onUploadFinished();
      })
      .catch((err) => console.error(err));
  };
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop: onFileDrop });

  return (
    <>
      <HStack mb="4" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Files to upload
        </Text>
        <Button rightIcon={<AttachmentIcon />} colorScheme='green' size='md' variant='outline' onClick={onUploadButtonClick} disabled={acceptedFiles.length === 0}>
          Upload file(s)
        </Button>
      </HStack>
      <Box
        rounded="lg"
        bgColor="gray.900"
        p="12"
        borderStyle="dotted"
        borderWidth="2px"
        {...getRootProps()}
        borderColor={isDragActive ? 'whiteAlpha.500' : isDragAccept ? 'green.500' : isDragReject && 'red.500'}>
        <input {...getInputProps()} />
        <Center flexDirection='column'>
            <IconUpload  styling={{ width: '48px'}} />
            <Text align="center" size="sm" color="gray.500" mt='5'>
            Drag and drop some files here, or click to select files
            </Text>
        </Center>
      </Box>
      {acceptedFiles.length >= 0 && (
        <Table size="sm" my="4">
          <Tbody>
            {acceptedFiles.length > 0 &&
              acceptedFiles.map((file) => (
                <Tr key={file.path}>
                  <Td>
                    <IconDocument styling={{ width: '16px' }} />
                  </Td>
                  <Td>{file.path}</Td>
                  <Td>{file.size} bytes</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};

export default AttachmentsDropzone;
