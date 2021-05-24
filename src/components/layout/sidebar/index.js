import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import { CloseButton } from '@chakra-ui/close-button';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, HStack, Link, Text, VStack } from '@chakra-ui/layout';
import { IconDashboard } from 'components/ui/Icons';
import React, { useCallback, useLayoutEffect  } from 'react';
import { Link as ReachLink, NavLink, useHistory } from 'react-router-dom';
import PermissionsService from 'services/permissions';
import Links from './Links';

export default function Sidebar(props) {
    const { setSidebarCollapsed, sidebarCollapsed } = props
    const { push } = useHistory();

    const user = JSON.parse(localStorage.getItem('user'));

    const filterByRole = (link) => {
        if (!link.hasOwnProperty('permissions')) {
            return true;
        }
        return user && PermissionsService.isAllowed(link.permissions, user.permissions);
    }

    const watchClientWidth = useCallback(e => {
        if (e.target.innerWidth < 800) setSidebarCollapsed(true)
    }, [setSidebarCollapsed])

    useLayoutEffect(() => {
        if (window.innerWidth < 800) setSidebarCollapsed(true)
        window.addEventListener('resize', watchClientWidth);
        return () => { window.removeEventListener('resize', watchClientWidth) }
    }, [watchClientWidth, setSidebarCollapsed])

    const handleCloseSidebar = () => setSidebarCollapsed(!sidebarCollapsed)
    const onSupportButtonClick = () => { push('/support'); }

    return (
        <Box  p='4' width="xs" minHeight={'90vh'} justifyContent='space-between' flexDirection='column' d='flex' >
            <VStack spacing='3' alignItems='stretch' flex='1' position='relative'> 
                <CloseButton onClick={handleCloseSidebar} pos="absolute" top="2" right="2"/>
                    <HStack alignItems='center' pl='4'>
                        <Box w='20px' h='20px'><IconDashboard /></Box>
                        <Link as={ReachLink} to={'/'}> Dashboard </Link>
                    </HStack>
                <Accordion allowToggle allowMultiple borderColor='transparent' >
                {Links.filter(filterByRole).map((link, index) => {
                    const subLinks = link.sublinks.filter(filterByRole); 
                    return <AccordionItem borderTop='0' color='gray.500'>
                        <AccordionButton pl='4'>
                            <HStack flex="1" alignItems='center'>
                                <Box w='20px' h='20px'>{link.icon}</Box>
                                <NavLink to={link.to} data-label={link.title} activeClassName='active' exact> {link.title}</NavLink>
                            </HStack>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <VStack alignItems='stretch'>
                                {subLinks.map(sublink =>
                                    <NavLink to={sublink.to} data-label={sublink.title} activeClassName='active'
                                    className='sublink' exact>
                                        <Text fontSize='sm' color='gray.500'>{sublink.title}</Text>
                                    </NavLink> )}
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>
                })}
                </Accordion>
            </VStack>

            <VStack alignItems='stretch' p='4'>
                <Link href='https://reconmap.org/user-manual/' isExternal> User manual <ExternalLinkIcon mx='2px'/></Link>
                <Link onClick={onSupportButtonClick}> Support </Link>
             </VStack>
        </Box>
    )
}
