import { Button } from "@chakra-ui/button";
import {  Text } from "@chakra-ui/layout";
import { Link  } from "react-router-dom";
import { IconBriefcase } from "../ui/Icons";

const ClientLink = ({ clientId, children }) => {
   
    return <Button width='min-content' textAlign='left' variant='ghost' colorScheme='linkedin' as={Link} 
        to={`/clients/${clientId}`} display='flex' 
        leftIcon={<IconBriefcase styling={{ width: '24px'}} />}
        >
        <Text fontWeight="bold">{children}</Text>

    </Button>

}

export default ClientLink;
