import { Badge, Box, Divider, Grid, HStack, Text  } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Tr } from "@chakra-ui/table";
import ClientLink from "components/clients/Link";
import UserLink from "components/users/Link";
import React from "react";
import ReactMarkdown from "react-markdown";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";

function ProjectDetailsTab({ project }) {
    return (
        <Grid templateColumns={['1fr', '1fr', '1fr','repeat(2,1fr)']} gap='3'>
            <Box
                as="article"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="5"
            >
                <HStack mb="4">
                    <Text fontSize="xl" fontWeight="bold">
                        Project Details
                    </Text>
                </HStack>
                <Divider />
                <Table>
                    <Tbody>
                        <Tr>
                            <Th>Status</Th>
                            <Td>
                                <HStack alignItems="center">
                                    <Box rounded="full" w="10px" h="10px" bg={ project.archived ? "gray.600" : "green.400" } mr="1" /> 
                                    <Text color={ project.archived ? "gray.600" : "green.400" } >
                                        {project.archived
                                            ? "Archived"
                                            : "Active"}{" "}
                                    </Text>
                                </HStack>
                            </Td>
                        </Tr>
                        <Tr>
                            <Th>Engagement type</Th>
                            <Td>
                                {project.engagement_type && (
                                    <Badge colorScheme="red">
                                        {project.engagement_type}
                                    </Badge>
                                )}
                            </Td>
                        </Tr>
                        <Tr>
                            <Th>Description</Th>
                            <Td>
                                <ReactMarkdown>
                                    {project.description}
                                </ReactMarkdown>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>

            <Box as="article" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" >
                <HStack mb="4">
                    <Text fontSize="xl" fontWeight="bold">
                        Relations
                    </Text>
                </HStack>
                <Divider />
                <Table>
                    <Tbody>
                        <Tr>
                            <Th>Client</Th>
                            <Td>
                                <ClientLink clientId={project.client_id}>
                                    {project.client_name}
                                </ClientLink>
                            </Td>
                        </Tr>
                        <Tr>
                            <Th>Created by</Th>
                            <Td>
                                <UserLink userId={project.creator_uid}>
                                    {project.creator_full_name}
                                </UserLink>
                            </Td>
                        </Tr>
                        <Tr>
                            <Th>Created</Th>
                            <Td>
                                <ReactTimeAgo date={project.insert_ts} />
                            </Td>
                        </Tr>

                        <Tr>
                            {project.update_ts && (
                                <> <Th>Updated</Th> <Td> <ReactTimeAgo date={project.update_ts} /> </Td> </>
                            )}
                        </Tr>

                        {(project.engagement_start_date ||
                            project.engagement_end_date) && (
                            <Tr>
                                {project.engagement_start_date && (
                                    <>
                                        <Th>Engagement start date</Th>
                                        <Td> <ReactTimeAgo date={ project.engagement_start_date } /> </Td>
                                    </>
                                )}

                                {project.engagement_end_date && (
                                    <>
                                        <Th>Engagement end date</Th>
                                        <Td> <ReactTimeAgo date={ project.engagement_end_date } /> </Td>
                                    </>
                                )}
                            </Tr>
                        )}

                        {project.archived === 1 && (
                            <Tr>
                                <Th>Archived</Th>
                                <Td>
                                    <ReactTimeAgo date={project.archive_ts} />
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Box>
        </Grid>
    );
}

export default ProjectDetailsTab;
