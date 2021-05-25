import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Center, Divider, HStack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import RestrictedComponent from "components/logic/RestrictedComponent";
import TargetBadge from "components/target/TargetBadge";
import React from "react";
import {useHistory } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import secureApiFetch from "../../services/api";
import DeleteButton from "../ui/buttons/Delete";
import NoResultsTableRow from "../ui/NoResultsTableRow";

const ProjectTargets = ({ project }) => {
    const history = useHistory()

    const [targets, updateTargets] = useFetch(`/targets?projectId=${project.id}`)

    const handleAddTarget = () => {
        history.push(`/projects/${project.id}/targets/create`)
    }

    const onDeleteButtonClick = (ev, targetId) => {
        ev.preventDefault();

        secureApiFetch(`/targets/${targetId}`, { method: 'DELETE' })
            .then(() => {
                updateTargets();
            })
    }

    return (
        <Box as="article" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" >
            <HStack mb="4" justifyContent='space-between'>
                <Text fontSize="xl" fontWeight="bold">
                    Targets
                </Text>
                <RestrictedComponent roles={["administrator", "superuser", "user"]} >
                    <Button onClick={handleAddTarget} leftIcon={<AddIcon />} size='sm' variant='outline'>
                        Add target
                    </Button>
                </RestrictedComponent>
            </HStack>
            <Divider />
         
            {!targets ? (
                <Center><Spinner /></Center> 
            ) : (
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Kind</Th>
                            <Th>Vulnerable?</Th>
                            <Th>&nbsp;</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {targets.length === 0 && (
                            <NoResultsTableRow numColumns={4} />
                        )}
                        {targets.map((target, index) => (
                            <Tr key={index}>
                                <Td>
                                    <TargetBadge projectId={project.id} target={target} />    
                                </Td>
                                <Td>{target.kind}</Td>
                                <Td>
                                    {target.num_vulnerabilities > 0
                                        ? `Yes (${target.num_vulnerabilities} vulnerabilities found)`
                                        : "No"}
                                </Td>
                                <Td>
                                    <RestrictedComponent
                                        roles={[
                                            "administrator",
                                            "superuser",
                                            "user",
                                        ]}
                                    >
                                        <DeleteButton
                                            onClick={(ev) =>
                                                onDeleteButtonClick(
                                                    ev,
                                                    target.id
                                                )
                                            }
                                        />
                                    </RestrictedComponent>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </Box>
    );
}

export default ProjectTargets;
