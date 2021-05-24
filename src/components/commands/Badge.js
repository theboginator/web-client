import { Link, Text } from '@chakra-ui/layout';
import { Link as ReachLink } from 'react-router-dom'
import { IconTerminal } from '../ui/Icons'

const CommandBadge = ({ command }) => {
   
    return (
        <Link as={ReachLink} to={"/commands/" + command.id} display='flex' color='green.300'>
            <IconTerminal styling={{ width: '16px'}}/>
            <Text ml='2' fontWeight='bold'> {command.short_name} </Text>
        </Link>
    )
}

export default CommandBadge;
