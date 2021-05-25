import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { IconX } from "../Icons";

const DeleteButton = ({onClick, size='sm', children}) => <Button colorScheme='red' size={size} variant='outline' onClick={onClick} color='red.400' >
    <Box w='16px' h='16px' mr='1'><IconX /></Box>
    {children || "Delete"}
</Button>


export default DeleteButton
