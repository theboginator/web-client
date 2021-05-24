import { Link, Text } from "@chakra-ui/layout";
import { IconClipboard } from "components/ui/Icons";
import { Link as ReachLink } from "react-router-dom";

const TaskBadge = ({ task }) => {
    return (
        <Link as={ReachLink} to={"/tasks/" + task.id} display='flex' color='orange.300'>
            <IconClipboard  styling={{ width: '16px'}}/>
            <Text fontSize='sm' ml='2' fontWeight='bold'>{task.summary}</Text>
        </Link>

    );;
};

export default TaskBadge;
