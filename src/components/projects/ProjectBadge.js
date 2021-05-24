import { Link, Text } from '@chakra-ui/layout';
import { Link as ReachLink } from 'react-router-dom';
import { IconCollection } from '../ui/Icons';
import './ProjectBadge.scss';

const ProjectBadge = ({ project }) => {
    return <Link as={ReachLink}  to={`/projects/${project.id}`} display='flex' color='red.300'>
        <IconCollection styling={{ width: '32px'}}/>
        <Text fontSize='sm' ml='2' fontWeight='bold'>{project.name}</Text>
    </Link>
}

export default ProjectBadge;
