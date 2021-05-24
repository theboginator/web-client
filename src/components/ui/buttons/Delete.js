import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { IconX } from "../Icons";

const DeleteButton = (props) => <Button size='xs' variant='outline' onClick={props.onClick} {...props} color='red.400' >
    <Box w='16px' h='16px' mr='1'><IconX /></Box>
    {props.children || "Delete"}
</Button>


export default DeleteButton
