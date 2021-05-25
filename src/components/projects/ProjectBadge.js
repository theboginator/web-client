import { Button } from '@chakra-ui/button';
import {  Text } from '@chakra-ui/layout';
import { Link  } from 'react-router-dom';
import { IconCollection } from '../ui/Icons';
import './ProjectBadge.scss';

const ProjectBadge = ({ project , size='md'}) => {
    return <Button 
    size={size}
    width='min-content' textAlign='left' variant='ghost' colorScheme='purple' as={Link}  to={`/projects/${project.id}`} display='flex' color='red.300'
        leftIcon={ <IconCollection styling={{ width: '24px'}}/>}
    >
       
        <Text fontWeight='bold'>{project.name}</Text>
    </Button>
}

export default ProjectBadge;
