import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { ExternalLinkIcon, HamburgerIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { Box,  Divider,  VStack } from '@chakra-ui/layout';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent,  DrawerHeader, DrawerOverlay } from '@chakra-ui/modal';
import { IconDashboard } from 'components/ui/Icons';
import React from 'react';
import { Link as ReachLink, useHistory } from 'react-router-dom';
import PermissionsService from 'services/permissions';
import Links from './Links';

export default function Sidebar() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    
    return (
        <Box
            p={['2','3','4','5']}
            justifyContent="space-between"
            flexDirection="column"
        >
            <Button 
                variant='outline'
                display={['block','block',"none"]}
                ref={btnRef} colorScheme="red" onClick={onOpen} leftIcon={<HamburgerIcon />}>
                Open Sidebar 
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
                colorScheme='red'
                closeOnOverlayClick
                closeOnEsc
                blockScrollOnMount
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Reconmap</DrawerHeader>
                    <DrawerBody>
                        <MenuOptions />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Box display={['none','none',"flex"]} >
                <MenuOptions />
            </Box>
        </Box>
    );
}

const MenuOptions = () => {
    const { push } = useHistory();
    const user = JSON.parse(localStorage.getItem('user'));

    const filterByRole = (link) => {
        if (!link.hasOwnProperty('permissions')) { return true; }
        return user && PermissionsService.isAllowed(link.permissions, user.permissions);
    }

    const onSupportButtonClick = () => { push('/support'); }

    return <VStack  alignItems="stretch"> <VStack
                spacing="3"
                alignItems="stretch"
                flex="1"
            >
               <Button justifyContent='start' variant='ghost' size='md' leftIcon={<IconDashboard styling={{ width: '20px'}} />} as={ReachLink} to={"/"}>
                Dashboard
               </Button>
              
                <Accordion allowToggle borderColor="transparent">
                    {Links.filter(filterByRole).map((link, index) => {
                        const subLinks = link.sublinks.filter(filterByRole);
                        return (
                            <AccordionItem borderTop="0" >
                                <AccordionButton px='0' py='1' justifyContent='space-between' rounded='md' >
                                    <Button justifyContent='start' variant='ghost' size='md' leftIcon={<Box w="20px" h="20px"> {link.icon} </Box>} as={ReachLink} to={link.to}>
                                    {link.title}
                                    </Button>
                                    <AccordionIcon color='gray.600'/>
                                </AccordionButton>
                                <AccordionPanel pl='7' py='1'>
                                    <VStack alignItems="stretch">
                                        {subLinks.map((sublink) => (
                                            <Button justifyContent='start' variant='ghost' size='sm' as={ReachLink} to={sublink.to} color='gray.500'>
                                            {sublink.title}
                                            </Button>
                                        ))}
                                    </VStack>
                                </AccordionPanel>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </VStack>
                <Divider />
            <VStack spacing="3" alignItems="stretch" flex="1" >
                <Button isExternal justifyContent='start' variant='ghost' size='md' leftIcon={<ExternalLinkIcon />} as={ReachLink} to="https://reconmap.org/user-manual/" >
                    User manual 
                </Button>
                <Button onClick={onSupportButtonClick} justifyContent='start' leftIcon={<QuestionOutlineIcon />} variant='ghost' size='md'  >
                    Support 
                </Button>
            </VStack>
         </VStack>
}