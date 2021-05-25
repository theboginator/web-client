import { Button, ButtonGroup } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Center, HStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import DeleteButton from "../ui/buttons/Delete";
import ExternalLink from "../ui/ExternalLink";
import { IconBriefcase } from '../ui/Icons';
import NoResults from "../ui/NoResults";
import Title from '../ui/Title';
import ClientLink from "./Link";

const ClientsList = ({ history }) => {
    useSetTitle('Clients');
    const [clients, updateTasks] = useFetch('/clients')

    const destroy = useDelete('/clients/', updateTasks);
    const handleCreateClient = () => {
        history.push(`/clients/create`)
    }

    return <>
        <HStack justifyContent='space-between'>
            <Title title='Clients' icon={<IconBriefcase />} />
            <Button variant='outline' colorScheme='linkedin' onClick={handleCreateClient} leftIcon={<AddIcon />}>Create Client</Button>
        </HStack>

        {!clients ?
            <Center><Spinner /></Center> :
            <Table>
                <Thead>
                    <Tr>
                        <Th style={{ width: '190px' }}>Name</Th>
                        <Th>URL</Th>
                        <Th>Contact name</Th>
                        <Th>Contact email</Th>
                        <Th>Contact phone</Th>
                        <Th>&nbsp;</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {clients.length === 0 ?
                        <Tr>
                            <Td colSpan="6"><NoResults /></Td>
                        </Tr> :
                        clients.map((client) =>
                            <Tr key={client.id}>
                                <Td><ClientLink clientId={client.id}>{client.name}</ClientLink></Td>
                                <Td>{client.url ? <ExternalLink href={client.url}>{client.url}</ExternalLink> : '-'}</Td>
                                <Td>{client.contact_name || '-'}</Td>
                                <Td>{client.contact_email || '-'}</Td>
                                <Td>{client.contact_phone || '-'}</Td>
                                <Td className='flex justify-end'>
                                    <ButtonGroup size='sm' isAttached>
                                        <Button colorScheme='yellow' variant='outline' href={`/clients/${client.id}/edit`}>Edit</Button>
                                        <DeleteButton onClick={() => destroy(client.id)} />
                                    </ButtonGroup>
                                </Td>
                            </Tr>
                        )
                    }
                </Tbody>
            </Table>
        }
    </>
}

export default ClientsList
