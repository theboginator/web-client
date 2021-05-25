import { Button, IconButton } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { AddIcon, RepeatIcon } from '@chakra-ui/icons';
import { Center, HStack } from "@chakra-ui/layout";
import { Select } from '@chakra-ui/select';
import { Spinner } from "@chakra-ui/spinner";
import RestrictedComponent from 'components/logic/RestrictedComponent';
import DeleteButton from 'components/ui/buttons/Delete';
import { actionCompletedToast } from 'components/ui/toast';
import React, { useState } from 'react';
import secureApiFetch from 'services/api';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import TaskStatuses from "../../models/TaskStatuses";
import { IconClipboardList } from "../ui/Icons";
import Title from '../ui/Title';
import TasksTable from './TasksTable';

const TasksList = ({ history }) => {
    useSetTitle('Tasks');

    const [tasks, reloadTasks] = useFetch('/tasks');
    const [selectedTasks, setSelectedTasks] = useState([]);

    const [projects] = useFetch('/projects')
    const [filter, setFilter] = useState({ project: '', user: '', status: '' })

    const [reloadButtonDisabled, setReloadButtonDisabled] = useState(false);

    const handleSetProject = (ev) => {
        setFilter({ ...filter, project: ev.target.value })
    }
    const handleSetStatus = (ev) => {
        setFilter({ ...filter, status: ev.target.value })
    }
    const handleCreateTask = () => {
        history.push(`/tasks/create`);
    }

    const onStatusSelectChange = (ev) => {
        const newStatus = ev.target.value;

        secureApiFetch('/tasks', {
            method: 'PATCH',
            headers: {
                'Bulk-Operation': 'UPDATE',
            },
            body: JSON.stringify({
                taskIds: selectedTasks,
                newStatus: newStatus
            })
        })
            .then(reloadTasks)
            .then(() => {
                actionCompletedToast(`All selected tasks have been transitioned to "${newStatus}".`);
                ev.target.value = '';
            })
            .catch(err => console.error(err));
    }

    const onDeleteButtonClick = () => {
        secureApiFetch('/tasks', {
            method: 'PATCH',
            headers: {
                'Bulk-Operation': 'DELETE',
            },
            body: JSON.stringify(selectedTasks),
        })
            .then(reloadTasks)
            .then(() => {
                setSelectedTasks([]);
                actionCompletedToast('All selected tasks were deleted.');
            })
            .catch(err => console.error(err));
    };

    const destroy = useDelete('/tasks/', reloadTasks);

    return (
        <>
            <HStack justifyContent="space-between" alignItems="center">
            <Title title="Tasks" icon={<IconClipboardList />} />

                <HStack spacing="5" alignItems="flex-end">
                    <RestrictedComponent roles={["administrator"]}>
                        {selectedTasks.length > 0 && (
                            <FormControl>
                                <DeleteButton
                                    size="md"
                                    onClick={onDeleteButtonClick}
                                    disabled={!selectedTasks.length}
                                >
                                    Delete selected
                                </DeleteButton>
                            </FormControl>
                        )}
                    </RestrictedComponent>
                    <FormControl>
                        <FormLabel color="gray.500">Project</FormLabel>
                        <Select onChange={handleSetProject} placeholder="Any">
                            {projects &&
                                projects.map((project) => (
                                    <option value={project.id} key={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel color="gray.500">Status</FormLabel>
                        <Select onChange={handleSetStatus} placeholder="Any">
                            {TaskStatuses.map((status, index) => (
                                <option value={status.id}>{status.name}</option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel color="gray.500">
                            Transition to&nbsp;
                        </FormLabel>

                        <Select
                            disabled={!selectedTasks.length}
                            onChange={onStatusSelectChange}
                            placeholder="Any"
                        >
                            {TaskStatuses.map((status, index) => (
                                <option key={index} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <IconButton
                        variant="outline"
                        icon={<RepeatIcon />}
                        onClick={async () => {
                            setReloadButtonDisabled(true);
                            await reloadTasks();
                            setReloadButtonDisabled(false);
                        }}
                        disabled={reloadButtonDisabled}
                    />
                    <FormControl>
                        <Button
                            colorScheme="orange"
                            variant="outline"
                            leftIcon={<AddIcon />}
                            onClick={handleCreateTask}
                        >
                            Create task
                        </Button>
                    </FormControl>
                </HStack>
            </HStack>

            {!tasks ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <TasksTable
                    tasks={tasks}
                    selectedTasks={selectedTasks}
                    setSelectedTasks={setSelectedTasks}
                    filter={filter}
                    destroy={destroy}
                />
            )}
        </>
    );
}

export default TasksList
