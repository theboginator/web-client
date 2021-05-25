import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { DeleteIcon } from "@chakra-ui/icons";
import { Code, LinkOverlay } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import RestrictedComponent from "components/logic/RestrictedComponent";
import React from "react";
import NoResults from "../ui/NoResults";
import UserLink from "../users/Link";
import TaskBadge from "./TaskBadge";
import TaskStatusFormatter from "./TaskStatusFormatter";

const TasksTable = ({ tasks, selectedTasks, setSelectedTasks, filter = { project: '', status: '' }, destroy }) => {

    const showSelection = selectedTasks !== undefined;

    const onSelectionChange = ev => {
        const target = ev.target;
        const targetId = parseInt(target.value);
        if (target.checked) {
            setSelectedTasks([...selectedTasks, targetId]);
        } else {
            setSelectedTasks(selectedTasks.filter(value => value !== targetId));
        }
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    {showSelection && <Th style={{ width: "32px" }}>&nbsp;</Th>}
                    <Th style={{ width: '190px' }}>Summary</Th>
                    <Th className='only-desktop'>Description</Th>
                    <Th style={{ width: '190px' }}>Project</Th>
                    <Th style={{ width: '12ch' }}>Assignee</Th>
                    <Th style={{ width: '100px' }}>Status</Th>
                    <Th>Command</Th>
                    <Th>&nbsp;</Th>
                </Tr>
            </Thead>
            <Tbody>
                {tasks.length === 0 ?
                    <Tr>
                        <Td colSpan="7"><NoResults /></Td>
                    </Tr> :
                    tasks
                        .filter(task => task.project_id.toString().includes(filter.project))
                        .filter(task => task.status.includes(filter.status))
                        .map((task) =>
                            <Tr key={task.id}>
                                {showSelection &&
                                    <Td>
                                        <Checkbox colorScheme='red' value={task.id} onChange={onSelectionChange} isChecked={selectedTasks.includes(task.id)} />
                                    </Td>
                                }
                                <Td><TaskBadge task={task} /></Td>
                                <Td className='only-desktop truncate' >{task.description}</Td>
                                <Td><a href={`/projects/${task.project_id}`}>{task.project_name}</a></Td>
                                <Td  >{task.assignee_uid ?
                                    <UserLink userId={task.assignee_uid}>{task.assignee_full_name}</UserLink> : '(nobody)'}</Td>
                                <Td><TaskStatusFormatter task={task} /></Td>
                                <Td>
                                    <Code>
                                    {task.command_short_name ? task.command_short_name : '-'}
                                    </Code>
                                    </Td>
                                <Td className='flex justify-end'>
                                    <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                                        <ButtonGroup
                                                size="sm"
                                                isAttached
                                                variant="outline"
                                            >
                                                <Button mr="-px" colorScheme='yellow'>
                                                    <LinkOverlay
                                                        href={`/tasks/${task.id}/edit`}
                                                    >
                                                        Edit
                                                    </LinkOverlay>
                                                </Button>
                                                {destroy &&<IconButton
                                                colorScheme='red'
                                                    aria-label="Delete"
                                                    icon={<DeleteIcon />}
                                                    onClick={() => destroy(task.id) }
                                                />}
                                            </ButtonGroup>

                                    </RestrictedComponent>
                                </Td>
                            </Tr>
                        )}
            </Tbody>
        </Table>
    )
}

export default TasksTable;
