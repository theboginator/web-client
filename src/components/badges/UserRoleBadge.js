const { Badge } = require("@chakra-ui/layout");

const UserRoleBadge = ({ role }) => {

    const roles = {
        'administrator': 'red',
        'superuser': 'blue',
        'user': 'green',
        'client': 'yellow',
    }

    const color = roles.hasOwnProperty(role) ? roles[role] : 'yellow';

    return <Badge colorScheme={color}>{role}</Badge>
}

export default UserRoleBadge;
