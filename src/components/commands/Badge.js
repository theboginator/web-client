import { Button } from '@chakra-ui/button';
import {  Text } from '@chakra-ui/layout';
import { Link  } from 'react-router-dom'
import { IconTerminal } from '../ui/Icons'

const CommandBadge = ({ command }) => {
   
    return (
        <Button width='min-content' textAlign='left' variant='ghost' colorScheme='green' 
            as={Link}
            to={"/commands/" + command.id}
            leftIcon={<IconTerminal styling={{ width: "24px" }} />}
        >
            <Text fontWeight="bold">
                {command.short_name}
            </Text>
        </Button>
    );
}

export default CommandBadge;
