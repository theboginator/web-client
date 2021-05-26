import { Table, Td, Tr, Th } from '@chakra-ui/table';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';

const TimestampsSection = ({ entity }) => {
  return (
    <Table>
      <Tr>
        <Th>Created</Th>
        <Td>
          <ReactTimeAgo date={entity.insert_ts} />
        </Td>
      </Tr>
      <Tr>
        {entity.update_ts && (
          <>
            <Th>Updated</Th>
            <Td>
              <ReactTimeAgo date={entity.update_ts} />
            </Td>
          </>
        )}
      </Tr>
    </Table>
  );
};

export default TimestampsSection;
