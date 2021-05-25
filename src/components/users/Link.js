import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import {Link } from 'react-router-dom';
import {IconUser} from '../ui/Icons';
import './Link.css';

const UserLink = ({userId, children}) => {
    return <Button width='min-content' textAlign='left' variant='ghost' colorScheme='blue' as={Link} to={`/users/${userId}`} leftIcon={<IconUser  styling={{ width: '16px'}}/>}>
    
    <Text fontWeight='bold'>{children}</Text>
</Button>
    
}

UserLink.propTypes = {
    userId: PropTypes.any.isRequired
};

export default UserLink;
