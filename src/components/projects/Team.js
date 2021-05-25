import { Avatar, AvatarGroup } from '@chakra-ui/avatar'
import {useHistory} from 'react-router-dom'
import MD5 from 'services/md5'

const ProjectTeam = ({project, users}) => {
    const history = useHistory()
    const handleOnClick = id => {
        history.push(`/users/${id}`)
    }

    return (
        <AvatarGroup size="md" max={4}>
            {users && users.map((user, index) =>
                <Avatar
                    key={index}
                    bgColor='gray.700'
                    src={`https://www.gravatar.com/avatar/${MD5(user.email)}?s=200&d=robohash`}
                    email={user.email}
                    onClick={() => handleOnClick(user.id)}
                    name={user.name}
                    />
            )}
        </AvatarGroup>
    )
}

export default ProjectTeam