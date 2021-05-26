import { Table, Td, Tr, Th } from '@chakra-ui/table';
import RelativeDateFormatter from "./RelativeDateFormatter";

const TimestampsSection = ({ entity }) => {
  return (
    <Table>
      <Tr>
        <Th>Created</Th>
        <Td>
          <RelativeDateFormatter date={entity.insert_ts} />
        </Td>
      </Tr>
      <Tr>
        {entity.update_ts && (
          <>
            <Th>Updated</Th>
            <Td>
              <RelativeDateFormatter date={entity.update_ts} />
            </Td>
          </>
        )}
      </Tr>
    </Table>
  );
};

export default TimestampsSection;
