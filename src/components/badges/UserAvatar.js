import { Avatar } from '@chakra-ui/avatar';
import MD5 from '../../services/md5';

const UserAvatar = ({ email, size = 'sm', onClick, name }) => {
   
    return <Avatar 
                name={name} 
                size={size} 
                onClick={onClick} 
                src={email && `https://www.gravatar.com/avatar/${MD5(email)}?s=200&d=robohash`} />
    
}

export default UserAvatar;
