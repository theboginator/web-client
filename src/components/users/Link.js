import { Link, Text } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import {Link as ReachLink} from 'react-router-dom';
import {IconUser} from '../ui/Icons';
import './Link.css';

const UserLink = ({userId, children}) => {
    return <Link as={ReachLink} to={`/users/${userId}`} display='flex' color='blue.400'>
    <IconUser  styling={{ width: '16px'}}/>
    <Text fontSize='sm' ml='2' fontWeight='bold'>{children}</Text>
</Link>
    
}

UserLink.propTypes = {
    userId: PropTypes.any.isRequired
};

export default UserLink;
