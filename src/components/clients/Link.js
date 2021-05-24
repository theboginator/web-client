import { Link, Text } from "@chakra-ui/layout";
import { Link  as ReachLink} from "react-router-dom";
import { IconBriefcase } from "../ui/Icons";

const ClientLink = ({ clientId, children }) => {
   
    return <Link as={ReachLink} 
        to={`/clients/${clientId}`} display='flex' color='gray.300'>
        <IconBriefcase styling={{ width: '16px'}} />
        <Text fontSize='sm' ml='2' fontWeight='bold'>{children}</Text>

    </Link>
}

export default ClientLink;
