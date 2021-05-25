import { Button } from "@chakra-ui/button";
import {  Text } from "@chakra-ui/layout";
import { IconClipboard } from "components/ui/Icons";
import { Link  } from "react-router-dom";

const TaskBadge = ({ task }) => {
    return (
        <Button width='min-content' textAlign='left' variant='ghost' colorScheme='orange' 
        as={Link} to={"/tasks/" + task.id} 
        leftIcon={ <IconClipboard  styling={{ width: '24px'}}/>}
        >
           
            <Text fontWeight='bold'>{task.summary}</Text>
        </Button>

    );;
};

export default TaskBadge;
