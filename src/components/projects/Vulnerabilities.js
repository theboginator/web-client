import { Button } from '@chakra-ui/button'
import { FormLabel } from '@chakra-ui/form-control'
import { AddIcon } from '@chakra-ui/icons'
import { Box, Center, Divider, HStack, Text } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { Spinner } from '@chakra-ui/spinner'
import RestrictedComponent from 'components/logic/RestrictedComponent'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useFetch from "../../hooks/useFetch"

import VulnerabilitiesTable from '../vulnerabilities/VulnerabilitiesTable'

const ProjectVulnerabilities = ({ project }) => {
    const history = useHistory();

    const [vulnerabilities] = useFetch(`/projects/${project.id}/vulnerabilities`)

    const handleCreateVulnerability = () => {
        history.push(`/vulnerabilities/create?projectId=${project.id}`)
    }

    const [category, setCategory] = useState('')
    const [risk, setRisk] = useState('')
    const [status, setStatus] = useState('')

    return         <Box as="article" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" >
    <HStack mb="4" justifyContent='space-between'>
        <Text fontSize="xl" fontWeight="bold">
        Vulnerabilities
        </Text>
        {vulnerabilities &&
            <VulnerabilityFilters vulnerabilities={vulnerabilities} setRisk={setRisk} setCategory={setCategory}
                setStatus={setStatus} />}
        
        <RestrictedComponent roles={["administrator", "superuser", "user"]} >
            <Button onClick={handleCreateVulnerability} leftIcon={<AddIcon />} size='sm' variant='outline'>
            Add New Vulnerability
            </Button>
        </RestrictedComponent>
    </HStack>
    <Divider />

       
          
        {vulnerabilities ?
            <VulnerabilitiesTable
                vulnerabilities={vulnerabilities.filter(vuln => ((vuln.category_name && vuln.category_name.includes(category)) || vuln.category_name === null) && vuln.risk.includes(risk) && vuln.status.includes(status))} />
            : <Center><Spinner /></Center>}
    </Box>
}

export default ProjectVulnerabilities


const VulnerabilityFilters = ({ vulnerabilities, setCategory, setRisk, setStatus }) => {
    const handleSetCategory = ev => {
        setCategory(ev.target.value)
    }
    const handleSetRisk = ev => {
        setRisk(ev.target.value)
    }
    const handleSetStatus = ev => {
        setStatus(ev.target.value)
    }
    return <HStack spacing='5' >
        <HStack>
            <FormLabel fontSize='sm' color='gray.500'>Risk</FormLabel>
            <Select onChange={handleSetRisk} placeholder='Any' size='sm'>
                {[...new Set(vulnerabilities.map(vuln => vuln.risk))]
                    .map((risk, index) => <option value={risk} key={index}>{risk.charAt(0).toUpperCase() + risk.slice(1)}</option>)}
            </Select>
        </HStack>

        <HStack>
            <FormLabel fontSize='sm' color='gray.500'>Category</FormLabel>
            <Select onChange={handleSetCategory} placeholder='Any' size='sm'>
                {[...new Set(vulnerabilities.filter(vuln => vuln.category_name).map(vuln => vuln.category_name))]
                    .map((cat, index) => <option value={cat} key={index}>{cat}</option>)}
            </Select>
        </HStack>
        <HStack>
            <FormLabel fontSize='sm' color='gray.500'>Status</FormLabel>
            <Select onChange={handleSetStatus} placeholder='Any' size='sm'>
                <option value='open'>Open</option>
                <option value='closed'>Closed</option>
            </Select>
        </HStack>
    </HStack>
}
