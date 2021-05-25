import { Button, ButtonGroup } from "@chakra-ui/button";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tag } from "@chakra-ui/tag";
import DeleteButton from "components/ui/buttons/Delete";
import NoResults from "components/ui/NoResults";
import CommandBadge from "./Badge";

const CommandsTable = ({ commands, onDeleteCallback = null }) => {
    return <Table>
        <Thead>
            <Tr>
                <Th style={{ width: '190px' }}>Short name</Th>
                <Th className='only-desktop'>Description</Th>
                <Th>Docker image</Th>
                <Th></Th>
            </Tr>
        </Thead>
        <Tbody>
            {commands.length === 0 ?
                <Tr>
                    <Td colSpan="4"><NoResults /></Td>
                </Tr> :
                commands.map(command =>
                    <Tr key={command.id}>
                        <Td ><CommandBadge command={command} /></Td>
                        <Td className='only-desktop truncate'>{command.description}</Td>
                        <Td><Tag colorScheme='teal'>{command.docker_image}</Tag></Td>
                        <Td className='flex justify-end'>
                            <ButtonGroup isAttached size='sm'>
                                <Button variant='outline' colorScheme='yellow' href={`/commands/${command.id}/edit`}>Edit</Button>
                                {onDeleteCallback && <DeleteButton onClick={() => onDeleteCallback(command.id)} />}
                            </ButtonGroup>
                        </Td>
                    </Tr>
                )}
        </Tbody>
    </Table>
}

export default CommandsTable;
