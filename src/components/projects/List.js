import { Button, IconButton, ButtonGroup } from '@chakra-ui/button';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Badge, Box, Center, HStack, LinkOverlay, Text } from "@chakra-ui/layout";
import { Spinner } from '@chakra-ui/spinner';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import RestrictedComponent from 'components/logic/RestrictedComponent';

import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import ClientLink from "../clients/Link";
import { IconFolder } from '../ui/Icons';
import NoResults from "../ui/NoResults";
import Title from '../ui/Title';
import ProjectBadge from './ProjectBadge';

const ProjectsList = ({ history }) => {
    useSetTitle('Projects');
    const [projects, updateProjects] = useFetch('/projects')
    const destroy = useDelete('/projects/', updateProjects);

    const handleCreateProject = () => {
        history.push('/projects/create')
    }

    return (
        <div>
            <HStack justifyContent="space-between" alignItems="center">
            <Title title="Projects" icon={<IconFolder />} />
                <RestrictedComponent roles={["administrator", "superuser", "user"]} >
                    <Button variant='outline' leftIcon={<AddIcon />} onClick={handleCreateProject} colorScheme='red'>
                        Create Project
                    </Button>
                </RestrictedComponent>
            </HStack>
            {!projects ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th style={{ width: "190px" }}>Name</Th>
                            <Th>Client</Th>
                            <Th display={{base:'none',"2xl":'table-cell'}}>Description</Th>
                            <Th>Rules of engagement</Th>
                            <Th>Status</Th>
                            <Th>&nbsp;</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {projects.length === 0 ? (
                            <Tr>
                                <Td colSpan="5">
                                    <NoResults />
                                </Td>
                            </Tr>
                        ) : (
                            projects.map((project) => (
                                <Tr key={project.id} color="gray.500">
                                    <Td>
                                        <ProjectBadge project={project} />
                                    </Td>
                                    <Td>
                                        <ClientLink clientId={project.client_id} size='sm'>
                                            {project.client_name}
                                        </ClientLink>
                                    </Td>
                                    <Td display={{base:'none',"2xl":'table-cell'}} maxW="lg" fontSize={'xs'} >
                                        {project.description}
                                    </Td>
                                    <Td fontSize="sm">
                                        {project.engagement_type
                                            ? <Badge colorScheme='red'>{project.engagement_type}</Badge>
                                            : "(undefined)"}
                                    </Td>
                                    <Td fontSize="sm">
                                        <HStack alignItems="center">
                                            <Box rounded="full" w="10px" h="10px" bg={ project.archived ? "gray.600" : "green.400" } mr="1" />
                                            
                                            <Text color={ project.archived ? "gray.600" : "green.400" } >
                                                {project.archived ? "Archived" : "Active"} </Text>
                                        </HStack>
                                    </Td>
                                    <Td className="flex justify-end">
                                        <RestrictedComponent
                                            roles={[
                                                "administrator",
                                                "superuser",
                                                "user",
                                            ]}
                                        >
                                            <ButtonGroup
                                                size="sm"
                                                isAttached
                                                variant="outline"
                                            >
                                                <Button mr="-px" colorScheme='yellow'>
                                                    <LinkOverlay
                                                        href={`/projects/${project.id}/edit`}
                                                    >
                                                        Edit
                                                    </LinkOverlay>
                                                </Button>
                                                <IconButton
                                                colorScheme='red'
                                                    aria-label="Delete"
                                                    icon={<DeleteIcon />}
                                                    onClick={() =>
                                                        destroy(project.id)
                                                    }
                                                />
                                            </ButtonGroup>
                                        </RestrictedComponent>
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
            )}
        </div>
    );
}


export default ProjectsList
