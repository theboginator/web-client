import { Badge, Box, HStack, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import TaskBadge from "components/tasks/TaskBadge";
import TaskStatusFormatter from "components/tasks/TaskStatusFormatter";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import widgetIsVisible from "services/widgets";

const MyTasksWidget = () => {
    const [tasks] = useFetch(`/tasks?limit=5`)

    const visible = widgetIsVisible('my-tasks');
    if (!visible) return null;

    if (!tasks) return <Loading />

    return (
        <Box
            as="article"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="5"
        >
            <HStack mb="4">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                    New
                </Badge>
                <Text fontSize="md" fontWeight="bold">
                    My tasks
                </Text>
            </HStack>

            <Table variant="simple" size={'sm'}>
                <Thead>
                    <Tr>
                        <Th>Summary</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tasks.map((task) => (
                        <Tr>
                            <Td>
                                <TaskBadge task={task} />
                            </Td>
                            <Td>
                                <TaskStatusFormatter task={task} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}

export default MyTasksWidget;
