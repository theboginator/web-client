import { Button } from '@chakra-ui/button';
import { SmallAddIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/layout';
import { Link  } from "react-router-dom";

const TargetBadge = ({ projectId, target }) => {
    return <Button width='min-content' textAlign='left' variant='ghost' colorScheme='pink' 
    as={Link} to={`/projects/${projectId}/targets/${target.id}`}
    leftIcon={ <SmallAddIcon  />}
    >
       
        <Text fontWeight='bold'>{target.name}</Text>
    </Button>
}

export default TargetBadge;
