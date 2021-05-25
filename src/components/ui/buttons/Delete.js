import { Button } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteButton = ({ onClick, size = "sm", children }) => (
    <Button colorScheme="red" size={size} variant="outline" onClick={onClick} leftIcon={<DeleteIcon />} >
        {children || "Delete"}
    </Button>
);


export default DeleteButton
