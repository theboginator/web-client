import { Box, Divider, Grid, HStack, Text } from '@chakra-ui/layout';
import AttachmentsTable from 'components/attachments/AttachmentsTable';
import AttachmentsDropzone from 'components/attachments/Dropzone';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import useFetch from 'hooks/useFetch';
import React from 'react';

const ProjectAttachmentsTab = ({ project }) => {
    const parentType = 'project';
    const parentId = project.id;
    const [attachments, reloadAttachments] = useFetch(`/attachments?parentType=${parentType}&parentId=${parentId}`)

    return <Grid templateColumns={['1fr', '1fr', '1fr','.6fr 1fr']} gap='3'>
                <Box as="article" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" >
                    <RestrictedComponent roles={['administrator', 'superuser', 'user']} message="(access restricted)">
                        <AttachmentsDropzone parentType={parentType} parentId={parentId} onUploadFinished={reloadAttachments} />
                    </RestrictedComponent>
                </Box>
                <Box as="article" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" overflowX='auto'>
                    <HStack mb="4">
                        <Text fontSize="xl" fontWeight="bold">
                        Attachment list
                        </Text>
                    </HStack>
                    <Divider />
                    <RestrictedComponent roles={['administrator', 'superuser', 'user']} message="(access restricted)">
                        <AttachmentsTable attachments={attachments} reloadAttachments={reloadAttachments} />
                    </RestrictedComponent>
                </Box>
    </Grid>;
}

export default ProjectAttachmentsTab;
