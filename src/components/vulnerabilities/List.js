import { Button, IconButton } from '@chakra-ui/button';
import { AddIcon, RepeatIcon } from '@chakra-ui/icons';
import { Center, HStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import DeleteButton from 'components/ui/buttons/Delete';
import { actionCompletedToast } from 'components/ui/toast';
import React, { useCallback, useEffect, useState } from 'react';
import useDelete from '../../hooks/useDelete';
import secureApiFetch from '../../services/api';
import Pagination from '../layout/Pagination';
import { IconFlag } from '../ui/Icons';
import Title from '../ui/Title';
import useSetTitle from './../../hooks/useSetTitle';
import VulnerabilitiesTable from './VulnerabilitiesTable';

const VulnerabilitiesList = ({ history }) => {
    const searchParams = new URLSearchParams(history.location.search);
    let pageNumber = searchParams.get('page');
    pageNumber = pageNumber !== null ? parseInt(pageNumber) : 1;
    const apiPageNumber = pageNumber - 1;

    const [reloadButtonDisabled, setReloadButtonDisabled] = useState(false);

    const [selection, setSelection] = useState([]);

    useSetTitle(`Vulnerabilities - Page ${pageNumber}`)

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [numberPages, setNumberPages] = useState(1);

    const handlePrev = () => {
        history.push(`/vulnerabilities?page=${pageNumber - 1}`);
    }
    const handleNext = () => {
        history.push(`/vulnerabilities?page=${pageNumber + 1}`);
    }

    const reloadVulnerabilities = useCallback(() => {
        setVulnerabilities([]);
        setReloadButtonDisabled(true);

        secureApiFetch(`/vulnerabilities?page=${apiPageNumber}`, { method: 'GET' })
            .then(resp => {
                if (resp.headers.has('X-Page-Count')) {
                    setNumberPages(resp.headers.get('X-Page-Count'))
                }
                return resp.json()
            })
            .then((data) => {
                setVulnerabilities(data);
            })
            .finally(() => {
                setReloadButtonDisabled(false);
            });
    }, [apiPageNumber]);

    const onDeleteButtonClick = () => {
        secureApiFetch('/vulnerabilities', {
            method: 'PATCH',
            headers: {
                'Bulk-Operation': 'DELETE',
            },
            body: JSON.stringify(selection),
        })
            .then(reloadVulnerabilities)
            .then(() => {
                setSelection([]);
                actionCompletedToast('All selected vulnerabilities were deleted.');
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        reloadVulnerabilities()
    }, [reloadVulnerabilities])

    const destroy = useDelete('/vulnerabilities/', reloadVulnerabilities, 'Do you really want to delete this vulnerability?', 'The vulnerability has been deleted.');
    const handleCreateVulnerability = () => {
        history.push(`/vulnerabilities/create`)
    }

    return (
        <>
            <HStack justifyContent='space-between' alignItems='center'>
            <Title title='Vulnerabilities' icon={<IconFlag />} />

                <Pagination page={apiPageNumber} total={numberPages} handlePrev={handlePrev} handleNext={handleNext} />
                <HStack spacing='3'>
                {selection.length > 0 &&
                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                    <DeleteButton size='md' onClick={onDeleteButtonClick} disabled={!selection.length}>
                        Delete selected
                    </DeleteButton>
                </RestrictedComponent>}
                <IconButton variant='outline'  icon={<RepeatIcon />} onClick={reloadVulnerabilities} disabled={reloadButtonDisabled} />
                <Button size='md' leftIcon={<AddIcon />} variant='outline' colorScheme='purple' onClick={handleCreateVulnerability}>Add vulnerability</Button>
                </HStack>

            </HStack>
            {!vulnerabilities ? <Center><Spinner /></Center> :
                <VulnerabilitiesTable vulnerabilities={vulnerabilities} selection={selection} setSelection={setSelection} destroy={destroy} />
            }
        </>
    )
}

export default VulnerabilitiesList
