import { Td, Tr } from "@chakra-ui/table";
import NoResults from "./NoResults";

const NoResultsTableRow = ({numColumns}) => {
    return <Tr>
        <Td colspan={numColumns} style={{padding: '20px'}}><NoResults/></Td>
    </Tr>
}

export default NoResultsTableRow;
