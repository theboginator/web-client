import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Divider, HStack, Text } from '@chakra-ui/layout';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import { useHistory } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import TasksTable from "../tasks/TasksTable";
import Loading from '../ui/Loading';

const ProjectTasks = ({ project }) => {
    const history = useHistory();
    const [tasks] = useFetch(`/projects/${project.id}/tasks`)

    const handleAddTask = ev => {
        ev.preventDefault();
        history.push(`/tasks/create?projectId=${project.id}`);
    }

    return <Box
                as="article"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="5"
            >
                <HStack mb="4" justifyContent='space-between'>
                    <Text fontSize="xl" fontWeight="bold">
                    Tasks&nbsp;<small>({tasks && tasks.reduce(function (total, task) {
                            return task.status === 'done' ? total + 1 : total;
                        }, 0)}/{tasks && tasks.length} completed)</small>
                    </Text>
                    <RestrictedComponent roles={["administrator", "superuser", "user"]} >
                        <Button onClick={handleAddTask} leftIcon={<AddIcon />} size='sm' variant='outline'>
                            Add task
                        </Button>
                    </RestrictedComponent>
                </HStack>
                <Divider />
                    

        {tasks ? <TasksTable tasks={tasks} /> : <Loading />}
        </Box>

}

export default ProjectTasks
