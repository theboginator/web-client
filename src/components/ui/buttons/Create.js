import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";

const CreateButton = ({ onClick, children }) => ( 
    <Button onClick={onClick} bgColor='red.400'>
        <AddIcon mr='2'/>
        {children || "Create"}
    </Button>
);

export default CreateButton;
