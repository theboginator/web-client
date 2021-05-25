import { Button, ButtonGroup } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import RestrictedComponent from "components/logic/RestrictedComponent";
import React from "react";
import CvssScore from '../badges/CvssScore';
import RiskBadge from '../badges/RiskBadge';
import VulnerabilityBadge from '../badges/VulnerabilityBadge';
import VulnerabilityCategoryBadge from '../badges/VulnerabilityCategoryBadge';
import DeleteButton from "../ui/buttons/Delete";
import NoResults from "../ui/NoResults";
import VulnerabilityStatusBadge from "./StatusBadge";

const VulnerabilitiesTable = ({ vulnerabilities, selection, setSelection, destroy }) => {
    const showSelection = selection !== undefined;

    const onSelectionChange = ev => {
        const target = ev.target;
        const selectionId = parseInt(target.value);
        if (target.checked) {
            setSelection([...selection, selectionId]);
        } else {
            setSelection(selection.filter(value => value !== selectionId));
        }
    };


    return (
        <Table>
            <Thead>
                <Tr>
                    {showSelection && <Th style={{ width: "32px" }}>&nbsp;</Th>}
                    <Th style={{ width: '190px' }}>Summary</Th>
                    <Th style={{ width: '120px' }}>Status</Th>
                    <Th style={{ width: '120px' }}>Risk</Th>
                    <Th isNumeric style={{ width: '120px' }}><abbr title="Common Vulnerability Scoring System">CVSS</abbr> score</Th>
                    <Th className='only-desktop' style={{ width: '20%' }}>Category</Th>
                    <Th style={{ width: '15%' }}>&nbsp;</Th>
                </Tr>
            </Thead>
            <Tbody>
                {vulnerabilities.length === 0 ?
                    <Tr>
                        <Td colSpan="6"><NoResults /></Td>
                    </Tr> :
                    vulnerabilities.map((vulnerability, index) => {
                        return (
                            <Tr key={index}>
                                {showSelection &&
                                    <Td>
                                        <Checkbox
                                        colorScheme='purple'
                                            value={vulnerability.id}
                                            onChange={onSelectionChange}
                                            isChecked={selection.includes(vulnerability.id)}
                                        />
                                    </Td>
                                }
                                <Td><VulnerabilityBadge vulnerability={vulnerability} /></Td>
                                <Td><VulnerabilityStatusBadge vulnerability={vulnerability} /></Td>
                                <Td><RiskBadge risk={vulnerability.risk} /></Td>
                                <Td><CvssScore score={vulnerability.cvss_score} /></Td>
                                <Td className='only-desktop'><VulnerabilityCategoryBadge category={vulnerability.category_name} /></Td>
                                <Td className='flex justify-end'>
                                    <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                                        <ButtonGroup size='sm' isAttached>
                                            <Button variant='outline' colorScheme='yellow'  href={`/vulnerabilities/${vulnerability.id}/edit`}>Edit</Button>
                                            {destroy &&
                                                <DeleteButton onClick={() => destroy(vulnerability.id)} />
                                            }
                                        </ButtonGroup>
                                    </RestrictedComponent>
                                </Td>
                            </Tr>
                        )
                    })}
            </Tbody>
        </Table>
    )
}

export default VulnerabilitiesTable;
