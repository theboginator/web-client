import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/breadcrumb";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import RestrictedComponent from "components/logic/RestrictedComponent";
import { actionCompletedToast } from "components/ui/toast";
import { Link } from "react-router-dom";
import secureApiFetch from "services/api";
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from "../../hooks/useSetTitle";
import { IconClipboardCheck, IconFolder, IconUserGroup } from '../ui/Icons';
import Title from '../ui/Title';
import ProjectAttachmentsTab from './AttachmentsTab';
import ProjectDetailsTab from './DetailsTab';
import ProjectNotesTab from "./NotesTab";
import ProjectTargets from './Targets';
import ProjectTasks from './Tasks';
import ProjectTeam from './Team';
import ProjectVulnerabilities from './Vulnerabilities';

const ProjectDetails = ({ match, history }) => {
    useSetTitle('Project');

    const projectId = match.params.id;

    const [project, updateProject] = useFetch(`/projects/${projectId}`)
    const [users] = useFetch(`/projects/${projectId}/users`)
    const destroy = useDelete(`/projects/`, updateProject);

    const handleGenerateReport = () => {
        history.push(`/projects/${project.id}/report`)
    }

    const handleManageTeam = () => {
        history.push(`/projects/${project.id}/membership`)
    }

    const onArchiveButtonClick = (project) => {
        secureApiFetch(`/projects/${project.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ archived: !project.archived })
        })
            .then(() => {
                updateProject();
                actionCompletedToast('The project has been updated.');
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between">
                <Box p="3" border="1px" borderColor="gray.700" rounded="lg" display="inline-block" >
                    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} >
                        <BreadcrumbItem>
                            <BreadcrumbLink as={Link} to="/">
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink as={Link} to="/projects">
                                Projects
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Box>

                {project && (
                    <>
                        <ProjectTeam project={project} users={users} />

                        <ButtonGroup size="md" isAttached variant="outline">
                            <RestrictedComponent roles={["administrator", "superuser", "user"]} >
                                {!project.archived && (
                                    <>
                                        <Button colorScheme="yellow" mr="3" as={Link} to={`/projects/${project.id}/edit`} >
                                            Edit
                                        </Button>
                                        <Button leftIcon={ <IconClipboardCheck styling={{ width: "16px", height: "16px", }} /> } onClick={handleGenerateReport} >
                                            Generate Report
                                        </Button>
                                        <Button leftIcon={ <IconUserGroup styling={{ width: "16px", height: "16px", }} /> } onClick={handleManageTeam} >
                                            Manage Members
                                        </Button>
                                    </>
                                )}
                                <Button onClick={() => onArchiveButtonClick(project) } >
                                    {project.archived ? "Unarchive" : "Archive"}
                                </Button>
                                <Button colorScheme='red' leftIcon={<DeleteIcon />} onClick={() => destroy(project.id)} >
                                    Delete
                                </Button>
                            </RestrictedComponent>
                        </ButtonGroup>
                    </>
                )}
            </Flex>
            {!project ? (
                <Spinner />
            ) : (
                <>
                    <Title
                        title={project.name}
                        type="Project"
                        icon={<IconFolder />}
                    />
                    <Tabs colorScheme="red" variant='line'>
                        <TabList>
                            <Tab roundedTop='md'>Details</Tab>
                            <Tab roundedTop='md'>Targets</Tab>
                            <Tab roundedTop='md'>Tasks</Tab>
                            <Tab roundedTop='md'>Vulnerabilities</Tab>
                            <Tab roundedTop='md'>Notes</Tab>
                            <Tab roundedTop='md'>Attachments</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <ProjectDetailsTab project={project} />
                            </TabPanel>
                            <TabPanel>
                                <ProjectTargets project={project} />
                            </TabPanel>
                            <TabPanel>
                                <ProjectTasks project={project} />
                            </TabPanel>
                            <TabPanel>
                                <ProjectVulnerabilities project={project} />
                            </TabPanel>
                            <TabPanel>
                                <ProjectNotesTab project={project} />
                            </TabPanel>
                            <TabPanel>
                                <ProjectAttachmentsTab project={project} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </>
            )}
        </>
    );
};

export default ProjectDetails;
