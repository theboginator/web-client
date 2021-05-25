import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import RestrictedComponent from "components/logic/RestrictedComponent";
import React from "react";
import ReactMarkdown from "react-markdown";
import DeleteButton from "../ui/buttons/Delete";
import NoResultsTableRow from "../ui/NoResultsTableRow";

const NotesTable = ({ notes, onDeleteButtonClick }) => {
    return <Table>
        <Thead>
            <Tr>
                <Th style={{ width: '200px' }}>Creation time</Th>
                <Th style={{ width: '140px' }}>Author</Th>
                <Th style={{ width: '140px' }}>Visibility</Th>
                <Th>Content</Th>
                <Th>&nbsp;</Th>
            </Tr>
        </Thead>
        <Tbody>
            {notes.length === 0 && <NoResultsTableRow numColumns={5} />}
            {notes.map((note, index) =>
                <Tr>
                    <Td>{note.insert_ts}</Td>
                    <Td>{note.user_name}</Td>
                    <Td>{note.visibility}</Td>
                    <Td><ReactMarkdown>{note.content}</ReactMarkdown></Td>
                    <Td>
                        <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                            <DeleteButton onClick={ev => onDeleteButtonClick(ev, note)} />
                        </RestrictedComponent>
                    </Td>
                </Tr>
            )}
        </Tbody>
    </Table>
}

export default NotesTable;
