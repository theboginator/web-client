import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { HStack, Text, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import FileSizeSpan from "components/ui/FileSizeSpan";
import ModalDialog from "components/ui/ModalDIalog";
import NoResultsTableRow from "components/ui/NoResultsTableRow";
import { resolveMime } from 'friendly-mimes';
import useDelete from "hooks/useDelete";
import { useState } from "react";
import ReactTimeAgo from 'react-time-ago';
import secureApiFetch from "services/api";

const AttachmentsTable = ({ attachments, reloadAttachments }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [content, setContent] = useState(null);

    const onModalClose = () => {
        setModalVisible(false);
    }

    const deleteAttachmentById = useDelete('/attachments/', reloadAttachments);

    const onViewClick = (ev, attachmentId) => {
        secureApiFetch(`/attachments/${attachmentId}`, { method: 'GET', headers: {} })
            .then(resp => {
                const contentDispositionHeader = resp.headers.get('Content-Disposition');
                const contentType = resp.headers.get('Content-Type');
                const filenameRe = new RegExp(/filename="(.*)";/)
                const filename = filenameRe.exec(contentDispositionHeader)[1]
                return Promise.all([contentType, filename, resp.blob()]);
            })
            .then(async (values) => {
                const [contentType, , blob] = values;

                if (contentType.indexOf('image/') !== -1) {
                    setContent(<img src={await URL.createObjectURL(blob)} alt="" />);
                    // @todo -> URL.revokeObjectURL
                } else {
                    setContent(<textarea style={{ width: '100%', height: '90%' }}>{await blob.text()}</textarea>);
                }
                setModalVisible(true);
            })
    }

    const onDownloadClick = (ev, attachmentId) => {
        secureApiFetch(`/attachments/${attachmentId}`, { method: 'GET', headers: {} })
            .then(resp => {
                const contentDispositionHeader = resp.headers.get('Content-Disposition');
                const filenameRe = new RegExp(/filename="(.*)";/)
                const filename = filenameRe.exec(contentDispositionHeader)[1]
                return Promise.all([resp.blob(), filename]);
            })
            .then((values) => {
                const blob = values[0];
                const filename = values[1];
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
            })
    }

    const onDeleteAttachmentClick = (ev, attachmentId) => {
        deleteAttachmentById(attachmentId)
            .then(() => reloadAttachments());
    }

    if (!attachments) {
        return <Spinner />
    }

    return <>
        <ModalDialog visible={modalVisible} title="Preview output" onModalClose={onModalClose} style={{ overflow: 'auto', width: '80%', height: '80%', maxHeight: '80%' }}>
            {content}
        </ModalDialog>

        <Table size='sm'>
            <Thead>
                <Th>Filename</Th>
                <Th>File size</Th>
                <Th>Uploaded</Th>
                <Th>Mimetype</Th>
            </Thead>
            <Tbody>
                {attachments.length === 0 && <NoResultsTableRow numColumns={6} />}
                {attachments.map((attachment, index) =>
                    <Tr key={index}>
                    

                        <Td>
                            <VStack alignItems='start'>
                                <Text fontWeight='bold'>{attachment.client_file_name}</Text>
                                <Text color='gray.500'  size='xs' title={resolveMime(attachment.file_mimetype)['name']}>{attachment.file_mimetype}</Text>
                            </VStack>
                            </Td>
                        <Td><FileSizeSpan fileSize={attachment.file_size} /></Td>
                            <Td>
                        <VStack alignItems='start'>
                            <Text> {attachment.submitter_name} </Text>
                            <Text color='gray.500' size='xs'><ReactTimeAgo date={attachment.insert_ts} /></Text>
                        </VStack>
                        </Td>
                        <Td>
                            <HStack spacing='3'>
                                <ButtonGroup isAttached size='sm' variant='outline' >
                                    <Button onClick={ev => onViewClick(ev, attachment.id)}>View</Button>
                                    <Button onClick={ev => onDownloadClick(ev, attachment.id)}>Download</Button>
                                </ButtonGroup>
                                <IconButton size='sm' variant='outline' icon={<DeleteIcon />} colorScheme='red' onClick={ev => onDeleteAttachmentClick(ev, attachment.id)} />
                            </HStack>
                        </Td>
                    </Tr>
                )}
            </Tbody>
        </Table>
    </>
}

export default AttachmentsTable;
