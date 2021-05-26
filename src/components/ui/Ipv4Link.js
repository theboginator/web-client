import { Button } from "@chakra-ui/button";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link as ReachLink  } from 'react-router-dom';

const Ipv4Link = (props) => {
    return <Button size='xs'
    colorScheme='red'
    variant='ghost'
    as={ReachLink }
    isExternal
    to={`https://www.infobyip.com/ip-${props.value}.html`}
    rightIcon={<ExternalLinkIcon />}
        className='font-mono border-b border-transparent text-sm inline-flex items-center gap-1 hover:opacity-75'
        title={`View information about IP ${props.value}`}>
        {props.value}
    </Button>
   
}

export default Ipv4Link;
