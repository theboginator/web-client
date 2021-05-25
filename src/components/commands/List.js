import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Center, HStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useHistory } from 'react-router-dom';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import { IconFolder } from '../ui/Icons';
import Title from '../ui/Title';
import CommandsTable from './Table';

const CommandsListPage = () => {
    const history = useHistory();
    const [commands, updateCommands] = useFetch('/commands')
    const destroy = useDelete('/commands/', updateCommands);

    useSetTitle('Commands');

    const onAddCommandClick = ev => {
        ev.preventDefault();
        history.push('/commands/add');
    }

    return <div>
        <HStack alignItems='center' justifyContent='space-between'>
            <Title title='Commands' icon={<IconFolder />} />
            <Button variant='outline' colorScheme='green' onClick={onAddCommandClick} leftIcon={<AddIcon />}>Add command</Button>
        </HStack>
        {!commands ? <Center><Spinner /></Center> : <CommandsTable commands={commands} onDeleteCallback={destroy} />}
    </div>
}


export default CommandsListPage;
